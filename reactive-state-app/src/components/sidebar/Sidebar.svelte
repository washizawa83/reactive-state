<script lang="ts">
    import { Button, Modal } from '@svelteuidev/core';
    import IoMdSettings from 'svelte-icons/io/IoMdSettings.svelte'
    import { signOut } from 'firebase/auth';
    import { auth } from '../../service/firebase';
    import UserIconState from "./UserIconState.svelte";
	import type { UserModel } from "../../models/user";
    import { currentUserModelStore } from "../../store/userStateStore";

	export let userModels: UserModel[]
    let opened = false
</script>

<ul class="user-list">
    <div>
        <UserIconState userModel={$currentUserModelStore} />
        {#each userModels as userModel}
            {#if userModel.id !== $currentUserModelStore.id}
                <UserIconState userModel={userModel} />
            {/if}
        {/each}
    </div>
    <Button color="indigo"   variant="subtle" compact on:click={() => opened = true}>
        <IoMdSettings />
        Settings
    </Button>
</ul>

<Modal
    {opened}
    on:close={() => opened = false}
    centered
    title='user settings'
    overlayOpacity={0.55}
    overlayBlur={3}
>
    <Button variant="filled" on:click={() => signOut(auth)}>
        Logout
    </Button>
</Modal>


<style lang="scss">
    .user-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 30px 0;
        background-color: rgb(35, 35, 35);
        box-sizing: border-box;
    }
</style>