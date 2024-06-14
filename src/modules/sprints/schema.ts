import {z} from "zod"

const schema = z.object({
    code: z.string(),
    title: z.string()
})

export const parseInput = (input: unknown) => schema.parse(input)