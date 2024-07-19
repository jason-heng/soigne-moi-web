import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card"
import { Input } from "@/_components/ui/input"
import { getStays } from "@/_data/stays"
import { formatDate } from "@/_lib/utils"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export function SelectedPrescription({ stay }: { stay: Awaited<ReturnType<typeof getStays>>[0] | undefined }) {
    const [search, setSearch] = useState("")

    const visibleDrugs = stay?.prescription?.drugs.filter(drug => drug.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <Card className='flex-1 overflow-y-auto relative space-y-3 shadow-xl'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Préscription actuelle</CardTitle>
                {stay?.prescription && <CardDescription>{formatDate(stay.prescription.start)} - {formatDate(stay.prescription.end)}</CardDescription>}
                {stay?.prescription && <CardDescription>{stay.prescription.drugs.length} médicament{stay.prescription.drugs.length !== 1 && "s"}</CardDescription>}
                {stay?.prescription && <CardDescription className="relative">
                    <MagnifyingGlassIcon className="absolute top-[50%] translate-y-[-50%] right-2" />
                    <Input placeholder="Rechercher..." onChange={e => setSearch(e.target.value)} />
                </CardDescription>}
            </CardHeader>
            <CardContent className='space-y-3' >
                {stay ?
                    stay.prescription ?
                        visibleDrugs?.length ? visibleDrugs.map(drug => (
                            <Card className='shadow-xl' key={drug.id} >
                                <CardHeader>
                                    <CardTitle className='text-xl'>{drug.name}</CardTitle>
                                    <CardDescription>{drug.dosage}</CardDescription>
                                </CardHeader>
                            </Card>
                        )) :
                            <p className='text-muted-foreground text-center'>Aucun médicament</p>
                        :
                        <p className='text-muted-foreground text-center'>Aucune préscription</p>
                    :
                    <p className='text-muted-foreground text-center'>Aucun séjour séléctionné</p>
                }
            </CardContent>
        </Card>
    )
}