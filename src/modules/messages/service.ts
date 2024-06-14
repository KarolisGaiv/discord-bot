import db from "@/database"

export function findAllMessages() {
    return db.selectFrom("messages").selectAll().execute()
}

export function findMessagesByUserId(userName: string) {
    return db
    .selectFrom("messages")
    .selectAll()
    .where("username", "=", userName)
    .execute()
}

export function findMessagesBySprintCode(sprintCode: string) {
    return db
    .selectFrom("messages")
    .selectAll()
    .where("sprintCode", "=", sprintCode)
    .execute()
}