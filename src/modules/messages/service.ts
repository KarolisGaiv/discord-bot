import db, {type Messages} from "@/database"

export function findAll() {
    return db.selectFrom("messages").selectAll().execute()
}