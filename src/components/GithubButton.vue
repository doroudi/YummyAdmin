<script setup>

</script>

<template>
  <div class="float-button">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <a href="https://github.com/doroudi/yummyadmin" block target="_blank">
          <n-button strong round color="#36ad6a" class="pulse-animated" flex space-between py-5 px-3>
            <NIcon size="1.6rem" class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path
                  d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z"
                  fill-rule="evenodd" fill="currentColor"
                />
              </svg>
            </NIcon>

            <span>GitHub</span>
          </n-button>
        </a>
      </template>
      <span> Support Project with giving star in Github </span>
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.float-button {
    position: absolute;
    right: 40px;
    bottom: 30px;
    z-index: 100;
}

.pulse-animated {
    -webkit-animation: pulse 4s infinite;
    -moz-animation: pulse 4s infinite;
    animation: pulse 4s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(#36ad6a, 0.5);
    }

    70% {
        box-shadow: 0 0 0 14px rgba(#36ad6a, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(#36ad6a, 0);
    }
}
</style>
