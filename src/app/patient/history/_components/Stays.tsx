"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card"
import { Input } from "@/_components/ui/input"
import { getStays } from "@/_data/stays"
import { cn, formatDate } from "@/_lib/utils"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"

export function Stays({ stays, selected, setSelected }: {
    stays: Awaited<ReturnType<typeof getStays>>,
    selected: Awaited<ReturnType<typeof getStays>>[0] | undefined,
    setSelected: Dispatch<SetStateAction<Awaited<ReturnType<typeof getStays>>[0] | undefined>>
}) {
    const [search, setSearch] = useState("")

    const visibleStays = stays.filter(stay => stay.reason.toLowerCase().includes(search.toLowerCase()))

    return (
        <Card className='flex-1 overflow-y-auto relative space-y-3 shadow-xl'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Vos séjours</CardTitle>
                <CardDescription>{stays.length} séjour{stays.length !== 1 && "s"}</CardDescription>
                <CardDescription className="relative">
                    <MagnifyingGlassIcon className="absolute top-[50%] translate-y-[-50%] right-2" />
                    <Input placeholder="Rechercher..." onChange={e => setSearch(e.target.value)} />
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3' >
                {visibleStays.length ?
                    visibleStays.map(stay => (
                        <Stay key={stay.id} selected={selected} setSelected={setSelected} stay={stay} />
                    )) :
                    <p className='text-muted-foreground text-center'>Aucun séjour</p>
                }
            </CardContent>
        </Card>
    )
}

function Stay({ selected, setSelected, stay }: {
    selected: Awaited<ReturnType<typeof getStays>>[0] | undefined,
    setSelected: Dispatch<SetStateAction<Awaited<ReturnType<typeof getStays>>[0] | undefined>>,
    stay: Awaited<ReturnType<typeof getStays>>[0]
}) {
    return (
        <Card className={cn('shadow-xl hover:bg-secondary cursor-pointer', {
            "bg-secondary": selected?.id === stay.id
        })} onClick={() => setSelected(stay)} >
            <CardHeader className='pb-2 space-y-0'>
                <CardTitle className='text-xl'>{stay.reason}</CardTitle>
                <CardDescription>{formatDate(stay.start)} - {formatDate(stay.end)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
            </CardContent>
        </Card>
    )
}