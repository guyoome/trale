import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}

export const H1 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h1 className={cn('text-xl font-bold font-heading', className)} {...props}>
            {children}
        </h1>
    )
}
