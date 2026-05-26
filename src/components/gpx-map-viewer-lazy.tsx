import { lazy, Suspense, useState, useEffect } from 'react'
import type { LatLngExpression } from 'leaflet'

const GpxMapViewerInner = lazy(() =>
    import('./gpx-map-viewer').then((mod) => ({ default: mod.GpxMapViewer }))
)

interface ChapterPin {
    distance: number
}

interface GpxMapViewerLazyProps {
    coordinates: LatLngExpression[]
    fullscreen?: boolean
    chapters?: ChapterPin[]
}

export const GpxMapViewer = ({ coordinates, fullscreen, chapters }: GpxMapViewerLazyProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-full h-full bg-muted rounded-lg" />
    }

    return (
        <Suspense fallback={<div className="w-full h-full bg-muted rounded-lg animate-pulse" />}>
            <GpxMapViewerInner coordinates={coordinates} fullscreen={fullscreen} chapters={chapters} />
        </Suspense>
    )
}
