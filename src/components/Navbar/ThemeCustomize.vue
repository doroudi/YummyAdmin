<script setup lang='ts'>
import { PaintBrush24Regular as CustomizeIcon } from '@vicons/fluent'

const showCustomizeDialog = ref(false)

function toggleDialog() {
  showCustomizeDialog.value = !showCustomizeDialog.value
}
</script>

<template>
  <div v-bind="$attrs">
    <n-popover trigger="click" :show-arrow="false" style="width: 370px;max-height: 550px;">
      <template #trigger>
        <div v-bind="$attrs">
          <n-button quaternary circle @click="toggleDialog()">
            <template #icon>
              <NIcon size="1.4rem">
                <CustomizeIcon />
              </NIcon>
            </template>
          </n-button>
        </div>
      </template>
      <div class="px-1">
        <customize-dialog />
      </div>
    </n-popover>
  </div>
</template>