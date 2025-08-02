<script setup lang="ts">
import type { MessageItem } from '~/models/Chat'

export interface Props {
  message: MessageItem
  selfMessage?: boolean
  last: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="chat-message flex flex-col gap-2 p-3 bg-gray-100 dark:bg-gray-700"
    :class="{ 'self-message': selfMessage, 'last': last }">
    <span v-html="message.content"></span>
    <div class="time text-xs text-gray-500 text-end -mb-2 dark:text-gray-400">
      {{ new Date(message.created).toLocaleTimeString() }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.dark {
  .chat-message {
    --current-color: #374151;
    --self-background: #424e64;
  }
}

.chat-message {
  --current-color: #f3f4f6;
  --self-background: #e0f7fa;

  span a {
    color: rgb(0, 183, 255) !important;
    text-decoration: underline;
  }
  border-radius: 1rem;
  position: relative;

  &.last {
    border-bottom-left-radius: 0;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: -9px;
      width: 20px;
      height: 20px;
      display: block;
      background-color: var(--current-color);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 1px;
      left: -29px;
      width: 29px;
      height: 28px;
      display: block;
      border-radius: 50%;
      background-color: var(--second-background);
    }
  }
}

.self-message {
  background-color: var(--self-background);
  align-self: flex-end;

  &.last {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0.7rem;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: -9px;
      left: auto;
      width: 20px;
      height: 20px;
      display: block;
      background-color: var(--self-background);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 1px;
      right: -29px;
      left: auto;
      width: 29px;
      height: 28px;
      display: block;
      border-radius: 50%;
      background-color: var(--second-background);
    }
  }
}

.rtl {
  .chat-message {
    &.last {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: .7rem;
      &::before {
        right: -9px;
        left: auto;
      }

      &::after {
        right: -29px;
        left: auto;
      }
    }
  }

  .self-message {
    &.last {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0.7rem;

      &::before {
        left: -9px;
        right: auto;
      }

      &::after {
        left: -29px;
        right: auto;
      }
    }
  }
}
</style>
