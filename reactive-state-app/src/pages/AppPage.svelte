<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { SvelteUIProvider, Notification } from '@svelteuidev/core';
    import { Check, Cross2 } from 'radix-icons-svelte';
    import Sidebar from "../components/sidebar/Sidebar.svelte";
	import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
    import { auth, createUser, fireStore } from "../service/firebase";
    import { userModelsStore, currentUserModelStore } from "../store/userStateStore";
    import type { UserModel } from "../models/user";
    import DashBoard from "./DashBoard.svelte";
    import { notificationStore } from "../store/appStore";
    import { onAuthStateChanged } from "firebase/auth";

    let notificationVisible = false
    let loginUser: any

    onMount(() => {
        onAuthStateChanged(auth, user => {
            loginUser = user
            if (!loginUser) {
                navigate("/", { replace: true });
            }
        });

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
                const user = users.find((user) => user.id === loginUser.uid)
                if (user) {
                    $currentUserModelStore = user
                    userModelsStore.set(users)
                } else {
                    createUser(
                        loginUser.uid,
                        {
                            icon: loginUser.photoURL,
                            name: loginUser.displayName,
                            side_note: '',
                            state_id: 0,
                            states: {
                                0: {
                                    state: '😁',
                                    description: 'welcome!'
                                }
                            }
                        }
                    )
                }
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
        height: 100%;
        display: flex;
        position: relative;
        & .sidebar {
            width: 8%;
            max-height: 100%;
            min-height: 100vh;
        }
        & .main-content {
            width: 92%;
            padding: 30px;
        }
        & .notification {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
    }
</style>