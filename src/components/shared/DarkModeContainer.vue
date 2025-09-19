<script setup lang="ts">
const layout = useLayoutStore()

onMounted(() => {
  setTimeout(() => {
    getToggleElementPosition()
  }, 100)
})

const toggleButtonPosition = ref<DOMRect>({ left: 0, top: 0 })
const transitionDone = ref(true)
watch(
  () => layout.isDark,
  (newValue: boolean) => {
    if (newValue) {
      transitionDone.value = false
      setTimeout(() => {
        document.documentElement.classList.add('dark')
        transitionDone.value = true
      }, 800)
    } else {
      transitionDone.value = false
      document.documentElement.classList.remove('dark')
      setTimeout(() => {
        transitionDone.value = true
      }, 1000)
    }
  },
  { immediate: true },
)

function getToggleElementPosition() {
  const element = document.querySelector('#theme-toggle') as HTMLElement
  if (element === null) return
  const rect = element.getBoundingClientRect()

  toggleButtonPosition.value = {
    left: layout.isRtl ? 'auto' : `${rect.left + window.scrollX}px`,
    right: layout.isRtl ? `${window.innerWidth - rect.right}px` : 'auto',
    top: `${rect.top + window.scrollY}px`,
  }
}

const router = useRouter()

router.afterEach((to: any, _: any, next: any) => {
  setTimeout(() => {
    getToggleElementPosition()
  }, 1000)
  next()
})
</script>


<template>
    <div class="dark-mode-container"
        :style="{ 'left': toggleButtonPosition.left, 'right': toggleButtonPosition.right, 'top': toggleButtonPosition.top }"
        :class="{ 'done': transitionDone }">
        <div class="dark-mode" :class="{ 'active': layout.isDark }"></div>
    </div>
</template>


<style lang="scss" scoped>
.rtl {
    .dark-mode-container {
        right: auto;
    }
}

.dark-mode-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    z-index: 0;

    &.done {
        z-index: 0;
    }

    .dark-mode {
        position: relative;
        transform: scale(0);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 250vw;
        height: 250vw;
        border-radius: 50%;
        background: var(--background-dark);
        transition: 1000ms ease-in-out;
        display: flex;
        flex: 0 0 auto;

        &.active {
            transform: scale(1);
            transition: 1000ms ease-in-out;
        }
    }
}
</style>