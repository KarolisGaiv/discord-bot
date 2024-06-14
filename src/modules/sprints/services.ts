import type { Insertable } from "kysely"
import db, {type Sprints} from "@/database"

type SprintWithoutId = Omit<Sprints, "id">

export function findAllSprints() {
    return db
    .selectFrom("sprints")
    .selectAll()
    .execute()
}

export function findSprintByCode(sprintCode: string) {
    return db
    .selectFrom("sprints")
    .selectAll()
    .where("code", "=", sprintCode)
    .execute()
}

export function findSprintByTitle(sprintTitle: string) {
    return db
    .selectFrom("sprints")
    .selectAll()
    .where("title", "=", sprintTitle)
    .execute()
}