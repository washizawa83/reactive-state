<script lang="ts">
	import type { UserState } from "../../models/user";
  import TopPageStatePad from "./TopPageStatePad.svelte";
    
    export let userStates: UserState
</script>

<div class="state-pad-list">
    {#each Object.entries(userStates) as state}
        <TopPageStatePad
            userState={{id: parseInt(state[0]), state: state[1]}}
        />
    {/each}
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