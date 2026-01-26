<script setup lang="ts">
import {
    Delete20Regular as DeleteIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const emits = defineEmits(['delete'])
const negativeButtonProps  = { ghost: true, type: 'tertiary' }
</script>


<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <n-popconfirm :negative-button-props="negativeButtonProps" @positive-click="emits('delete')" :positive-text="t('common.confirm')"
                :negative-text="t('common.cancel')">
                <template #trigger>
                    <NButton mx-2 quaternary circle>
                        <template #icon>
                            <NIcon>
                                <DeleteIcon />
                            </NIcon>
                        </template>
                    </NButton>
                </template>
                {{ t('common.deleteMultipleConfirm') }}
            </n-popconfirm>
        </template>
        <span>{{ t('common.delete') }}</span>
    </n-tooltip>
</template>


<style scoped></style>