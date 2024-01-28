<script lang="ts">
    import { Textarea, Loader } from '@svelteuidev/core';
    import { Text } from '@svelteuidev/core';
    import { Progress } from '@svelteuidev/core';
    import { Notification } from '@svelteuidev/core';
    import { updateSideNote } from '../../service/firebase';
    import { currentUserModelStore } from '../../store/userStateStore';
  import { onMount } from 'svelte';

    let sideNote: string
    let isUpdating = false
    let isCompleted = false

    onMount(() => {
        sideNote = $currentUserModelStore.sideNote
    })

    const updateSideNoteAction = () => {
        isUpdating = true
        updateSideNote($currentUserModelStore.id, sideNote)
        setTimeout(() => {
            isUpdating = false
            isCompleted
        }, 500);
    }
</script>

<div class="side-note">
    <label for="side-note-id" class="text-wrap">
        <Text
            class="state-form-text"
            align='center'
            variant='gradient'
            size='lg'
            weight='bold'
        >
            Side note
        </Text>
    </label>
    {#if isUpdating}
        <Textarea
            id="side-note-id"
            placeholder="By the way, ..."
            required={false}
            bind:value={sideNote}
            on:blur={() => updateSideNoteAction()}
        >
            <svelte:fragment slot='rightSection'>
                <Loader color='blue' size='xs' />
            </svelte:fragment>
        </Textarea>
    {:else}
        <Textarea
            id="side-note-id"
            placeholder="By the way, ..."
            required={false}
            bind:value={sideNote}
            on:blur={() => updateSideNoteAction()}
        />
    {/if}
</div>

<div class="progress">
    <div class="text-wrap">
        <Text
            align='center'
            variant='gradient'
            size='lg'
            weight='bold'
        >
            Progress
        </Text>
    </div>
    <Progress
        mt='md'
        size="xl"
        radius="xl"
        sections={[
            { value: 30, color: 'pink', label: 'Job' },
            { value: 30, color: 'grape', label: 'Eat' },
            { value: 25, color: 'violet', label: 'Other' },
        ]}
    />
</div>

<style lang="scss">
    .text-wrap {
        display: block;
        margin-bottom: 8px;
    }
    .side-note {
        padding: 12px;
    }
    .progress {
        padding: 12px;
    }
</style>
