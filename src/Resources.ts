
export type BesitzerResource = {
    name: string
    password: string
    email: string
}

type Address = {
    street: string,
    number: number,
    city: string,
    postal:number,
};


export type RestaurantResource = {
    name: string
    address: Address
    openHours?: string
    besitzer: string
}

export type UserResource = {
    name: string
    email: string
    password: string
    address?: Address
    id?: string
}

export type ReservationResource = {
    date: string
    time: number
    guest: number
    createdAt?: string
    comment?: string
    user: string
    restaurant: string
}



export type LoginResource = {
    id: string
    role: "b"|"u"
    /** Expiration time in seconds since 1.1.1970 */
    exp: number
}