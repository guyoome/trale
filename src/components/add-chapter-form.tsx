import { useState, useRef, useEffect } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Chapter } from '@/lib/api'

interface AddChapterFormProps {
    maxKm: number
    initialData?: Chapter
    onSubmit: (data: { distance: number; text: string; file: File | null }) => void
    isLoading?: boolean
}

export const AddChapterForm = ({ maxKm, initialData, onSubmit, isLoading }: AddChapterFormProps) => {
    const [distance, setDistance] = useState(initialData?.distance ?? Math.round(maxKm / 2))
    const [text, setText] = useState(initialData?.text ?? '')
    const [file, setFile] = useState<File | null>(null)
    const [picturePreview, setPicturePreview] = useState<string | null>(initialData?.picture ?? null)
    const fileRef = useRef<HTMLInputElement>(null)

    const isEditing = !!initialData

    useEffect(() => {
        setDistance(initialData?.distance ?? Math.round(maxKm / 2))
        setText(initialData?.text ?? '')
        setFile(null)
        setPicturePreview(initialData?.picture ?? null)
    }, [initialData, maxKm])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected) {
            setFile(selected)
            const url = URL.createObjectURL(selected)
            setPicturePreview(url)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!picturePreview) return
        onSubmit({ distance, text, file })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-bold font-heading">
                {isEditing ? 'Modifier le chapitre' : 'Nouveau chapitre'}
            </h2>

            {/* KM Slider */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Distance : <span className="text-primary">{distance} km</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={maxKm}
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 km</span>
                    <span>{maxKm} km</span>
                </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Note</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Un moment marquant..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            {/* Picture */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Photo</label>
                {picturePreview ? (
                    <div className="relative">
                        <img
                            src={picturePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setFile(null)
                                setPicturePreview(null)
                                if (fileRef.current) fileRef.current.value = ''
                            }}
                            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 text-xs"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-2 h-32 rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-muted-foreground transition-colors"
                    >
                        <ImagePlus className="size-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Ajouter une photo</span>
                    </div>
                )}
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Envoi...' : isEditing ? 'Enregistrer' : 'Ajouter le chapitre'}
            </Button>
        </form>
    )
}
