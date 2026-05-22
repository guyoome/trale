import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface GpxMapViewerProps {
    coordinates: LatLngExpression[]
    fullscreen?: boolean
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

export const GpxMapViewer = ({ coordinates, fullscreen = false }: GpxMapViewerProps) => {
    if (coordinates.length === 0) return null

    const center = coordinates[0]

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
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline
                    positions={coordinates}
                    pathOptions={{ color: '#3b82f6', weight: 3 }}
                />
                <FitBounds coordinates={coordinates} />
                <InvalidateSize fullscreen={fullscreen} />
                <MapInteraction fullscreen={fullscreen} />
            </MapContainer>
        </div>
    )
}
