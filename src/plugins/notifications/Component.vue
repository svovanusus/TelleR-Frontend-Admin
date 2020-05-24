<template>
  <transition
    enter-active-class="notify-enter"
    leave-active-class="notify-leave"
  >
    <div
      role="alert"
      :class="`v-alert v-sheet theme--dark ${ type }`"
      v-show="isActive"
    >
      <div class="v-alert__wrapper">
        <i
          aria-hidden="true"
          :class="`v-icon notranslate v-alert__icon mdi theme--dark ${icon}`"
        ></i>
        <div class="v-alert__content" v-html="message"></div>
        <button
          type="button"
          class="
            v-alert__dismissible
            v-btn
            v-btn--flat
            v-btn--icon
            v-btn--round
            theme--dark
            v-size--small"
          aria-label="Close"
          @click.prevent.stop="close"
        >
          <span class="v-btn__content">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-close-circle theme--dark"></i>
          </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PluginObject } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

import PageButtonsSectionWrapper from '@/components/PageButtonsSectionWrapper.vue';

@Component({
  name: 'notitication',
})
export default class NotificationContainer extends Vue {
  @Prop({ default: '' }) readonly message!: string;

  @Prop({ default: 'info' }) readonly type!: string;

  isActive: boolean = false;

  parentContainer: Element | null = null;

  timer?: number;

  get icon(): string {
    switch (this.type) {
      case 'success':
        return 'mdi-check-circle';
      case 'warning':
        return 'mdi-exclamation';
      case 'error':
        return 'mdi-alert';
      case 'info':
        return 'mdi-information';
      default:
        return '';
    }
  }

  containerSetup() {
    this.parentContainer = document.querySelector('.notitication-cantainer');
    if (!this.parentContainer) {
      this.parentContainer = document.createElement('div');
      this.parentContainer.className = 'notitication-cantainer';

      document.body.appendChild(this.parentContainer);
    }
  }

  close() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.isActive = false;
    setTimeout(() => {
      this.$destroy();
      const el = this.$el;

      if (typeof el.remove !== 'undefined') el.remove();
      else if (el.parentNode) el.parentNode.removeChild(el);
    }, 3000);
  }

  beforeMount() {
    this.containerSetup();
  }

  mounted() {
    if (this.parentContainer) {
      this.parentContainer.insertAdjacentElement('beforeend', this.$el);
      this.isActive = true;
    }

    this.timer = setTimeout(() => { this.close(); }, 3000);
  }

  // beforeDestroy() {}
}
</script>
