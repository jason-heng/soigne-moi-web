"use client"

import { Combobox, ComboboxOption } from '@/_components/combo-box';
import { DatePickerWithRange } from '@/_components/date-picker-with-range';
import SubmitButton from '@/_components/submit-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';
import { createStay } from './actions';
import { Doctor } from './data';

export function AddStayForm({ doctors, disabled }: { doctors: Doctor[], disabled?: boolean }) {
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>()
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>()
    const [dateRange, setDateRange] = useState<DateRange>()

    const [state, action] = useFormState(createStay, null)

    const selectedDoctor = selectedDoctorId ? doctors.find(d => d.id === +selectedDoctorId) : undefined

    const formRef = useRef<HTMLFormElement>(null);

    const specialities = doctors.reduce((specialities, doctor) => specialities.includes(doctor.speciality) ? specialities : specialities.concat(doctor.speciality), [] as string[])

    const specialityOptions: ComboboxOption[] = specialities.map(speciality => ({
        label: speciality,
        value: speciality.toLowerCase()
    }))

    const doctorOptions: ComboboxOption[] = doctors.filter(doctor => doctor.speciality.toLowerCase() === selectedSpeciality).map(doctor => ({
        label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`,
        value: '' + doctor.id,
    }))

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            setDateRange(undefined)
            setSelectedDoctorId(undefined)
            toast.success("Séjour ajouté !")
        }
    }, [state])

    return (
        <Card className='overflow-y-auto relative space-y-3'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Nouveau séjour</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="reason">Motif</Label>
                        <Input type="text" id="reason" placeholder="Le motif de votre séjour" name='reason' />
                        {state?.errors?.reason && <p className='text-sm text-destructive'>{state.errors.reason}</p>}
                    </div>
                    <div>
                        <Label htmlFor="speciality">Specialité</Label>
                        <Combobox placeholder='Choisir une specialité' emptyPlaceholder='Aucune specialité trouvée.' options={specialityOptions} selected={selectedSpeciality} setSelected={setSelectedSpeciality} />
                    </div>
                    <div>
                        <Label htmlFor="doctor">Docteur</Label>
                        <input type="number" name='doctor-id' value={selectedDoctorId} className='hidden' />
                        <Combobox placeholder='Choisir un docteur' emptyPlaceholder='Aucun docteur trouvé.' options={doctorOptions} selected={selectedDoctorId} setSelected={setSelectedDoctorId} disabled={!selectedSpeciality} />
                        {state?.errors?.doctorId && <p className='text-sm text-destructive'>{state.errors.doctorId}</p>}
                    </div>
                    <div>
                        <Label htmlFor="duration">Durée</Label>
                        <input type="text" value={dateRange?.from?.toISOString()} className="hidden" name="start" />
                        <input type="text" value={dateRange?.to?.toISOString()} className="hidden" name="end" />
                        <DatePickerWithRange placeholder='Choisir une durée' disabled={!selectedDoctorId} selected={dateRange} setSelected={setDateRange} disabledDates={selectedDoctor?.overbookedDates} availableDays={selectedDoctor?.workingDays} />
                        {state?.errors?.start && <p className='text-sm text-destructive'>{state.errors.start}</p>}
                        {state?.errors?.end && <p className='text-sm text-destructive'>{state.errors.end}</p>}
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end lg:absolute lg:right-0 lg:bottom-0'>
                    <SubmitButton disabled={disabled}>{disabled ? "Séjour en cours ou a venir" : "Ajouter"}</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    )
}