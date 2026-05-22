import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const main = async () => {
    const tales = await prisma.tale.findMany({ take: 1 })
    if (tales.length > 0) {
        console.log(`✅ Connected — found tale: "${tales[0].name}"`)
    } else {
        console.log("✅ Connected — database is empty")
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error("❌ Connection failed:", e.message)
        await prisma.$disconnect()
        process.exit(1)
    })
