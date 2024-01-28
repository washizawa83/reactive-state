import { writable } from "svelte/store";

type UserModel = {
    id: string,
    name: string,
    icon: string
    sideNote: string,
    stateId: number
    states: UserState
}

type UserState = {
   [key: number]: StateItem
}

type StateItem = {
    state: string,
    description: string
}

export const userModelsStore = writable<UserModel[]>()
export const currentUserModelStore = writable<UserModel>()