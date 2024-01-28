<script lang="ts">
    import StatePadList from "../components/state-pad/StatePadList.svelte";
    import type { UserState } from "../models/user";

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
        10: {
            state: '🛎',
            description: 'signin'
        }
    }
</script>

<div class="top">
    <h1 class="top-title">
        Tell me about your <span class="top-title-accent">now</span>
    </h1>
    <section class="state">
        <div class="your-state">
            <h2 class="your-state-icon">😃</h2>
        </div>
        <div class="state-pad">
            <StatePadList userStates={topStates} />
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