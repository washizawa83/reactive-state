import { writable } from "svelte/store";

export type ShowNotification = {
    message: string,
    type: NotificationType
}

export type NotificationType = 'success' | 'error'

export const notificationStore = writable<ShowNotification>()

export const topPageStateId = writable<number>(1)