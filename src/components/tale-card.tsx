import type { TaleResponse } from '@/lib/api'
import { Link } from '@tanstack/react-router'
import { MoreHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'

export const TaleCard = ({ tale }: { tale: TaleResponse }) => (
    <Link to="/tale/$taleId" params={{ taleId: tale.id }} className="block">
        <Card size="sm">
            <CardHeader>
                <CardTitle>
                    <span className="font-heading font-semibold">{tale.name}</span>
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        {tale.timestamp}
                    </span>
                </CardTitle>
                <CardAction>
                    <Button variant="ghost" size="icon-xs">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {tale.chapters.map((chapter) => (
                        <div key={chapter.distance} className="relative flex-shrink-0">
                            <img
                                src={chapter.picture}
                                alt={`${chapter.distance}`}
                                className="size-20 rounded-lg object-cover"
                            />
                            <span className="absolute bottom-1 left-1 text-[10px] font-medium text-white bg-black/40 px-1.5 py-0.5 rounded">
                                {`KM ${chapter.distance}`}
                            </span>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        className="flex-shrink-0 size-20 rounded-lg border-dashed"
                    >
                        <Plus className="size-5 text-muted-foreground" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    </Link>
)
