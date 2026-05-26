import { db } from '@/lib/db'
import type { Tale as PrismaTale } from '@/generated/prisma/client'

export interface Chapter {
    id: string
    distance: number
    picture: string
    text?: string
}

export interface StoredTale {
    id: string
    name: string
    timestamp: string
    date: string | null
    coordinates: [number, number][]
    elevations: { distance: number; elevation: number }[]
    chapters: Chapter[]
    distanceKm: number
    elevationGain: number
    kmEffort: number
}

const toStoredTale = (tale: PrismaTale): StoredTale => ({
    id: tale.id,
    name: tale.name,
    timestamp: tale.timestamp,
    date: tale.date?.toISOString() ?? null,
    coordinates: JSON.parse(tale.coordinates) as [number, number][],
    elevations: JSON.parse(tale.elevations) as { distance: number; elevation: number }[],
    chapters: JSON.parse(tale.chapters) as Chapter[],
    distanceKm: tale.distanceKm,
    elevationGain: tale.elevationGain,
    kmEffort: tale.kmEffort,
})

export const saveTale = async (data: Omit<StoredTale, 'id'> & { userId: string }): Promise<string> => {
    const tale = await db.tale.create({
        data: {
            name: data.name,
            timestamp: data.timestamp,
            date: data.date ? new Date(data.date) : null,
            coordinates: JSON.stringify(data.coordinates),
            elevations: JSON.stringify(data.elevations),
            chapters: JSON.stringify(data.chapters),
            distanceKm: data.distanceKm,
            elevationGain: data.elevationGain,
            kmEffort: data.kmEffort,
            userId: data.userId,
        },
    })
    return tale.id
}

export const getTaleById = async (id: string): Promise<StoredTale | null> => {
    const tale = await db.tale.findUnique({ where: { id } })
    if (!tale) return null
    return toStoredTale(tale)
}

export const getAllTales = async (userId: string): Promise<StoredTale[]> => {
    const tales = await db.tale.findMany({ where: { userId } })
    return tales.map(toStoredTale)
}

export const addChapterToTale = async (taleId: string, chapter: Omit<Chapter, 'id'>): Promise<void> => {
    const { randomUUID } = await import('crypto')
    const tale = await db.tale.findUnique({ where: { id: taleId } })
    if (!tale) throw new Error('Tale not found')

    const chapters = JSON.parse(tale.chapters) as Chapter[]
    chapters.push({ ...chapter, id: randomUUID() })
    chapters.sort((a, b) => a.distance - b.distance)

    await db.tale.update({
        where: { id: taleId },
        data: { chapters: JSON.stringify(chapters) },
    })
}

export const updateChapterInTale = async (taleId: string, chapterIndex: number, chapter: Omit<Chapter, 'id'>): Promise<void> => {
    const tale = await db.tale.findUnique({ where: { id: taleId } })
    if (!tale) throw new Error('Tale not found')

    const chapters = JSON.parse(tale.chapters) as Chapter[]
    chapters[chapterIndex] = { ...chapter, id: chapters[chapterIndex].id }
    chapters.sort((a, b) => a.distance - b.distance)

    await db.tale.update({
        where: { id: taleId },
        data: { chapters: JSON.stringify(chapters) },
    })
}

export const deleteTaleById = async (id: string): Promise<void> => {
    await db.tale.delete({ where: { id } })
}
