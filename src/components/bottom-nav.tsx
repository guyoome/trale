import { BookOpen, Plus, User as UserIcon } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const BottomNav = () => {
    const { pathname } = useLocation()

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border">
            <div className="flex items-center justify-around py-2">
                <Link to="/">
                    <Button variant="ghost" size="icon">
                        <BookOpen className={`size-5 ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`} />
                    </Button>
                </Link>
                <Link to="/new-tale">
                    <Button variant="ghost" size="icon">
                        <Plus className={`size-5 ${pathname === '/new-tale' ? 'text-foreground' : 'text-muted-foreground'}`} />
                    </Button>
                </Link>
                <Button variant="ghost" size="icon">
                    <UserIcon className="size-5 text-muted-foreground" />
                </Button>
            </div>
        </nav>
    )
}
