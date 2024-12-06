<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import {
  Alert28Regular as BellIcon,
} from '@vicons/fluent'
import { NIcon } from 'naive-ui'

const { t } = useI18n()

const items: SelectMixedOption[]
  = [
    {
      label: renderLabel(t('notifications.empty')),
    },
  ]

function renderLabel(title: string) {
  return () => h('span', {}, { default: () => title })
}
</script>

<template>
  <div v-bind="$attrs">
    <n-dropdown :options="items">
      <n-button quaternary circle>
        <template #icon>
          <n-badge dot type="success" :offset="[-5, 5]" processing>
            <NIcon class="shake-item" size="1.4rem">
              <BellIcon />
            </NIcon>
          </n-badge>
        </template>
      </n-button>
    </n-dropdown>
  </div>
</template>
