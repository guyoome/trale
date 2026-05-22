import { useEffect } from 'react'
import { X } from 'lucide-react'

interface BottomSheetProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sheet */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto bg-background rounded-t-2xl shadow-xl transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-muted-foreground"
                    >
                        <X className="size-5" />
                    </button>
                </div>
                <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    )
}
