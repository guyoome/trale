import { useMemo } from "react"

interface ElevationPoint {
    distance: number
    elevation: number
}

interface ElevationProfileProps {
    elevations: ElevationPoint[]
    maxKm: number
    currentKm: number
}

export const ElevationProfile = ({ elevations, maxKm, currentKm }: ElevationProfileProps) => {
    const { path, markerX, markerY, viewBox } = useMemo(() => {
        if (elevations.length < 2) {
            return { path: "", markerX: 0, markerY: 0, viewBox: "0 0 100 40" }
        }

        const width = 300
        const height = 60
        const padding = { top: 4, bottom: 4, left: 0, right: 0 }
        const chartWidth = width - padding.left - padding.right
        const chartHeight = height - padding.top - padding.bottom

        const minEle = Math.min(...elevations.map((p) => p.elevation))
        const maxEle = Math.max(...elevations.map((p) => p.elevation))
        const eleRange = maxEle - minEle || 1

        const toX = (distance: number) =>
            padding.left + (distance / maxKm) * chartWidth
        const toY = (elevation: number) =>
            padding.top + chartHeight - ((elevation - minEle) / eleRange) * chartHeight

        // Build the area path (filled)
        const points = elevations.map((p) => ({
            x: toX(p.distance),
            y: toY(p.elevation),
        }))

        let d = `M ${points[0].x} ${points[0].y}`
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i].x} ${points[i].y}`
        }
        // Close the area at the bottom
        d += ` L ${points[points.length - 1].x} ${height - padding.bottom}`
        d += ` L ${points[0].x} ${height - padding.bottom} Z`

        // Find marker position by interpolating elevation at currentKm
        const mX = toX(currentKm)
        let mY = toY(elevations[0].elevation)

        // Find the two surrounding points for interpolation
        for (let i = 0; i < elevations.length - 1; i++) {
            if (elevations[i].distance <= currentKm && elevations[i + 1].distance >= currentKm) {
                const ratio =
                    (currentKm - elevations[i].distance) /
                    (elevations[i + 1].distance - elevations[i].distance || 1)
                const ele =
                    elevations[i].elevation +
                    ratio * (elevations[i + 1].elevation - elevations[i].elevation)
                mY = toY(ele)
                break
            }
        }

        // If currentKm is beyond last point
        if (currentKm >= elevations[elevations.length - 1].distance) {
            mY = toY(elevations[elevations.length - 1].elevation)
        }

        return {
            path: d,
            markerX: mX,
            markerY: mY,
            viewBox: `0 0 ${width} ${height}`,
        }
    }, [elevations, maxKm, currentKm])

    if (elevations.length < 2) return null

    return (
        <div className="w-full">
            <svg
                viewBox={viewBox}
                className="w-full h-14"
                preserveAspectRatio="none"
            >
                {/* Elevation area fill */}
                <path
                    d={path}
                    fill="oklch(from var(--primary) l c h / 0.15)"
                    stroke="oklch(from var(--primary) l c h / 0.5)"
                    strokeWidth="1"
                />
                {/* Vertical line at current km */}
                <line
                    x1={markerX}
                    y1="0"
                    x2={markerX}
                    y2="60"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                />
                {/* Dot at current elevation */}
                <circle
                    cx={markerX}
                    cy={markerY}
                    r="3"
                    fill="var(--primary)"
                />
            </svg>
        </div>
    )
}
