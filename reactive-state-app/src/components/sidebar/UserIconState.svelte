<script lang="ts">
    import { Tooltip } from '@svelteuidev/core';
	import type { UserModel } from "../../models/user";

    export let userModel: UserModel
    let sideNoteVisible = false
</script>

<div class="user">
    <div class="user-icon">
        <img src={userModel.icon} alt="">
    </div>
    <Tooltip
        color="indigo"
        wrapLines
        withArrow
        label={sideNoteVisible ? userModel.sideNote : userModel.states[userModel.stateId].description}
    >
        <div class="user-state" on:mousedown={() => sideNoteVisible = true} on:mouseup={() => sideNoteVisible = false}>
            {userModel.states[userModel.stateId].state}
        </div>
    </Tooltip>
</div>

<style lang="scss">
    .user {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 14px 0;
        &-icon {
            img {
                width: 35px;
                border-radius: 50%;
            }
        }
        &-state {
            font-size: 40px;
        }
    }
</style>