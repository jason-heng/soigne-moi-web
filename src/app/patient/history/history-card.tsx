"use client"

import { getMyStays } from "@/_data/stays"
import { useEffect, useState } from "react"
import { SelectedPrescriptionCard } from "./selected-prescription-card"
import { StaysCard } from "./stays-card"

export function HistoryCard({ stays }: { stays: Awaited<ReturnType<typeof getMyStays>> }) {
    const [selectedStay, setSelectedStay] = useState<Awaited<ReturnType<typeof getMyStays>>[0]>()

    // Handle clicks outside of the stay details or stay items
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                !(event.target as any).closest('#prescription')
                &&
                !(event.target as any).closest('#stay')
                &&
                !(event.target as any).closest('nav')
                &&
                !(event.target as any).id.includes("search")
            ) {
                setSelectedStay(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex-1 p-5 lg:h-screen flex flex-col gap-5'>
            <h1 className='text-xl font-semibold'>L&apos;historique de vos séjours</h1>
            <div className='flex flex-col lg:flex-row lg:flex-1 gap-5 lg:min-h-0'>
                <StaysCard stays={stays} selected={selectedStay} setSelected={setSelectedStay} />
                <SelectedPrescriptionCard stay={selectedStay} />
            </div >
        </div >
    )
}



