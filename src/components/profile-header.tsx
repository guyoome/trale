import type { User } from "@/lib/mock-data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { H1 } from "@/components/ui/typography"

export const ProfileHeader = ({ user }: { user: User }) => (
    <div className="flex items-start justify-between">
        <div className="flex-1">
            <H1>{user.username}</H1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <Avatar className="size-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
    </div>
)
