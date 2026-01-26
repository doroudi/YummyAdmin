<script setup lang="ts">
import { NButton } from 'naive-ui'

const options = [
  {
    key: 'items',
    type: 'render',
    render: renderEmojiPicker,
  },
]

const model = defineModel({
  type: String,
  default: '📁',
})

const items = [
  '📅',
  '💡',
  '📈',
  '💳',
  '🛒',
  '🏃‍♀️',
  '👀',
  '⏰',
  '📝',
  '📖',
  '📗',
  '🔖',
  '🧑‍🍳',
  '💪',
  '✅',
  '❌',
  '🛫',
  '⚽',
  '🍿',
  '🎞️',
  '🎨',
  '🎵',
]
function renderEmojiPicker() {
  return h(
    'div',
    { class: 'emoji-picker p-3' },
    items.map((emoji) => {
      return h(
        NButton,
        {
          quaternary: true,
          circle: true,
          class: 'emoji-item m-1',
          size: 'large',
          onClick: () => handleSelect(emoji),
        },
        { default: () => emoji },
      )
    }),
  )
}

function handleSelect(emoji: string) {
  model.value = emoji
}
</script>

<template>
  <div>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect" style="max-width: 280px;">
      <n-button ghost>
        <span v-if="model">{{ model }}</span>
        <span v-else>📁</span>
      </n-button>
    </n-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>