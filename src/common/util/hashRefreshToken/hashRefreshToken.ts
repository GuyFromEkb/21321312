import { createHash } from "crypto";

export const hashRefreshToken = (token: string) => {
  return createHash("sha256").update(token, "binary").digest("base64");
};
