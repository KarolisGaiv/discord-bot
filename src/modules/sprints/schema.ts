import {z} from "zod"

const schema = z.object({
    code: z.string().min(1),
    title: z.string().min(1)
})

const PartialSprint = schema.partial()

export const parseInput = (input: unknown) => PartialSprint.parse(input)
export const parseNewSprintInput = (input: unknown) => schema.parse(input)