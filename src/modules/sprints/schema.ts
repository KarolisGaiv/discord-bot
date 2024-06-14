import {z} from "zod"

const schema = z.object({
    id: z.coerce.number().int(),
    code: z.string().min(1),
    title: z.string().min(1)
})

const PartialSprint = schema.omit({ id: true }).partial()

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parsePartialInput = (input: unknown) => PartialSprint.parse(input)
export const parseNewSprintInput = (input: unknown) => schema.omit({ id: true }).parse(input)