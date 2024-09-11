export const typeDefs = `#graphql 

type InventoryItem {
  id: Int!
  name: String!
  quantity: Int!
  location: String!
  owner: String!
  description: String
  sku: String
  category: String
  barcode: String
  supplier: String
  unitOfMeasure: String
  weight: String
  dimensions: String
  dateReceived: String
  expirationDate: String
  lastUpdated: String
  status: String
  reorderLevel: Int
  reorderQuantity: Int
  availability: String
  costPrice: Float
  sellingPrice: Float
  batchNumber: String
  serialNumber: String
  warehouse: String
  condition: String
  pickZone: String
  returnStatus: String
  handlingInstructions: String
}


input InventoryFilterInput {
  name: String
  location: String
  owner: String
  categories: [String]
  minQuantity: Int
  maxQuantity: Int
}
type Info {
  categoryName: String
  totalItems: Int
}
type Query {
  inventoryItem (id: Int!): InventoryItem!
  inventoryItems (filter: InventoryFilterInput): [InventoryItem!]!
  inventoryItemsCategories: [String]!
  inventoryItemsCategoriesInfo: [Info]
} 

input AddInventoryItemInput {
  name: String!
  quantity: Int!
  location: String!
  owner: String!
}

input CreateUserInput {
  fullname: String!
  email: String!
  password: String!
}

enum Role {
  STAFF,
  MANAGER
}

type User {
  fullname: String
  email: String
  role: Role
}

type Token {
  token:String
}

input GetUserInput{
  email: String!
  password: String!
}

type Mutation {
  addInventoryItem(addInventoryItemInput: AddInventoryItemInput!): InventoryItem
  updateInventoryItem(inventoryItemId: Int!, updatedValue: AddInventoryItemInput): InventoryItem
  deleteInventoryItem(inventoryItemId: Int!): InventoryItem

  createUser(createUserInput: CreateUserInput): Token
  getUser(getUserInput: GetUserInput): Token
}


`;
