import "server-only";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { ContactPayload } from "./contact";

export type Submission = ContactPayload & {
  id: string;
  createdAt: string;
  locale: "uk" | "en";
  userAgent?: string;
};

/**
 * Where submissions are stored: one JSON object per line (JSON Lines).
 * Override with SUBMISSIONS_FILE. The default folder `data/` is git-ignored.
 */
export const SUBMISSIONS_FILE = process.env.SUBMISSIONS_FILE ?? path.join(process.cwd(), "data", "submissions.jsonl");

export async function saveSubmission(input: Omit<Submission, "id" | "createdAt">): Promise<Submission> {
  const submission: Submission = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };

  await mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  await appendFile(SUBMISSIONS_FILE, JSON.stringify(submission) + "\n", "utf8");

  // TODO(telegram): also notify the bot here, e.g.
  //   await notifyTelegram(submission);
  // using TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID and
  //   POST https://api.telegram.org/bot<token>/sendMessage { chat_id, text }
  return submission;
}
