import { db } from '../drizzle/client'
import { eq, sql } from 'drizzle-orm'
import { links } from '../drizzle/schema/links'

interface IAddQuantVisitant {
    id: string
}

export const addQuantVisitant = async ({ id }: IAddQuantVisitant) => {
    const result = await db.update(links).set({
        visits: sql`${links.visits} + 1`
    }).where(eq(links.id, id)).returning()

    return result[0]
}