import type { User } from "@/lib/mock-data"
import { BookOpen, Camera, Footprints } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { H1 } from "@/components/ui/typography"

export const ProfileHeader = ({ user, taleCount, chapterCount, totalKmEffort }: { user: User; taleCount: number; chapterCount: number; totalKmEffort: number }) => (
    <div className="flex items-start justify-between">
        <div className="flex-1">
            <H1>{user.username}</H1>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="size-3.5" />
                    <span>Tales publiés : {taleCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Camera className="size-3.5" />
                    <span>Chapitres postés : {chapterCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Footprints className="size-3.5" />
                    <span>Km effort total : {totalKmEffort}</span>
                </div>
            </div>
        </div>

        <Avatar className="size-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
    </div>
)
