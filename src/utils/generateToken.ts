import { User } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";

export default function (user: User) {
  return jsonwebtoken.sign(
    {
      userId: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_PRIVATE_KEY as string
  );
}
