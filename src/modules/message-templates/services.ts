import type { Insertable } from "kysely"
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