import { createFileRoute } from '@tanstack/react-router'
import { GpxUploader } from '@/components/gpx-uploader'
import { BottomNav } from '@/components/bottom-nav'
import { H1 } from '@/components/ui/typography'

export const Route = createFileRoute('/new-tale')({
    component: () => <NewTalePage />,
})

const NewTalePage = () => (
    <div className="h-svh bg-background flex flex-col max-w-md mx-auto overflow-hidden">
        <header className="shrink-0 px-4 pt-6 pb-4 border-b border-border">
            <H1>Nouveau Tale</H1>
            <p className="text-sm text-muted-foreground mt-1">
                Importe ton fichier GPX pour créer un nouveau tale
            </p>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-20">
            <GpxUploader />
        </div>

        <BottomNav />
    </div>
)
