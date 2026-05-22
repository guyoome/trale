import { createServerFn } from '@tanstack/react-start'
import { fetchUser } from './mock-data'

export interface Chapter {
    distance: number
    picture: string
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
