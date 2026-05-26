import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Chapter } from '@/lib/api'
import { GpxMapViewer } from '@/components/gpx-map-viewer-lazy'

interface TaleInfo {
    name: string
    distanceKm: number
    elevationGain: number
    kmEffort: number
    coordinates: [number, number][]
}

interface StoryViewerProps {
    tale: TaleInfo
    chapters: Chapter[]
    open: boolean
    onClose: () => void
}

const STORY_DURATION = 5000 // 5 seconds per slide

export const StoryViewer = ({ tale, chapters, open, onClose }: StoryViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    // Total slides = 1 (map intro) + chapters
    const totalSlides = 1 + chapters.length

    const goNext = () => {
        setProgress(0)
        setCurrentIndex((i) => {
            if (i < totalSlides - 1) return i + 1
            onClose()
            return i
        })
    }

    const goPrev = () => {
        setProgress(0)
        setCurrentIndex((i) => (i > 0 ? i - 1 : i))
    }

    // Reset when opening
    useEffect(() => {
        if (open) {
            setCurrentIndex(0)
            setProgress(0)
        }
    }, [open])

    // Progress bar animation + auto-advance
    useEffect(() => {
        if (!open) return

        const startTime = Date.now()

        const frame = () => {
            const elapsed = Date.now() - startTime
            const pct = Math.min((elapsed / STORY_DURATION) * 100, 100)
            setProgress(pct)

            if (pct >= 100) {
                setCurrentIndex((i) => {
                    if (i < totalSlides - 1) return i + 1
                    onClose()
                    return i
                })
                setProgress(0)
                return
            }

            rafId = requestAnimationFrame(frame)
        }

        let rafId = requestAnimationFrame(frame)

        return () => cancelAnimationFrame(rafId)
    }, [open, currentIndex, totalSlides, onClose])

    // Tap zones
    const handleTap = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        if (x < rect.width / 3) {
            goPrev()
        } else {
            goNext()
        }
    }

    if (!open) return null

    const isMapSlide = currentIndex === 0
    const chapter = !isMapSlide ? chapters[currentIndex - 1] : null

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 px-2 pt-3">
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-none"
                            style={{
                                width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-4 z-10 text-white/80"
            >
                <X className="size-6" />
            </button>

            {/* Content + tap zones */}
            <div className="flex-1 relative" onClick={handleTap}>
                {isMapSlide ? (
                    <>
                        {/* Map background */}
                        <div className="w-full h-full">
                            <GpxMapViewer coordinates={tale.coordinates} chapters={chapters} />
                        </div>

                        {/* Title overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                            <h1 className="text-3xl font-bold font-heading text-white leading-tight">
                                {tale.name}
                            </h1>
                            <div className="mt-2 flex gap-4 text-sm text-white/80">
                                <span>{tale.distanceKm} km</span>
                                <span>D+ {tale.elevationGain}m</span>
                                <span>{tale.kmEffort} km effort</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <img
                            src={chapter!.picture}
                            alt={`KM ${chapter!.distance}`}
                            className="w-full h-full object-cover"
                        />

                        {/* KM chip at top left */}
                        <div className="absolute top-12 left-4 z-10">
                            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                                KM {chapter!.distance}
                            </span>
                        </div>

                        {/* Text at bottom */}
                        {chapter!.text && (
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="bg-black/40 backdrop-blur-sm text-white text-xl font-semibold px-5 py-2 rounded-sm text-center block">
                                    {chapter!.text}
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
