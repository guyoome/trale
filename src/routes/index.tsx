import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { getUser, getTales } from '@/lib/api'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ProfileHeader } from '@/components/profile-header'
import { TaleCard } from '@/components/tale-card'
import { BottomNav } from '@/components/bottom-nav'
import { H1 } from '@/components/ui/typography'

export const Route = createFileRoute('/')({
    component: () => <HomePage />,
    beforeLoad: async () => {
        const user = await getUser()
        if (!user) {
            throw redirect({ to: '/login' })
        }
        return { user }
    },
    loader: async ({ context }) => {
        const tales = await getTales()
        return { user: context.user, tales }
    },
})

const HomePage = () => {
    const { user, tales } = Route.useLoaderData()
    const [isScrolled, setIsScrolled] = useState(false)
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = mainRef.current
        if (!el) return

        const handleScroll = () => {
            setIsScrolled(el.scrollTop > 20)
        }

        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="h-svh bg-background flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Animated profile header */}
            <header className="shrink-0 bg-background px-4 border-b border-border transition-all duration-300 ease-in-out">
                {/* Compact header - always rendered, fades in when scrolled */}
                <div
                    className={`flex items-center justify-between pt-3 pb-2 transition-all duration-300 ease-in-out ${isScrolled
                        ? 'opacity-100 max-h-16'
                        : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
                        }`}
                >
                    <div>
                        <H1>{user.username}</H1>
                        <p className="text-xs text-muted-foreground">{user.fullName}</p>
                    </div>
                    <Avatar className="size-9">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Full header - fades out when scrolled */}
                <div
                    className={`transition-all duration-300 ease-in-out ${isScrolled
                        ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
                        : 'opacity-100 max-h-80'
                        }`}
                >
                    <div className="py-6">
                        <ProfileHeader user={user} />
                    </div>
                </div>
            </header>

            {/* Scrollable tales list */}
            <div ref={mainRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
                <div className="space-y-4">
                    {tales.map((tale) => (
                        <TaleCard key={tale.id} tale={tale} />
                    ))}
                </div>
            </div>

            {/* Bottom navigation */}
            <BottomNav />
        </div>
    )
}
