import { createServerFn } from '@tanstack/react-start'
import { fetchUser } from './mock-data'

export interface Chapter {
    id: string
    distance: number
    picture: string
    text?: string
}

export interface TaleResponse {
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

export interface CreateTaleInput {
    name: string
    timestamp: string
    date: string | null
    coordinates: [number, number][]
    chapters: Chapter[]
    distanceKm: number
    elevationGain: number
    kmEffort: number
}

export const getUser = createServerFn({
    method: 'GET',
}).handler(async () => {
    return fetchUser()
})

export const getTales = createServerFn({
    method: 'GET',
}).handler(async () => {
    const { getAllTales } = await import('./tale-store')
    return getAllTales()
})

export const getTale = createServerFn({
    method: 'GET',
}).inputValidator((input: { id: string }) => input)
    .handler(async ({ data }) => {
        const { getTaleById } = await import('./tale-store')
        const tale = await getTaleById(data.id)
        if (!tale) {
            throw new Error('Tale not found')
        }
        return tale
    })

export const createTale = createServerFn({
    method: 'POST',
}).inputValidator((input: CreateTaleInput) => input)
    .handler(async ({ data }) => {
        const { saveTale } = await import('./tale-store')
        const id = await saveTale(data)
        return { id }
    })

export const uploadImage = createServerFn({
    method: 'POST',
}).inputValidator((input: { base64: string; filename: string }) => input)
    .handler(async ({ data }) => {
        const { writeFile } = await import('fs/promises')
        const { join } = await import('path')
        const { randomUUID } = await import('crypto')

        const ext = data.filename.split('.').pop() || 'jpg'
        const name = `${randomUUID()}.${ext}`
        const buffer = Buffer.from(data.base64, 'base64')
        await writeFile(join('public', 'uploads', name), buffer)

        return { url: `/uploads/${name}` }
    })

export const addChapter = createServerFn({
    method: 'POST',
}).inputValidator((input: { taleId: string; distance: number; picture: string; text?: string }) => input)
    .handler(async ({ data }) => {
        const { addChapterToTale } = await import('./tale-store')
        await addChapterToTale(data.taleId, { distance: data.distance, picture: data.picture, text: data.text })
        return { success: true }
    })

export const updateChapter = createServerFn({
    method: 'POST',
}).inputValidator((input: { taleId: string; chapterIndex: number; distance: number; picture: string; text?: string }) => input)
    .handler(async ({ data }) => {
        const { updateChapterInTale } = await import('./tale-store')
        await updateChapterInTale(data.taleId, data.chapterIndex, { distance: data.distance, picture: data.picture, text: data.text })
        return { success: true }
    })
