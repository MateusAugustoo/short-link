import { ulid } from "ulid";
import { hash } from "node:crypto";
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
  
};
