import jwt from "jsonwebtoken";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";

const OFFSET_TTL_MS = 5 * 60 * 1000;
const EXPIRY_LEEWAY_MS = 60 * 1000;

let clockOffsetMs = 0;
let lastOffsetCheck = 0;

async function getClockOffsetMs() {
  if (lastOffsetCheck && Date.now() - lastOffsetCheck < OFFSET_TTL_MS) {
    return clockOffsetMs;
  }

  const start = Date.now();
  const response = await fetch("https://www.google.com", { method: "HEAD" });
  const dateHeader = response.headers.get("date");
  if (!dateHeader) {
    throw new Error("Missing Date header from time check");
  }

  const networkNow = new Date(dateHeader).getTime();
  const end = Date.now();
  clockOffsetMs = (start + end) / 2 - networkNow;
  lastOffsetCheck = Date.now();

  if (Math.abs(clockOffsetMs) > 60 * 1000) {
    console.warn(
      `[auth] System clock is ${Math.round(clockOffsetMs / 1000)}s ahead of Google. Sync Windows time (start the Windows Time service) to remove this workaround.`,
    );
  }

  return clockOffsetMs;
}

export async function verifyFirebaseIdToken(firebaseToken) {
  try {
    return await getAuth(app).verifyIdToken(firebaseToken);
  } catch (error) {
    const expired =
      error.code === "auth/id-token-expired" ||
      String(error.message || "").includes("id-token-expired");

    if (!expired) {
      throw error;
    }

    const offset = await getClockOffsetMs();
    const payload = jwt.decode(firebaseToken);

    if (!payload?.exp || !(payload.sub || payload.uid)) {
      throw error;
    }

    const realNow = Date.now() - offset;
    if (payload.exp * 1000 + EXPIRY_LEEWAY_MS < realNow) {
      throw error;
    }

    return {
      ...payload,
      uid: payload.uid || payload.sub,
    };
  }
}
