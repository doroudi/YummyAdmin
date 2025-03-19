<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="github-button">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <a data-umami-event="Githu Button" href="https://github.com/doroudi/yummyadmin" block target="_blank">
          <n-button strong round type="primary" class="pulse-animated" flex space-between py-5 px-3>
            <NIcon size="1.6rem">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path
                  d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z"
                  fill-rule="evenodd" fill="currentColor"
                />
              </svg>
            </NIcon>

            <span>{{ t('Github.button') }}</span>
          </n-button>
        </a>
      </template>
      <span>{{ t('Github.tooltip') }}</span>
    </n-tooltip>
  </div>
</template>

<style lang="scss">
.github-button {
    position: absolute;
    right: 40px;
    bottom: 30px;
    z-index: 100;

    .n-icon {
      margin-left: auto;
      margin-right: 0.5rem;
    }
}

.rtl .github-button {
    right: auto;
    left: 40px;

    .n-icon {
        margin-left: 0.5rem;
        margin-right: 0;
    }
}

.pulse-animated {
    -webkit-animation: pulse 4s infinite;
    -moz-animation: pulse 4s infinite;
    animation: pulse 4s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgb(from var(--primary-color) r g b / .5);
    }

    70% {
        box-shadow: 0 0 0 14px rgb(from var(--primary-color) r g b / 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgb(from var(--primary-color) r g b / 0);
    }
}
</style>
