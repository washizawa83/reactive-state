<script lang="ts">
	import type { UserState } from "../../models/user";
    import StatePad from '../state-pad/StatePad.svelte'
    import { currentUserModelStore } from "../../store/userStateStore";
    
    export let userStates: UserState | undefined = undefined
</script>

<div class="state-pad-list">
    {#if !userStates}
        {#each Object.entries($currentUserModelStore.states) as state}
            <StatePad
                userState={{id: parseInt(state[0]), state: state[1]}}
             />
        {/each}
        <StatePad />
    {:else}
        {#each Object.entries(userStates) as state}
            <StatePad
                userState={{id: parseInt(state[0]), state: state[1]}}
            />
        {/each}
    {/if}
</div>

<style lang="scss">
    .state-pad-list {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 100%;
        aspect-ratio: 4 / 3;
        background-color: rgb(105, 105, 105);
    }
</style>