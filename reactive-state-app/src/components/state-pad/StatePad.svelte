<script lang="ts">
    import FaEllipsisV from 'svelte-icons/fa/FaEllipsisV.svelte'
    import type { StateItem, UserState } from "../../models/user";
    import { Badge, Button, Modal, TextInput } from '@svelteuidev/core';
    import { updateCurrentState, updateState } from '../../service/firebase';
    import { currentUserModelStore } from '../../store/userStateStore';
    import { onMount } from 'svelte';
    import GraphemeSplitter from 'grapheme-splitter';

    export let userState: {id: number, state: StateItem} | null = null
    let opened: boolean
    let isEdit: boolean = true

    let inputIcon = {
        value: '',
        previousValue: '',
        invalid: false,
        errorMessage: ''
    }

    let inputDescription = {
        value: '',
        previousValue: '',
        invalid: false,
        errorMessage: ''
    }

    onMount(() => {
        if (userState) {
            inputIcon.value = userState.state.state
            inputIcon.previousValue = userState.state.state
            inputDescription.value = userState.state.description
            inputDescription.previousValue = userState.state.description
        }
    })

    const getDisplayCharacterLength = (character: string): number => {
        const splitter = new GraphemeSplitter();
        return splitter.countGraphemes(character);
    }

    const invalidInputIconValue = (): boolean => {
        console.log(getDisplayCharacterLength(inputIcon.value))
        if (!inputIcon.value) return true
        if (getDisplayCharacterLength(inputIcon.value) > 1) return true
        return false
    }

    const openEditModal = (event: Event) => {
        isEdit = true
        opened = true
        event.stopPropagation()
    }

    const closeEditModal = (event: Event) => {
        opened = false
        inputIcon.value = inputIcon.previousValue
        inputDescription.value = inputDescription.previousValue
        event.stopPropagation()
    }

    const openCreateModal = (event: Event) => {
        isEdit = false
        opened = true
        event.stopPropagation()
    }

    const mergeStates = (stateId: number | undefined, state: StateItem): UserState | null => {
        if (stateId == null) return null
        return {
            ...$currentUserModelStore.states,
            [stateId]: state
        }
    }

    const calcStateId = (states: UserState, nextId?: number): number => {
        const ids = Object.keys(states)
        const newId = nextId ? nextId++ : ids.length++
        const isExist = ids.find((id) => parseInt(id) === newId)
        if (isExist) {
            return calcStateId(states, newId)
        }
        return newId
    }

    const modalAction = (stateId: string, states: UserState | null) => {
        updateState(stateId, states)
        opened = false
    }
</script>

{#if userState}
    <button class="pad" on:click={() => updateCurrentState($currentUserModelStore.id, userState?.id)}>
        <div class="pad-description">
            <Badge className="pad-badge" size="lg" variant="outline" fullWidth>
                {userState.state.description}
            </Badge>
        </div>
        <div class="pad-icon">
            {userState.state.state}
        </div>
        <div class="pad-setting" on:click={openEditModal}>
            <FaEllipsisV />
        </div>
    </button>
{:else}
    <button class="pad" on:click={openCreateModal}>
        <div class="pad-icon">
            ➕
        </div>
    </button>
{/if}

<Modal
    {opened}
    on:close={closeEditModal}
    centered
    title={isEdit ? "Edit state" : "Create state"}
    overlayOpacity={0.55}
    overlayBlur={3}
>
    {#if isEdit}
        <div class="modal-description">
            <TextInput
                label="Description"
                placeholder="at work"
                invalid={inputDescription.invalid}
                bind:value={inputDescription.value}
            />
        </div>
        <div class="modal-icon">
            <TextInput
                label="Icon"
                placeholder="🔧"
                invalid={inputIcon.invalid}
                bind:value={inputIcon.value}
            />
        </div>
        <div class="modal-button">
            <Button
                color="indigo"
                on:click={() =>
                    modalAction(
                        $currentUserModelStore.id,
                        mergeStates(userState?.id, {state: inputIcon.value, description: inputDescription.value})
                    )
                }
            >
                Update
            </Button>
        </div>
    {:else}
        <div class="modal-description">
            <TextInput label="Description" placeholder="at work" bind:value={inputDescription.value} />
        </div>
        <div class="modal-icon">
            <TextInput label="Icon" placeholder="Please enter one letter for the icon" bind:value={inputIcon.value} />
        </div>
        <div class="modal-button">
            <Button
                color="indigo"
                on:click={() =>
                    modalAction(
                        $currentUserModelStore.id,
                        mergeStates(calcStateId($currentUserModelStore.states), {state: inputIcon.value, description: inputDescription.value})
                    )
                }
            >
                Create
            </Button>
        </div>
    {/if}
</Modal>

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