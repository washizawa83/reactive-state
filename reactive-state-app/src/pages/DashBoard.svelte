<script lang="ts">
    import StatePadList from "../components/state-pad/StatePadList.svelte";
    import StateSummary from "../components/state-summary/StateSummary.svelte";
    import type { UserModel } from "../models/user";
    import { currentUserModelStore } from "../store/userStateStore";

    export let currentUserModel: UserModel
</script>

<section class="dashboard">
    <section class="state-pad">
        {#if $currentUserModelStore}
            <StatePadList userStates={currentUserModel.states} />
        {/if}
    </section>
    <section class="state-form">
        <StateSummary />
    </section>
</section>

<style lang="scss">
    .dashboard {
        display: flex;
        justify-content: space-around;
        width: 100%;
        & .state-pad {
            width: 70%;
        }
        & .state-form {
            width: 30%;
            padding-left: 20px;
        }
    }
</style>