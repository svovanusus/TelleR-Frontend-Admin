<template>
  <v-footer color="secondary" class="white--text" clipped-left>
    <span>TelleR</span>
    <v-spacer />
    <span>&copy; 2020</span>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'main-footer',
  components: {},
})
export default class MainFooter extends Vue {

}
</script>
