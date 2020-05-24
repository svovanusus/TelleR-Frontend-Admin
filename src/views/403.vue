<template>
  <content-wrapper-with-title title="Error 403">
    <p>You don't have permissions to access to this page or action.</p>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'error-403',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
  },
})
export default class Error403 extends Vue {}
</script>
