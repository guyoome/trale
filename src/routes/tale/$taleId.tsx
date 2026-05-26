import { useState } from 'react'
import { createFileRoute, useRouter, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Eye, Footprints, MoreHorizontal, Plus, Ruler, Trash2, TrendingUp, X } from 'lucide-react'
import { getTale, uploadImage, addChapter, updateChapter, deleteTale } from '@/lib/api'
import type { Chapter } from '@/lib/api'
import { GpxMapViewer } from '@/components/gpx-map-viewer-lazy'
import { H1 } from '@/components/ui/typography'
import { BottomSheet } from '@/components/bottom-sheet'
import { AddChapterForm } from '@/components/add-chapter-form'
import { StoryViewer } from '@/components/story-viewer'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/tale/$taleId')({
    loader: async ({ params }) => {
        return getTale({ data: { id: params.taleId } })
    },
    component: () => <TalePage />,
})

const TalePage = () => {
    const tale = Route.useLoaderData()
    const router = useRouter()
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isStoryOpen, setIsStoryOpen] = useState(false)
    const [editingChapter, setEditingChapter] = useState<{ index: number; chapter: Chapter } | null>(null)
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const navigate = useNavigate()

    const handleAddChapter = async (data: { distance: number; text: string; file: File | null }) => {
        setIsSubmitting(true)
        try {
            let pictureUrl = ''

            if (data.file) {
                const buffer = await data.file.arrayBuffer()
                const base64 = btoa(
                    new Uint8Array(buffer).reduce((str, byte) => str + String.fromCharCode(byte), '')
                )
                const { url } = await uploadImage({
                    data: { base64, filename: data.file.name },
                })
                pictureUrl = url
            }

            await addChapter({
                data: { taleId: tale.id, distance: data.distance, picture: pictureUrl, text: data.text || undefined },
            })

            setIsSheetOpen(false)
            router.invalidate()
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpdateChapter = async (data: { distance: number; text: string; file: File | null }) => {
        if (!editingChapter) return
        setIsSubmitting(true)
        try {
            let pictureUrl = editingChapter.chapter.picture

            // If a new file was selected, upload it
            if (data.file) {
                const buffer = await data.file.arrayBuffer()
                const base64 = btoa(
                    new Uint8Array(buffer).reduce((str, byte) => str + String.fromCharCode(byte), '')
                )
                const { url } = await uploadImage({
                    data: { base64, filename: data.file.name },
                })
                pictureUrl = url
            }

            await updateChapter({
                data: {
                    taleId: tale.id,
                    chapterIndex: editingChapter.index,
                    distance: data.distance,
                    picture: pictureUrl,
                    text: data.text || undefined,
                },
            })

            setEditingChapter(null)
            setIsSheetOpen(false)
            router.invalidate()
        } finally {
            setIsSubmitting(false)
        }
    }

    const openNewChapter = () => {
        setEditingChapter(null)
        setIsSheetOpen(true)
    }

    const openEditChapter = (index: number, chapter: Chapter) => {
        setEditingChapter({ index, chapter })
        setIsSheetOpen(true)
    }

    const handleDeleteTale = async () => {
        if (!confirm('Supprimer ce tale ? Cette action est irréversible.')) return
        await deleteTale({ data: { id: tale.id } })
        navigate({ to: '/' })
    }

    return (
        <div className="h-svh bg-background flex flex-col max-w-md mx-auto">
            <div className="shrink-0 px-4 pt-4 flex items-center justify-between">
                <button
                    onClick={() => router.history.back()}
                    className="flex items-center gap-1 text-sm text-muted-foreground"
                >
                    <ArrowLeft className="size-4" />
                    <span>Retour</span>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
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

                <div className="mt-6 grid grid-cols-3 gap-1.5">
                    {tale.chapters.map((chapter, index) => (
                        <div
                            key={chapter.id}
                            className="relative rounded-lg overflow-hidden aspect-square cursor-pointer"
                            onClick={() => openEditChapter(index, chapter)}
                        >
                            <img
                                src={chapter.picture}
                                alt={`KM ${chapter.distance}`}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 left-1 text-[10px] font-medium text-white bg-black/50 px-1.5 py-0.5 rounded">
                                KM {chapter.distance}
                            </span>
                        </div>
                    ))}
                    <div
                        onClick={openNewChapter}
                        className="flex items-center justify-center rounded-lg border-2 border-dashed border-border aspect-square cursor-pointer hover:border-muted-foreground transition-colors"
                    >
                        <Plus className="size-6 text-muted-foreground" />
                    </div>
                </div>
            </div>

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

            {/* Add chapter bottom sheet */}
            <BottomSheet open={isSheetOpen} onClose={() => { setIsSheetOpen(false); setEditingChapter(null) }}>
                <AddChapterForm
                    maxKm={tale.distanceKm}
                    elevations={tale.elevations}
                    initialData={editingChapter?.chapter}
                    onSubmit={editingChapter ? handleUpdateChapter : handleAddChapter}
                    isLoading={isSubmitting}
                />
            </BottomSheet>

            {/* Story viewer */}
            <StoryViewer
                tale={tale}
                chapters={tale.chapters}
                open={isStoryOpen}
                onClose={() => setIsStoryOpen(false)}
            />

            {/* Bottom navbar */}
            <div className="shrink-0 border-t border-border bg-background px-4 py-3 flex items-center justify-around">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsStoryOpen(true)}
                    disabled={tale.chapters.length === 0}
                    className="flex flex-col items-center gap-1 h-auto py-1.5"
                >
                    <Eye className="size-5" />
                </Button>
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                        className="flex flex-col items-center gap-1 h-auto py-1.5"
                    >
                        <MoreHorizontal className="size-5" />
                    </Button>
                    {isMoreOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsMoreOpen(false)}
                            />
                            <div className="absolute bottom-full right-0 mb-2 z-50 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[160px]">
                                <button
                                    onClick={() => {
                                        setIsMoreOpen(false)
                                        handleDeleteTale()
                                    }}
                                    className="w-full px-4 py-2.5 text-sm text-left text-destructive hover:bg-destructive/10 flex items-center gap-2"
                                >
                                    <Trash2 className="size-4" />
                                    <span>Supprimer le tale</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
