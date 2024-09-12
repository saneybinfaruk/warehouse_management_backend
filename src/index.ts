import { InventoryFilterInput } from "./types/interfaces";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  InventoryItemField,
  inventoryItemSchema,
  LoginFormField,
  loginSchema,
  SignUpFormField,
  signupSchema,
} from "./zod/schema";
import bcrypt from "bcrypt";
import generateToken from "./utils/generateToken";

const prismaClient = new PrismaClient();

const resolvers = {
  Query: {
    inventoryItems: async (_: any, args: { filter: InventoryFilterInput }) => {
      const { filter } = args;

      const where: any = {};

      if (filter) {
        if (filter.name)
          where.name = { contains: filter.name, mode: "insensitive" };
        if (filter.location)
          where.location = { contains: filter.location, mode: "insensitive" };
        if (filter.owner)
          where.owner = { contains: filter.owner, mode: "insensitive" };
        if (filter.categories && filter.categories.length > 0)
          where.category = { in: filter.categories };

        if (filter.minQuantity && filter.maxQuantity) {
          where.quantity = {
            gte: filter.minQuantity,
            lte: filter.maxQuantity,
          };
        } else if (filter.minQuantity) {
          where.quantity = { gte: filter.minQuantity };
        } else if (filter.maxQuantity) {
          where.quantity = { lte: filter.maxQuantity };
        }
      }

      return await prismaClient.inventoryItem.findMany({
        where,
        orderBy: { dateReceived: "desc" },
      });
    },
    inventoryItem: async (_: any, args: { id: number }) => {
      return await prismaClient.inventoryItem.findUnique({
        where: { id: args.id },
      });
    },

    inventoryItemsCategories: async (_: any, args: any) => {
      return await prismaClient.inventoryItem
        .findMany({
          distinct: ["category"],
          select: {
            category: true,
          },
        })
        .then((items) =>
          items.map((item) => item.category).filter((item) => item !== null)
        );
    },

    inventoryItemsCategoriesInfo: async () => {
      // Using Prisma's groupBy to get distinct categories and count items
      const categoriesInfo = await prismaClient.inventoryItem.groupBy({
        by: ["category"],
        _count: {
          category: true,
        },
        where: {
          category: {
            not: null, // Ensure categories are not null
          },
        },
      });

      // Map the grouped results to the format specified by the schema
      return categoriesInfo
        .map((info) => ({
          categoryName: info.category || "Unknown Category", // Handle null categories if any still exist
          totalItems: info._count.category,
        }))
        .sort((a, b) => b.totalItems - a.totalItems)
        .slice(0, 6);
    },
  },

  Mutation: {
    addInventoryItem: async (
      _: any,
      args: { addInventoryItemInput: InventoryItemField }
    ) => {
      const validation = inventoryItemSchema.safeParse(
        args.addInventoryItemInput
      );

      if (!validation.success)
        throw new Error(
          validation.error.errors.map((err) => err.message).join(", ")
        );

      return await prismaClient.inventoryItem.create({
        data: {
          ...validation.data,
        },
      });
    },

    updateInventoryItem: async (
      _: any,
      args: { inventoryItemId: number; updatedValue: InventoryItemField }
    ) => {
      const validation = inventoryItemSchema.safeParse(args.updatedValue);

      if (!validation.success)
        throw new Error(
          validation.error.errors.map((err) => err.message).join(", ")
        );

      return await prismaClient.inventoryItem.update({
        where: { id: args.inventoryItemId },
        data: {
          ...validation.data,
        },
      });
    },

    deleteInventoryItem: async (_: any, args: { inventoryItemId: number }) => {
      return await prismaClient.inventoryItem.delete({
        where: { id: args.inventoryItemId },
      });
    },

    createUser: async (_: any, args: { createUserInput: SignUpFormField }) => {
      console.log(args);
      const validation = signupSchema.safeParse(args.createUserInput);
      console.log(validation);
      if (!validation.success)
        throw new Error(
          validation.error.errors.map((err) => err.message).join(", ")
        );

      const { email } = validation.data;

      const existingUser = await prismaClient.user.findUnique({
        where: { email },
      });

      if (existingUser) throw new Error("User already exists!");

      const salt = await bcrypt.genSalt(15);
      const hashedPassword = await bcrypt.hash(
        args.createUserInput.password,
        salt
      );

      const newUser = await prismaClient.user.create({
        data: {
          fullname: validation.data.fullname,
          email: validation.data.email,
          password: hashedPassword,
        },
      });

      const token = generateToken({ ...newUser, password: "" });
      console.log(token);
      return { token };
    },

    getUser: async (_: any, args: { getUserInput: LoginFormField }) => {
      console.log(args);
      const validation = loginSchema.safeParse(args.getUserInput);

      if (!validation.success)
        throw new Error(
          validation.error.errors.map((err) => err.message).join(", ")
        );

      const { email } = validation.data;

      const existingUser = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!existingUser) throw new Error("Invalid email or password!");

      const validPassword = await bcrypt.compare(
        validation.data.password,
        existingUser.password
      );

      if (!validPassword) throw new Error("Invalid email or password!");

      const token = generateToken({ ...existingUser, password: "" });
      console.log(token);
      return { token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = parseInt(process.env.PORT || "4000");
await startStandaloneServer(server, {
  listen: { port: PORT },
});
