<route lang="yaml">
meta:
  layout: ErrorLayout
  title: error
</route>

<template>
    <div class="flex justify-center items-center h-100vh">
        <div class="error-message z-10">
            <img src="@/assets/images/500-new.svg" class="w-130" />
            <p class="text-lg mt-8 dark:text-white">
                {{ $t('common.500Message') }}
            </p>
            <BackHomeButton />
        </div>
    </div>
</template>


