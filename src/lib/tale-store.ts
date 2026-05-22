"use server"

import { db } from '@/lib/db'
import type { Tale as PrismaTale } from '@/generated/prisma/client'

export interface Chapter {
    distance: number
    picture: string
}

export interface StoredTale {
    id: string
    name: string
    timestamp: string
    date: string | null
    coordinates: [number, number][]
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
    chapters: JSON.parse(tale.chapters) as Chapter[],
    distanceKm: tale.distanceKm,
    elevationGain: tale.elevationGain,
    kmEffort: tale.kmEffort,
})

export const saveTale = async (data: Omit<StoredTale, 'id'>): Promise<string> => {
    const tale = await db.tale.create({
        data: {
            name: data.name,
            timestamp: data.timestamp,
            date: data.date ? new Date(data.date) : null,
            coordinates: JSON.stringify(data.coordinates),
            chapters: JSON.stringify(data.chapters),
            distanceKm: data.distanceKm,
            elevationGain: data.elevationGain,
            kmEffort: data.kmEffort,
        },
    })
    return tale.id
}

export const getTaleById = async (id: string): Promise<StoredTale | null> => {
    const tale = await db.tale.findUnique({ where: { id } })
    if (!tale) return null
    return toStoredTale(tale)
}

export const getAllTales = async (): Promise<StoredTale[]> => {
    const tales = await db.tale.findMany()
    return tales.map(toStoredTale)
}
