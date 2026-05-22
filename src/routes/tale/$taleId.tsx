import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footprints, Ruler, TrendingUp, X } from 'lucide-react'
import { getTale } from '@/lib/api'
import { GpxMapViewer } from '@/components/gpx-map-viewer'
import { BottomNav } from '@/components/bottom-nav'
import { H1 } from '@/components/ui/typography'

export const Route = createFileRoute('/tale/$taleId')({
    loader: async ({ params }) => {
        return getTale({ data: { id: params.taleId } })
    },
    component: () => <TalePage />,
})

const TalePage = () => {
    const tale = Route.useLoaderData()
    const [isFullscreen, setIsFullscreen] = useState(false)

    return (
        <div className="h-svh bg-background flex flex-col max-w-md mx-auto">
            <div className="flex-1 px-4 pt-8 pb-20">
                <div className="flex items-stretch gap-6">
                    <div className="flex-1 min-w-0">
                        <H1 className="leading-tight break-words">
                            {tale.name}
                        </H1>

                        {tale.date && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {new Date(tale.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        )}

                        <div className="mt-3 space-y-1.5">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Ruler className="size-3.5" />
                                <span>Km: {tale.distanceKm}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <TrendingUp className="size-3.5" />
                                <span>D+: {tale.elevationGain}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Footprints className="size-3.5" />
                                <span>Km effort: {tale.kmEffort}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`shrink-0 w-40 cursor-pointer transition-opacity duration-300 ${isFullscreen ? 'opacity-0' : 'opacity-100'
                            }`}
                        onClick={() => setIsFullscreen(true)}
                    >
                        <GpxMapViewer coordinates={tale.coordinates} />
                    </div>
                </div>
            </div>

            <BottomNav active="new-tale" />

            {/* Fullscreen map overlay */}
            <div
                className={`fixed inset-0 z-50 bg-background transition-all duration-300 ease-in-out ${isFullscreen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                style={{
                    transform: isFullscreen ? 'scale(1)' : 'scale(0.3)',
                    transformOrigin: 'top right',
                }}
            >
                <div className="relative w-full h-full">
                    <GpxMapViewer
                        coordinates={tale.coordinates}
                        fullscreen={isFullscreen}
                    />
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border"
                    >
                        <X className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
