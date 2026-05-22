import { BookOpen, Plus, User as UserIcon } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface BottomNavProps {
    active?: 'home' | 'new-tale' | 'profile'
}

export const BottomNav = ({ active }: BottomNavProps) => {
    const { pathname } = useLocation()

    const isActive = (item: string) => {
        if (active) return active === item
        if (item === 'home') return pathname === '/'
        if (item === 'new-tale') return pathname === '/new-tale'
        return false
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border">
            <div className="flex items-center justify-around py-2">
                <Link to="/">
                    <Button variant="ghost" size="icon">
                        <BookOpen className={`size-5 ${isActive('home') ? 'text-foreground' : 'text-muted-foreground'}`} />
                    </Button>
                </Link>
                <Link to="/new-tale">
                    <Button variant="ghost" size="icon">
                        <Plus className={`size-5 ${isActive('new-tale') ? 'text-foreground' : 'text-muted-foreground'}`} />
                    </Button>
                </Link>
                <Button variant="ghost" size="icon">
                    <UserIcon className={`size-5 ${isActive('profile') ? 'text-foreground' : 'text-muted-foreground'}`} />
                </Button>
            </div>
        </nav>
    )
}
