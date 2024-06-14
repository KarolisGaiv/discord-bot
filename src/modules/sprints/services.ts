import type { Insertable } from "kysely"
import db, {type Sprints} from "@/database"

type SprintWithoutId = Omit<Sprints, "id">

export function findAllSprints() {
    return db
    .selectFrom("sprints")
    .selectAll()
    .execute()
}