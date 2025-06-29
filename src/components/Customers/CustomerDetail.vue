
<script lang="ts" setup>
import {
  Warning20Filled as FailedIcon,
  Star24Regular as PintsIcon,
  CheckmarkCircle20Filled as SuccessIcon,
} from '@vicons/fluent'
import type { Customer } from '~/models/Customer'
interface Props {
  customer: Customer
}

defineProps<Props>()
</script>


<template>
    <div class="p-2 px-8">
        <div class="row">
            <span>
                <n-tag round :bordered="false" :type="customer.emailConfirmed?'success': 'warning'">
                    {{ customer.email }}
                    <template #icon>
                        <n-icon :component="customer.emailConfirmed? SuccessIcon: FailedIcon" />
                    </template>
                </n-tag>
            </span>
        </div>
        <div class="row">
            <span>
                <n-tag round :bordered="false" :type="customer.phoneConfirmed?'success': 'warning'">
                    {{ customer.mobile }}
                    <template #icon>
                        <n-icon :component="customer.phoneConfirmed? SuccessIcon: FailedIcon" />
                    </template>
                </n-tag>
            </span>
        </div>
        <div class="row">
            <span>
                <NTag round>UserGroup: {{customer.userGroup}}</NTag>
            </span>
        </div>
        <div class="row">
            <span>
                <NTag round :color="{color: '#FC0'}">
                    <template #icon>
                        <n-icon :component="PintsIcon" />
                    </template>
                    Points: {{customer.points}}
                </NTag>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.row { 
    margin: .3rem 0;
    .content {
        display: inline-flex;
        background: #CCC; 
        border-radius: varA(n-border-radius);
    }
}
</style>