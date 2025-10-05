<script setup lang='ts'>
import { PaintBrush24Regular as CustomizeIcon } from '@vicons/fluent'
const { t } = useI18n()
const showCustomizeDialog = ref(false)

function toggleDialog() {
  showCustomizeDialog.value = !showCustomizeDialog.value
}
</script>

<template>
  <div v-bind="$attrs">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-popover trigger="click" :show-arrow="false" style="width: 390px;max-height: 550px;">
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
      </template>
      <span>{{ t('button.toggle_customize') }}</span>
    </n-tooltip>
  </div>
</template>