import {z} from "zod"   

const schema = z.object({
    username: z.string(),
    sprintCode: z.string()
})

export const parseInput = (input: unknown) => schema.parse(input)