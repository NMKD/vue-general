<template>
  <ad-component :id="id" />
</template>

<script>
import AdComponent from '@/components/Ads/AdComponent.vue';

export default {
  props: ['id'],
  components: {
    AdComponent
  },
}
</script>
