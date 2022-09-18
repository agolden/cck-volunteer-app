#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv';

const prisma = new PrismaClient()
dotenv.config({ path: '.env.local' });

async function main() {
    
    process.env.DATABASE_URL =  `mysql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}?schema=public`
    
    const cck = await prisma.organization.upsert({
        where: { id_ref: 'cck' },
        update: {},
        create: {
            id_ref: 'cck',
            name: 'Cambridge Community Kitchen',
            description: 'Cambridge Community Kitchen is a food solidarity collective dedicated to tackling food poverty in Cambridge.'
        },
    });

    const roles = [
      {
        role: "master-admin",
        description: "Master system admin with completely unrestricted access for all organizations"
      },
      {
        role: "events-admin",
        description: "An events admin with full access to modify a given organization's events"
      },
    ];

    for (const roleIdx in roles) {
      await prisma.system_role.upsert({
        where: { role: roles[roleIdx].role },
        update: {},
        create: roles[roleIdx],
      })
    }

    console.log("Database successfully seeded with cck data.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

