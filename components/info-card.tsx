import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface InfoCardProps {
    icon: ReactNode
    boldText: string
    content: string
}

export const InfoCard = (
    {
        icon, boldText, content
    }: InfoCardProps
) => {
    return (
        <Card className="rounded-none w-full bg-black p-4 lg:p-4">
            <CardHeader>
                <CardTitle className="flex gap-4">
                    {icon}
                </CardTitle>
            </CardHeader>
            <CardContent className="md:text-xl text-pretty leading-relaxed text-neutral-400">
                <span className="font-bold text-white">{boldText} </span>
                {content}
            </CardContent>
        </Card>
    )
}