<template>
    <div class="relative z-2 m-0 p-0 h-100vh flex flex-col background">
        <header></header>
        <main class="flex text-3xl flex-col h-100vh p-10 text-red-6 items-start pt-50">
            {{ t('common.maintenance') }}
            <p class="text-lg text-dark mt-8">
                {{ t('common.maintenanceDetail') }}
            </p>
            <BackHomeButton />
        </main>
        <footer>
            <div class="maintenance-box"></div>
        </footer>
    </div>
</template>

<script setup>
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.background {
    background-color: #E5E5E5;
}

header {
    height: 50px;
    background-image: url('@/assets/images/maintenance-header.svg') ;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    z-index: 1;
}
main {
    z-index:10;
}
footer {
    height: 350px;
    background-image: url('@/assets/images/maintenance-footer.svg') ;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    z-index: 100;

    .maintenance-box {
        position: fixed;
        bottom: 0;
        right: 0;
        height: 500px;
        width: 500px;
        background-image: url('@/assets/images/maintenance-image.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: bottom center
    }
}


.support-button {
    display: none;;
}

.rtl {
footer {
    .maintenance-box {
        right: auto;
        left: 0;
    }
}
}
// TODO: make it responsive
</style>

<route lang="yaml">
meta:
  layout: ErrorLayout
</route>