<script lang="ts">
    import type { UserState } from "../models/user";
    import { topPageStateId } from "../store/appStore";
    import TopPageStatePadList from "../components/state-pad/TopPageStatePadList.svelte";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "../service/firebase";

    const topStates: UserState = {
        1: {
            state: '😎',
            description: 'cool boy'
        },
        2: {
            state: '🙏',
            description: 'prayer'
        },
        3: {
            state: '👀',
            description: 'confirmation'
        },
        4: {
            state: '🎹',
            description: 'musical performance'
        },
        5: {
            state: '🚗',
            description: 'on the move'
        },
        6: {
            state: '🛁',
            description: 'bath time'
        },
        7: {
            state: '🔭',
            description: 'astronomical observation'
        },
        8: {
            state: '🛸',
            description: 'Encountering the Unknown'
        },
        9: {
            state: '🔑',
            description: 'login'
        },
    }

    onMount(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                navigate("/app", { replace: true });
            }
        });
    })
</script>

<div class="top">
    <h1 class="top-title">
        Tell me about your <span class="top-title-accent">now</span>
    </h1>
    <section class="state">
        <div class="your-state">
            <h2 class="your-state-icon">{topStates[$topPageStateId].state}</h2>
        </div>
        <div class="state-pad">
            <TopPageStatePadList userStates={topStates} />
        </div>
    </section>
</div>

<style lang="scss">
    .top {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-image: url("/images/top.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        &-title {
            display: inline-block;
            padding: 50px 0 30px 50px;
            font-size: 80px;
            font-family: system-ui;
            color: palegoldenrod;
            &-accent {
                color: magenta;
            }
        }
        & .state {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: calc(100vh - 200px);
            & .your-state {
                display: flex;
                justify-content: center;
                width: 30%;
                align-items: center;
                &-icon {
                    font-size: 200px;
                }
            }
        }
    }
</style>