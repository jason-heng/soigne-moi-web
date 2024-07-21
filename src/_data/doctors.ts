import 'server-only'

import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";

export async function getDoctors() {
    await verifySession()

    return await prisma.doctor.findMany({
        select: {
            id: true,
            registrationNumber: true,
            firstName: true,
            lastName: true,
            speciality: true,
            worksSunday: true,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksFriday: true,
            worksSaturday: true,

        }
    })
}

export async function getDoctor(doctorId: number) {
    await verifySession()

    return await prisma.doctor.findUnique({
        select: {
            id: true,
            registrationNumber: true,
            firstName: true,
            lastName: true,
            speciality: true,
            worksSunday: true,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksFriday: true,
            worksSaturday: true,

        },
        where: {
            id: doctorId,
        }
    })
}