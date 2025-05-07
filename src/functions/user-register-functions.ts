import { ulid } from "ulid";
import { db } from "../drizzle/client";
import { users } from "../drizzle/schema/user";

interface RegisterUserRequest {
  email: string;
  password: string;
}

export const registerUser = async ({
  email,
  password,
}: RegisterUserRequest) => {
  const id = ulid()

  const user = await db.insert(users).values({
    id,
    email,
    password
  })

  return user
};
