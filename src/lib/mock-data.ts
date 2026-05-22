export interface User {
    username: string
    fullName: string
    avatar: string
    talePublished: number
    location: string
    lastTale: string
}

const mockUser: User = {
    username: 'gmaurin',
    fullName: 'Guillaume Maurin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    talePublished: 32,
    location: 'Ile de France, Paris',
    lastTale: 'Lundi 00',
}

export const fetchUser = async (): Promise<User> => {
    return mockUser
}
