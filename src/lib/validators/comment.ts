import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CommentValidation = z.infer<typeof CommentSchema>;

export const CommentVoteSchema = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type CommentVoteValidation = z.infer<typeof CommentVoteSchema>;
