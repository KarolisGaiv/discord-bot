import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1),
  sprintCode: z.string().min(1),
  message: z.string().min(1),
  gifUrl: z.string().min(1),
});

export const parseFullSchema = (input: unknown) => schema.parse(input);
export const parsePartialInput = (input: unknown) =>
  schema.partial().parse(input);
