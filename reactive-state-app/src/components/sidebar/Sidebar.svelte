<script lang="ts">
    import UserIconState from "./UserIconState.svelte";
	import type { UserModel } from "../../models/user";

	export let userModels: UserModel[]
</script>

<ul class="user-list">
    {#each userModels as userModel}
        <UserIconState userModel={userModel} />
    {/each}
</ul>

<style lang="scss">
    .user-list {
        width: 100%;
        height: 100%;
        padding: 30px 0;
        background-color: rgb(35, 35, 35);
        box-sizing: border-box;
    }
</style>