import { z } from "zod";

const VALUES = ["private", "public"];

export const workspaceSchema = z.object({
    communityName: z.string().min(1),
    book: z.string().min(1),
    stamps: z.number(),
    privacy: z.enum(VALUES)
});