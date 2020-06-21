<template>
  <v-card>
    <v-card-title>Upload image</v-card-title>
    <v-card-text>
      <v-responsive aspect-ratio="1">
        <clipper-fixed
          ref="clipper"
          :src="img"
          :ratio="1"
          :grid="false"
          :round="true"
          :area="95"
        >
          <template #placeholder>
            <p>No selected image</p>
          </template>
        </clipper-fixed>
      </v-responsive>
    </v-card-text>
    <v-card-actions>
      <clipper-upload v-model="img">
        <v-btn color="secondary" elevation="0">Select image</v-btn>
      </clipper-upload>
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        elevation="0"
        :disabled="loading"
        @click.prevent.stop="cancel"
      >Cancel</v-btn>
      <v-btn
        color="success"
        elevation="0"
        :loading="loading"
        @click.prevent.stop="upload"
      >Upload</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue';
import {
  clipperFixed as ClipperFixed,
  clipperUpload as ClipperUpload,
} from 'vuejs-clipper';

export default {
  name: 'image-editor',
  props: {
    title: {
      type: String,
      defaultValue: 'Upload Image',
    },
    loading: {
      type: Boolean,
      defaultValue: false,
    },
  },
  components: {
    ClipperUpload,
    ClipperFixed,
  },
  data: () => ({
    img: '',
  }),
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    upload() {
      this.$emit('upload', this.$refs.clipper.clip());
    },
  },
};
</script>
