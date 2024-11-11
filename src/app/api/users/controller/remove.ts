import { z } from "zod";
import useCase from "@/app/api/users/useCase";
import { lucia } from "@/lib/auth";
import {
  InputParseError,
  UnauthenticatedError,
  UnauthorizedError,
} from "@/app/api/errors";

const schema = z.string().trim().min(1);

export async function remove(
  input: z.infer<typeof schema>,
  sessionId: string | undefined,
) {
  if (!sessionId)
    throw new UnauthenticatedError("Must be logged in to delete user info");

  const { session } = await lucia.validateSession(sessionId);

  const { data, error } = schema.safeParse(input);

  if (error) throw new InputParseError("Invalid input", { cause: error });

  if (session?.userId !== data)
    throw new UnauthorizedError("Cannot delete other user's account");

  const result = await useCase.remove(data);
  return result;
}
