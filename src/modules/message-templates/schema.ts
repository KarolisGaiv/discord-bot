import { z } from 'zod';

const schema = z.object({
  id: z.coerce.number().int(),
  text: z.string().min(1),
});

export const parseTemplateSchema = (input: unknown) =>
  schema.partial().parse(input);
export const parseId = (id: unknown) => schema.shape.id.parse(id);
export const parseText = (text: unknown) =>
  z.object({ text: schema.shape.text }).parse({ text });
