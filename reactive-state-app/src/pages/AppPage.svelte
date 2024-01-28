<script lang="ts">
    import { onMount } from "svelte";
    import { SvelteUIProvider, Notification } from '@svelteuidev/core';
    import { Check, Cross2 } from 'radix-icons-svelte';
    import Sidebar from "../components/sidebar/Sidebar.svelte";
	import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
    import { fireStore } from "../service/firebase";
    import { userModelsStore, currentUserModelStore } from "../store/userStateStore";
    import type { UserModel } from "../models/user";
    import DashBoard from "./DashBoard.svelte";
    import { notificationStore } from "../store/appStore";

    let notificationVisible = false

    onMount(() => {
        onSnapshot(
            query(collection(fireStore, "users")),
            (snapshot: QuerySnapshot): void => {
                const users: UserModel[] = snapshot.docs.map((doc: any) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        name: data.name,
                        icon:  data.icon,
                        stateId: data.state_id,
                        sideNote: data.side_note,
                        states: data.states
                    }
                })
                $currentUserModelStore = users.find((user) => user.id === 'whEEB3nwGw4Ms4SANCDi')!
                userModelsStore.set(users)
            }
        )
    })
    notificationStore.subscribe((notification) => {
        notificationVisible = true
        setTimeout(() => {
            notificationVisible = false
        }, 3000)
    })
</script>
<SvelteUIProvider>
    {#if $userModelsStore}
        <main>
            <section class="sidebar">
                <Sidebar userModels={$userModelsStore} />
            </section>
            <section class="main-content">
                <DashBoard currentUserModel={$currentUserModelStore} />
            </section>
            {#if notificationVisible && $notificationStore}
                <div class="notification">
                    <Notification icon={Check} color='teal'>
                        {$notificationStore.message}
                    </Notification>
                </div>
            {/if}
        </main>
    {/if}
</SvelteUIProvider>

<style lang="ts">
    main {
        width: 100vw;
        display: flex;
        position: relative;
        & .sidebar {
            width: 8%;
            height: 100vh;
        }
        & .main-content {
            width: 92%;
            padding: 30px;
        }
        & .notification {
            position: absolute;
            bottom: 0;
        }
    }
</style>