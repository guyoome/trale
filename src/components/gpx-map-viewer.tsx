import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface ChapterPin {
    distance: number
}

interface GpxMapViewerProps {
    coordinates: LatLngExpression[]
    fullscreen?: boolean
    chapters?: ChapterPin[]
}

const FitBounds = ({ coordinates }: { coordinates: LatLngExpression[] }) => {
    const map = useMap()

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = L.latLngBounds(
                coordinates.map((c) => {
                    if (Array.isArray(c)) return [c[0] as number, c[1] as number] as [number, number]
                    return [0, 0] as [number, number]
                })
            )
            map.fitBounds(bounds, { padding: [20, 20] })
        }
    }, [coordinates, map])

    return null
}

const InvalidateSize = ({ fullscreen }: { fullscreen: boolean }) => {
    const map = useMap()

    useEffect(() => {
        // Wait for the CSS transition to finish before invalidating
        const timeout = setTimeout(() => {
            map.invalidateSize()
        }, 350)
        return () => clearTimeout(timeout)
    }, [fullscreen, map])

    return null
}

const MapInteraction = ({ fullscreen }: { fullscreen: boolean }) => {
    const map = useMap()

    useEffect(() => {
        if (fullscreen) {
            map.dragging.enable()
            map.scrollWheelZoom.enable()
            map.touchZoom.enable()
            map.doubleClickZoom.enable()
            map.boxZoom.enable()
        } else {
            map.dragging.disable()
            map.scrollWheelZoom.disable()
            map.touchZoom.disable()
            map.doubleClickZoom.disable()
            map.boxZoom.disable()
        }
    }, [fullscreen, map])

    return null
}

const getPositionAtKm = (coordinates: LatLngExpression[], km: number): [number, number] | null => {
    if (coordinates.length < 2) return null

    const targetMeters = km * 1000
    let accumulated = 0

    for (let i = 1; i < coordinates.length; i++) {
        const prev = coordinates[i - 1] as [number, number]
        const curr = coordinates[i] as [number, number]
        const from = L.latLng(prev[0], prev[1])
        const to = L.latLng(curr[0], curr[1])
        const segmentDist = from.distanceTo(to)

        if (accumulated + segmentDist >= targetMeters) {
            const ratio = (targetMeters - accumulated) / segmentDist
            const lat = prev[0] + (curr[0] - prev[0]) * ratio
            const lng = prev[1] + (curr[1] - prev[1]) * ratio
            return [lat, lng]
        }

        accumulated += segmentDist
    }

    // If km exceeds track length, return last point
    const last = coordinates[coordinates.length - 1] as [number, number]
    return [last[0], last[1]]
}

const chapterIcon = L.divIcon({
    html: `<div class="chapter-pin">
        <div class="chapter-pin-head">📷</div>
        <div class="chapter-pin-tail"></div>
    </div>`,
    className: 'chapter-marker',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
})

export const GpxMapViewer = ({ coordinates, fullscreen = false, chapters = [] }: GpxMapViewerProps) => {
    if (coordinates.length === 0) return null

    const center = coordinates[0]

    const chapterPositions = useMemo(() => {
        return chapters
            .map((ch) => getPositionAtKm(coordinates, ch.distance))
            .filter((pos): pos is [number, number] => pos !== null)
    }, [coordinates, chapters])

    return (
        <div className="w-full h-full rounded-lg overflow-hidden relative z-0">
            <MapContainer
                center={center}
                zoom={13}
                className="h-full w-full"
                scrollWheelZoom={fullscreen}
                zoomControl={fullscreen}
                attributionControl={false}
                dragging={fullscreen}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                <Polyline
                    positions={coordinates}
                    pathOptions={{ color: 'oklch(0.852 0.199 91.936)', weight: 3 }}
                />
                {chapterPositions.map((pos, idx) => (
                    <Marker key={idx} position={pos} icon={chapterIcon} />
                ))}
                <FitBounds coordinates={coordinates} />
                <InvalidateSize fullscreen={fullscreen} />
                <MapInteraction fullscreen={fullscreen} />
            </MapContainer>
        </div>
    )
}
