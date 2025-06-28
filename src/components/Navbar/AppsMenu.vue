<script setup lang='ts'>
import {
  AppFolder20Regular as AppsIcon,
  ChatMultiple20Regular as ChatAppIcon,
  MoreCircle20Filled as MoreIcon,
  CheckmarkCircle24Regular as TodoAppIcon,
} from '@vicons/fluent'
const showDialog = ref(false)
const { t } = useI18n()

function toggleDialog() {
  showDialog.value = !showDialog.value
}
</script>

<template>
    <div v-bind="$attrs">
        <n-popover trigger="hover" :show-arrow="false" style="width: 270px;max-height: 200px;">
            <template #trigger>
                <div v-bind="$attrs">
                    <n-button quaternary circle @click="toggleDialog()">
                        <template #icon>
                            <NIcon size="1.4rem">
                                <AppsIcon />
                            </NIcon>
                        </template>
                    </n-button>
                </div>
            </template>
            <div class="p-1 flex flex-row flex-wrap">
                <router-link to="/apps/chat">
                    <NButton class="app-link" ghost flex flex-col items-center align-center>
                        <template #icon>
                            <NIcon size="1.8rem" ms-1>
                                <ChatAppIcon />
                            </NIcon>
                        </template>
                        <span>{{ t('menu.chat') }}</span>
                    </NButton>
                </router-link>

                <router-link to="/apps/todo">
                    <NButton class="app-link" ghost flex flex-col items-center align-center>
                        <template #icon>
                            <NIcon size="1.8rem" ms-1>
                                <TodoAppIcon />
                            </NIcon>
                        </template>
                        <span>{{ t('menu.todo') }}</span>
                    </NButton>
                </router-link>

                <a href="https://github.com/doroudi/yummyadmin" target="_blank">
                    <NButton ghost class="app-link" flex flex-col items-center align-center>
                        <template #icon>
                            <NIcon size="1.8rem" ms-1>
                                <MoreIcon />
                            </NIcon>
                        </template>
                        <span>...</span>
                    </NButton>
                </a>

            </div>
        </n-popover>
    </div>
</template>

<style scoped lang="scss">
.app-link {
    padding: 0.5rem 1rem;
    text-decoration: none;
    margin: 0.2rem .4rem;
    height: 65px;
    text-align: center;

    span {
        display: block;
        margin-top: 0.4rem;
        font-size: 0.8rem;
    }
}
</style>