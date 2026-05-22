import { useState, useRef } from 'react'
import { Upload, FileCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const GpxUploader = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const dropped = e.dataTransfer.files[0]
        if (dropped && dropped.name.endsWith('.gpx')) {
            setFile(dropped)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected && selected.name.endsWith('.gpx')) {
            setFile(selected)
        }
    }

    const handleRemove = () => {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <Card>
            <CardContent>
                {file ? (
                    <div className="flex items-center justify-between gap-3 p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                            <FileCheck className="size-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} Ko
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon-xs" onClick={handleRemove}>
                            <X className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${isDragging
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                    >
                        <Upload className="size-8 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-sm font-medium">Importer un fichier GPX</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Glisser-déposer ou cliquer pour sélectionner
                            </p>
                        </div>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept=".gpx"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </CardContent>
        </Card>
    )
}
