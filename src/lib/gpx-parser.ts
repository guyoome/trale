export interface GpxPoint {
    lat: number
    lon: number
    ele: number | null
}

export interface GpxData {
    name: string
    date: string | null
    points: GpxPoint[]
    coordinates: [number, number][]
    elevations: ElevationPoint[]
    distanceKm: number
    elevationGain: number
    kmEffort: number
}

export interface ElevationPoint {
    distance: number // cumulative distance in km
    elevation: number // elevation in meters
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const extractPoints = (doc: Document): GpxPoint[] => {
    const selectors = ['trkpt', 'wpt', 'rtept']
    for (const selector of selectors) {
        const elements = doc.querySelectorAll(selector)
        if (elements.length > 0) {
            const points: GpxPoint[] = []
            elements.forEach((el) => {
                const lat = parseFloat(el.getAttribute('lat') || '0')
                const lon = parseFloat(el.getAttribute('lon') || '0')
                const eleEl = el.querySelector('ele')
                const ele = eleEl ? parseFloat(eleEl.textContent || '0') : null
                if (lat && lon) {
                    points.push({ lat, lon, ele })
                }
            })
            return points
        }
    }
    return []
}

const extractName = (doc: Document, fallbackName: string): string => {
    const nameEl = doc.querySelector('trk > name') || doc.querySelector('metadata > name')
    if (nameEl?.textContent) {
        return nameEl.textContent
    }
    // Remove .gpx extension from filename
    return fallbackName.replace(/\.gpx$/i, '')
}

const extractDate = (doc: Document): string | null => {
    // Try metadata time first, then first trackpoint time
    const timeEl =
        doc.querySelector('metadata > time') ||
        doc.querySelector('trkpt > time')
    if (timeEl?.textContent) {
        return timeEl.textContent
    }
    return null
}

export const parseGpx = (gpxContent: string, fileName: string): GpxData => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(gpxContent, 'application/xml')

    const points = extractPoints(doc)
    const name = extractName(doc, fileName)
    const date = extractDate(doc)
    const coordinates: [number, number][] = points.map((p) => [p.lat, p.lon])

    // Calculate total distance
    let distanceKm = 0
    for (let i = 1; i < points.length; i++) {
        distanceKm += haversineDistance(
            points[i - 1].lat,
            points[i - 1].lon,
            points[i].lat,
            points[i].lon
        )
    }

    // Calculate elevation gain (D+)
    let elevationGain = 0
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1].ele
        const curr = points[i].ele
        if (prev !== null && curr !== null && curr > prev) {
            elevationGain += curr - prev
        }
    }

    // Km effort = km + D+ / 100
    const kmEffort = distanceKm + elevationGain / 100

    // Build elevation profile (distance vs elevation)
    const elevations: ElevationPoint[] = []
    let cumulativeDistance = 0
    for (let i = 0; i < points.length; i++) {
        if (i > 0) {
            cumulativeDistance += haversineDistance(
                points[i - 1].lat,
                points[i - 1].lon,
                points[i].lat,
                points[i].lon
            )
        }
        if (points[i].ele !== null) {
            elevations.push({
                distance: cumulativeDistance,
                elevation: points[i].ele!,
            })
        }
    }

    return {
        name,
        date,
        points,
        coordinates,
        elevations,
        distanceKm: Math.round(distanceKm),
        elevationGain: Math.round(elevationGain),
        kmEffort: Math.round(kmEffort),
    }
}
