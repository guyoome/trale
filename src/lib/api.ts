import { createServerFn } from '@tanstack/react-start'
import { fetchUser, fetchTales } from './mock-data'

export const getUser = createServerFn({
    method: 'GET',
}).handler(async () => {
    return fetchUser()
})

export const getTales = createServerFn({
    method: 'GET',
}).handler(async () => {
    return fetchTales()
})
