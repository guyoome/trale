export interface User {
    username: string
    fullName: string
    avatar: string
    talePublished: number
    location: string
    lastTale: string
}

export interface Chapter {
    distance: number
    picture: string
}

export interface Tale {
    name: string
    timestamp: string
    chapters: Chapter[]
}

const mockUser: User = {
    username: 'gmaurin',
    fullName: 'Guillaume Maurin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    talePublished: 32,
    location: 'Ile de France, Paris',
    lastTale: 'Lundi 00',
}

const mockTales: Tale[] = [
    {
        name: 'GRR3',
        timestamp: 'juil. 3 - 9',
        chapters: [
            {
                distance: 2,
                picture: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
            },
            {
                distance: 8,
                picture: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop',
            },
            {
                distance: 13,
                picture: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'Ecotrail 47km',
        timestamp: 'juin 26 - juil. 2',
        chapters: [
            {
                distance: 1,
                picture: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop',
            },
            {
                distance: 2,
                picture: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop',
            },
            {
                distance: 7,
                picture: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200&h=200&fit=crop',
            },
            {
                distance: 11,
                picture: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'Marathon de Paris',
        timestamp: 'juin 19 - 25',
        chapters: [
            {
                distance: 2,
                picture: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop',
            },
            {
                distance: 22,
                picture: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&h=200&fit=crop',
            },
            {
                distance: 33,
                picture: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop',
            },
            {
                distance: 56,
                picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'Trail des Templiers',
        timestamp: 'juin 12 - 18',
        chapters: [
            {
                distance: 5,
                picture: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
            },
            {
                distance: 18,
                picture: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=200&h=200&fit=crop',
            },
            {
                distance: 34,
                picture: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'Ultra Trail du Mont Blanc',
        timestamp: 'juin 5 - 11',
        chapters: [
            {
                distance: 10,
                picture: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200&h=200&fit=crop',
            },
            {
                distance: 25,
                picture: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop',
            },
            {
                distance: 50,
                picture: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop',
            },
            {
                distance: 75,
                picture: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=200&fit=crop',
            },
            {
                distance: 100,
                picture: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'SaintéLyon',
        timestamp: 'mai 29 - juin 4',
        chapters: [
            {
                distance: 8,
                picture: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop',
            },
            {
                distance: 24,
                picture: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&h=200&fit=crop',
            },
            {
                distance: 45,
                picture: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop',
            },
            {
                distance: 68,
                picture: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=200&fit=crop',
            },
        ],
    },
    {
        name: 'Diagonale des Fous',
        timestamp: 'mai 22 - 28',
        chapters: [
            {
                distance: 15,
                picture: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop',
            },
            {
                distance: 40,
                picture: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop',
            },
            {
                distance: 85,
                picture: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
            },
        ],
    },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUser = async (): Promise<User> => {
    await delay(200)
    return mockUser
}

export const fetchTales = async (): Promise<Tale[]> => {
    await delay(300)
    return mockTales
}
