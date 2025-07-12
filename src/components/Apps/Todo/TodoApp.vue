<script setup lang="ts">
import { Add20Regular as AddIcon } from '@vicons/fluent'
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { TaskGroup } from '~/models/Todo'

const { t } = useI18n()
const collapsed = ref(false)
const store = useTodoAppStore()
const { groups, tasks } = storeToRefs(store)
const filteredGroups = ref([])
const searchKeyword = ref('')
onMounted(async () => {
  await store.loadGroups()
  selectedGroup.value = groups.value[0]
})

const selectedGroup = ref<TaskGroup>()

function selectGroup(group: TaskGroup) {
  selectedGroup.value = group
}

function searchInList(keyword: string) {
  searchKeyword.value = keyword
  if (!keyword.trim()) {
    filteredGroups.value = []
  }

  filteredGroups.value = groups.value.filter(
    (x: TaskGroup) => x.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0,
  )
}
const showCreateModal = ref(false)
function createGroup() {
  showCreateModal.value = true
}
</script>

<template>
    <NLayout has-sider sider-placement="left" class="todo-layout">
        <NLayoutSider bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
            @collapse="collapsed = true" @expand="collapsed = false">
            <div class="p-3">
                <NInput @input="searchInList" round :placeholder="t('common.search')" clearable />
            </div>
            <div class="todo-sidebar">
                <NScrollbar>
                    <TodoGroupsList :groups="searchKeyword.length ? filteredGroups : groups" @select="selectGroup" />
                </NScrollbar>
            </div>
            <div class="p-2">
                <NButton quaternary justify-start block @click="createGroup" size="large" class="-mt-2" type="primary">
                    <template #icon>
                        <NIcon>
                            <AddIcon />
                        </NIcon>
                    </template>
                    {{ t('todoApp.createGroup.title') }}
                </NButton>
            </div>
            <CreateGroup :show="showCreateModal" @close="showCreateModal = false" />
        </NLayoutSider>
        <NLayoutContent>
            <TasksList v-if="selectedGroup" :group="selectedGroup" />
        </NLayoutContent>
    </NLayout>
</template>

<style lang="scss" scoped>
.todo-layout {
    user-select: none;
}

.n-layout {
    padding: 0;
}

.todo-layout {
    height: calc(100vh - 30px);
}

.todo-sidebar {
    height: calc(100vh - 185px);
}
</style>
