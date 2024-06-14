import db, {type Messages} from "@/database"

export function findAll() {
    return db.selectFrom("messages").selectAll().execute()
}

export function findByUserId(userName: string) {
    return db
    .selectFrom("messages")
    .selectAll()
    .where("username", "=", userName)
    .execute()
}