<script lang="ts">
    import type { StateItem } from "../../models/user";
    import { Badge } from '@svelteuidev/core';
    import { topPageStateId } from "../../store/appStore";
    import { signInWithRedirect } from "firebase/auth";
    import { auth, provider } from "../../service/firebase";
    import { FirebaseError } from "firebase/app";

    export let userState: {id: number, state: StateItem}

    async function signInWithGoogle() {
        try {
            signInWithRedirect(auth, provider);
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error);
            }
        }
    }

    const selectPad = () => {
        $topPageStateId = userState.id
        if (userState.id === 9) {
            signInWithGoogle()
        }
    }
</script>

<button class="pad" on:click={selectPad}>
    <div class="pad-description">
        <Badge className="pad-badge" size="lg" variant="outline" fullWidth>
            {userState.state.description}
        </Badge>
    </div>
    <div class="pad-icon">
        {userState.state.state}
    </div>
</button>

<style lang="scss">
    .pad {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 33.333%;
        position: relative;
        background-color: white;
        border: 2px solid rgb(78, 132, 213);
        box-sizing: border-box;
        cursor: pointer;
        .pad-description {
            position: absolute;
            top: 20px;
            width: 80%;
        }
        &-icon {
            font-size: 50px;
        }
        &-setting {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 6px;
            color: #555;
        }
    }
    .modal-button {
            display: flex;
            justify-content: center;
            padding: 20px 0;
        }
</style>