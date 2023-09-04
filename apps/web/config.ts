import { env } from "process";

export const authCookieName = env.AUTH_COOKIE_NAME || "";
export const secret = env.SECRET || "";
export const hashValue = env.HASH_VALUE || 1;