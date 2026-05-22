import type { User } from '@/lib/mock-data'
import { Calendar, MapPin, Camera } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export const ProfileHeader = ({ user }: { user: User }) => (
    <div className="flex items-start justify-between">
        <div className="flex-1">
            <h1 className="text-2xl font-bold font-heading">{user.username}</h1>
            <p className="text-sm text-muted-foreground">{user.fullName}</p>

            <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>Semaines publiées: {user.talePublished}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    <span>Lieu de résidence: {user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Camera className="size-3.5" />
                    <span>Dernière photo: {user.lastTale}</span>
                </div>
            </div>
        </div>

        <Avatar className="size-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
    </div>
)
