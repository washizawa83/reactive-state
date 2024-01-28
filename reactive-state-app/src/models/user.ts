export type UserModel = {
    id: string,
    name: string,
    icon: string
    sideNote: string
    stateId: number
    states: UserState
}

export type UserState = {
   [key: number]: StateItem
}

export type StateItem = {
    state: string,
    description: string
}