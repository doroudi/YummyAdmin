<script setup lang="ts">
import { storeToRefs } from 'pinia'
const store = useLayoutStore()
const { collapsed, forceCollapsed } = storeToRefs(store)

onMounted(getGithubStarsCount)

const starsCount = ref<number>(34)
const sidebarOpen = computed(() => !collapsed.value && !forceCollapsed.value)
const { t } = useI18n()
async function getGithubStarsCount() {
  const res = await fetch('https://api.github.com/repos/doroudi/yummyadmin')
  const json = await res.json()
  starsCount.value = json.stargazers_count
}
</script>

<template>
  <div class="support-button ltr" v-if="sidebarOpen">
    <a href="https://coff.ee/doroudi" target="_blank"
      class="coffee-button my-2 flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black shadow hover:bg-yellow/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-yellow hover:ring-offset-2">
      <span
        class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
      <div class="flex items-center">
        <BuyMeCoffeeIcon />
        <span class="ms-1 text-black"> {{  t('support.buyMeCoffee.title') }}</span>
      </div>
    </a>

    <a href="https://github.com/doroudi/yummyadmin" target="_blank"
      class="github-button flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2">
      <span
        class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
      <div class="flex items-center">
        <GithubIcon />
        <span class="ms-1 text-white">{{ t('support.github.title') }}</span>
      </div>
      <div class="ml-2 flex items-center gap-1 text-sm md:flex">
        <svg class="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" data-slot="icon"
          aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            fill-rule="evenodd"></path>
        </svg>
        <span class="inline-block tabular-nums tracking-wider font-display font-medium text-white">
          {{ starsCount }}
        </span>
      </div>
    </a>
  </div>


</template>

<style lang="scss">
.support-button {
  position: absolute;
  bottom: -100px;
  z-index: 100;
  font-family: 'Inter var',
    'ui-sans-serif',
    'system-ui',
    'sans-serif';
}

.github-button,
.coffee-button {
  left: 30px;
  animation-duration: 0.8s;
  animation-delay: 1.5s;
  animation-name: slideUp;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.coffee-button {
  background-color: #5f7fff;
}

.rtl {
    .support-button {
      font-family:Shabnam;
    }
  .github-button,
  .coffee-button {
    left: auto;
    right: 30px;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
  }

  to {
    transform: translateY(-125px);
  }
}
</style>
