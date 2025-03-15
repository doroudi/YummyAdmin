<script setup lang='ts'>
import {
  Settings48Regular as CustomizeIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'

const showCustomizeDialog = ref(false)
const { t } = useI18n()
const layout = useLayoutStore()
const { dialogPlacement } = storeToRefs(layout)

function toggleDialog() {
  showCustomizeDialog.value = !showCustomizeDialog.value
}
</script>

<template>
  <div v-bind="$attrs">
    <n-button quaternary circle @click="toggleDialog()">
      <template #icon>
        <NIcon size="1.4rem">
          <CustomizeIcon class="rotate-animated" />
        </NIcon>
      </template>
    </n-button>
  </div>

  <n-drawer v-model:show="showCustomizeDialog" :width="380" :placement="dialogPlacement">
    <n-drawer-content closable :title="t('customize.title')">
      <CustomizeDialog @close="showCustomizeDialog = false" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang='scss'></style>
