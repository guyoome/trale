import { lazy, Suspense, useState, useEffect } from 'react'
import type { LatLngExpression } from 'leaflet'

const GpxMapViewerInner = lazy(() =>
    import('./gpx-map-viewer').then((mod) => ({ default: mod.GpxMapViewer }))
)

interface GpxMapViewerLazyProps {
    coordinates: LatLngExpression[]
    fullscreen?: boolean
}

export const GpxMapViewer = ({ coordinates, fullscreen }: GpxMapViewerLazyProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-full h-full bg-muted rounded-lg" />
    }

    return (
        <Suspense fallback={<div className="w-full h-full bg-muted rounded-lg animate-pulse" />}>
            <GpxMapViewerInner coordinates={coordinates} fullscreen={fullscreen} />
        </Suspense>
    )
}
