import "dotenv/config"
import { randomUUID } from "crypto"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const main = async () => {
    console.log("🌱 Seeding database...")

    await prisma.tale.deleteMany()

    await prisma.tale.createMany({
        data: [
            {
                name: "GRR3",
                timestamp: "juil. 3 - 9",
                date: new Date("2025-07-03T06:00:00Z"),
                coordinates: JSON.stringify([
                    [-21.0728, 55.389],
                    [-21.075, 55.392],
                    [-21.078, 55.395],
                    [-21.081, 55.398],
                    [-21.084, 55.401],
                    [-21.087, 55.404],
                    [-21.09, 55.407],
                    [-21.093, 55.41],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 2, picture: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 8, picture: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 13, picture: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 23,
                elevationGain: 1400,
                kmEffort: 37,
            },
            {
                name: "Ecotrail 47km",
                timestamp: "juin 26 - juil. 2",
                date: new Date("2025-06-26T07:30:00Z"),
                coordinates: JSON.stringify([
                    [48.8566, 2.3522],
                    [48.86, 2.34],
                    [48.865, 2.33],
                    [48.87, 2.32],
                    [48.875, 2.31],
                    [48.88, 2.3],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 1, picture: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 2, picture: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 7, picture: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 11, picture: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 47,
                elevationGain: 800,
                kmEffort: 55,
            },
            {
                name: "Marathon de Paris",
                timestamp: "juin 19 - 25",
                date: new Date("2025-06-19T07:00:00Z"),
                coordinates: JSON.stringify([
                    [48.8566, 2.3522],
                    [48.86, 2.36],
                    [48.87, 2.37],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 2, picture: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 22, picture: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 33, picture: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 56, picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 42,
                elevationGain: 200,
                kmEffort: 44,
            },
            {
                name: "Trail des Templiers",
                timestamp: "juin 12 - 18",
                date: new Date("2025-06-12T05:00:00Z"),
                coordinates: JSON.stringify([
                    [44.09, 3.35],
                    [44.095, 3.355],
                    [44.1, 3.36],
                    [44.105, 3.365],
                    [44.11, 3.37],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 5, picture: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 18, picture: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 34, picture: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 72,
                elevationGain: 3200,
                kmEffort: 104,
            },
            {
                name: "Ultra Trail du Mont Blanc",
                timestamp: "juin 5 - 11",
                date: new Date("2025-06-05T04:00:00Z"),
                coordinates: JSON.stringify([
                    [45.9237, 6.8694],
                    [45.93, 6.87],
                    [45.94, 6.88],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 10, picture: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 25, picture: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 50, picture: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 75, picture: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 100, picture: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 171,
                elevationGain: 10000,
                kmEffort: 271,
            },
            {
                name: "SaintéLyon",
                timestamp: "mai 29 - juin 4",
                date: new Date("2025-05-29T20:00:00Z"),
                coordinates: JSON.stringify([
                    [45.4397, 4.3872],
                    [45.5, 4.5],
                    [45.6, 4.7],
                    [45.7577, 4.8320],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 8, picture: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 24, picture: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 45, picture: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 68, picture: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 76,
                elevationGain: 1800,
                kmEffort: 94,
            },
            {
                name: "Diagonale des Fous",
                timestamp: "mai 22 - 28",
                date: new Date("2025-05-22T02:00:00Z"),
                coordinates: JSON.stringify([
                    [-21.1151, 55.5364],
                    [-21.15, 55.5],
                    [-21.2, 55.45],
                    [-21.3, 55.4],
                ]),
                chapters: JSON.stringify([
                    { id: randomUUID(), distance: 15, picture: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 40, picture: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop" },
                    { id: randomUUID(), distance: 85, picture: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop" },
                ]),
                distanceKm: 165,
                elevationGain: 9600,
                kmEffort: 261,
            },
        ],
    })

    console.log("✅ Seeded 7 tales")
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
