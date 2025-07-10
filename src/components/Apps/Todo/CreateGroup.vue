<script setup lang="ts">
interface Props {
  show: boolean
}

import { Checkmark48Filled as CheckIcon } from '@vicons/fluent'
import type { TaskGroup } from '~/models/Todo'

const props = defineProps<Props>()
const emits = defineEmits(['close'])
const showModal = computed(() => props.show)
const { t } = useI18n()
const colors = useColors().primaryColors
const selectedColorIndex = ref(-1)

const groupItem = ref<TaskGroup>({})
function setColor(index: number) {
  selectedColorIndex.value = index
}

const store = useTodoAppStore()

function createGroup() {
  if (groupItem.value.title.length === 0) return //TODO: add form validation

  const color =
    selectedColorIndex.value >= 0 ? colors[selectedColorIndex.value] : null
  groupItem.value.bgColor = color
  groupItem.value.icon = '📁'
  store.createGroup(groupItem.value)
  emits('close')
  window.umami?.track('Todo:CreateGroup', { title: groupItem.value.title })
  groupItem.value = {}
  selectedColorIndex.value = -1
}
</script>


<template>
    <div>
        <n-modal v-model:show="showModal" @close="emits('close')" preset="card" style="width: 500px" :title="t('todoApp.createGroup.title')">
            <n-input v-model:value="groupItem.title" :placeholder="t('todoApp.createGroup.groupTitle')" />

            <div py-4>
                <div>
                    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
                        {{ t('todoApp.createGroup.theme') }}
                    </NTag>
                </div>
                <div>
                    <NButton key="-1" color="#EEE" size="medium" circle icon="CheckIcon" class="mx-1"
                        @click="setColor(-1)">
                        <template #icon>
                            <CheckIcon color="#333" v-if="selectedColorIndex === -1" />
                            <span v-else />
                        </template>
                    </NButton>
                    <NButton v-for="(color, index) of colors" :key="index" :color="color" size="medium" circle
                        icon="CheckIcon" class="mx-1" @click="setColor(index)">
                        <template #icon>
                            <CheckIcon v-if="selectedColorIndex === index" />
                            <span v-else />
                        </template>
                    </NButton>
                </div>
            </div>

            <div pt-4>
                <n-button attr-type="submit" size="large" type="primary" @click="createGroup">
                    {{ t('common.create') }}
                </n-button>
            </div>
        </n-modal>
    </div>
</template>

<style scoped></style>