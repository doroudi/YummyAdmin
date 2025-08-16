<script setup lang="ts">
const { t } = useI18n()
import confetti from 'canvas-confetti'
const canvasEl = ref()
onMounted(() => {
  setTimeout(() => {
    showConfetti()
  }, 1000)
})

function showConfetti() {
  const myConfetti = confetti.create(canvasEl.value, {
    resize: true,
    useWorker: true,
  })
  myConfetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(75, 150),
    // origin: { y: 0.8, x:.8 },
  })
}
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function showConfettiAction() {
  showConfetti()
  window.umami?.track('Confetti')
}

const total = randomInRange(2000, 4000)
</script>

<template>
  <div class="h-auto flex flex-col justify-end relative">
    <canvas class="confetti-container" ref="canvasEl" />
    <div class="p-2">
      <Card>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row md:pt-4">
            <span class="text-12 me-2">👋 </span>
            <div>
              <h3 class="text-lg font-bold">
                {{ t('dashboard.welcome.title') }}
              </h3>

              <p class="description">
                {{ t('dashboard.welcome.greeting_message') }}
              </p>
              <p class="description pt-7">
                {{ t('dashboard.welcome.congratulations1') }}
                <b class="inline-block min-w-12 px-1 text-size-lg"><n-number-animation show-separator :from="0" :to="total" /></b>
                {{ t('dashboard.welcome.congratulations2') }}
              </p>
            </div>
          </div>
          <img src="@/assets/images/3d-female-character-waving.png" width="140px" @click="showConfettiAction"
            class="hidden md:block -mt-24 -mb-4 me-6 cursor-pointer">
        </div>
      </card>
    </div>
  </div>
</template>

<style scoped>
.confetti-container
{
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  z-index: 10;
  height: 250px;
  width: 100%;
}

.description{
  font-size: .99rem;
}
</style>
