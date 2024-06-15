import type { Insertable, Updateable } from "kysely"
import db, {type Templates} from "@/database"

type TemplateWithoutId = Omit<Templates, "id">

export function findTemplateById(id: number) {
    return db
    .selectFrom("templates")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow()
}

export function findTemplateByText(text: string) {
    return db
    .selectFrom("templates")
    .selectAll()
    .where("text", "=", text)
    .executeTakeFirstOrThrow()
}

export function createTemplate(text: Insertable<TemplateWithoutId>) {
    return db
    .insertInto("templates")
    .values(text)
    .returningAll()
    .executeTakeFirst()
}

export function update(id: number, text: Updateable<TemplateWithoutId>) {
    return db
    .updateTable("templates")
    .set(text)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst()
}

export function remove(id: number) {
    return db
    .deleteFrom("templates")
    .where("id", "=", id)
    .returningAll()
    .execute()
}

export async function getRandomTemplate() {
    try {
        const allTemplates = await db
            .selectFrom("templates")
            .selectAll()
            .execute()
        
        if (!allTemplates) {
            throw new Error('No templates found');
        }

        const randomIndex = Math.floor(Math.random() * allTemplates.length)
        const randomTemplate = allTemplates[randomIndex].text;

        return randomTemplate
    } catch (error) {
        console.error("Error fetching random message template", error)
        throw new Error("Failed to fetch random message template")
    }
}