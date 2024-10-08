import 'server-only';

import { logout } from '@/_lib/actions';
import { Prisma } from '@prisma/client';
import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";
import { getUser } from './users';

export async function getMyStays() {
    const session = await verifySession()

    return await prisma.stay.findMany({
        where: {
            patientId: session.user.id,
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            }
        },
        orderBy: {
            id: "asc"
        }
    })
}

export async function getStays(args?: Prisma.StayFindManyArgs) {
    const user = await getUser()

    if (!user.admin) logout()

    return await prisma.stay.findMany(args)
}