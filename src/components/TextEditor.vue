<template>
  <v-card color="white">
    <v-toolbar dark :tile="false">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive  }">
        <div class="toolbar-controls">
          <v-btn
            icon
            @click="commands.undo"
          >
            <v-icon>mdi-undo</v-icon>
          </v-btn>

          <v-btn
            icon
            @click="commands.redo"
          >
            <v-icon>mdi-redo</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.bold() ? 'primary' : 'white'"
            @click="commands.bold"
          >
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.italic() ? 'primary' : 'white'"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.strike() ? 'primary' : 'white'"
            @click="commands.strike"
          >
            <v-icon>mdi-format-strikethrough</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.underline() ? 'primary' : 'white'"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.code() ? 'primary' : 'white'"
            @click="commands.code"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.paragraph() ? 'primary' : 'white'"
            @click="commands.paragraph"
          >
            <v-icon>mdi-format-paragraph</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.heading({ level: 1 }) ? 'primary' : 'white'"
            @click="commands.heading({ level: 1 })"
          >
            <v-icon>mdi-format-header-1</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.heading({ level: 2 }) ? 'primary' : 'white'"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon>mdi-format-header-2</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.heading({ level: 3 }) ? 'primary' : 'white'"
            @click="commands.heading({ level: 3 })"
          >
            <v-icon>mdi-format-header-3</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.bullet_list() ? 'primary' : 'white'"
            @click="commands.bullet_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.ordered_list() ? 'primary' : 'white'"
            @click="commands.ordered_list"
          >
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.blockquote() ? 'primary' : 'white'"
            @click="commands.blockquote"
          >
            <v-icon>mdi-format-quote-close</v-icon>
          </v-btn>

          <v-btn
            icon
            :color="isActive.code_block() ? 'primary' : 'white'"
            @click="commands.code_block"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>

          <v-btn
            icon
            @click="commands.horizontal_rule"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-btn
            icon
            @click="addLinkModal = true"
          >
            <v-icon>mdi-link</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="addImageModal = true"
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </div>
      </editor-menu-bar>
    </v-toolbar>
    <v-card-text>
      <editor-content :editor="editor" />
    </v-card-text>

    <v-dialog v-model="addLinkModal">
      <v-card>
        <v-card-title>Link</v-card-title>
        <v-card-text>link form</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="secondary" @click="addLinkModal = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="addLinkModal = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addImageModal">
      <v-card>
        <v-card-title>Upload Image</v-card-title>
        <v-card-text>upload image form</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="secondary" @click="addImageModal = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="addImageModal = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style lang="scss">
blockquote {
  border-left: 2px solid #000;
  padding-left: 12px;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Image,
  Link,
  Strike,
  Underline,
  History,
  TrailingNode,
} from 'tiptap-extensions';

@Component({
  name: 'text-editor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
})
export default class TextEditor extends Vue {
  @Prop() readonly value!: string;

  get htmlContent(): string {
    return this.value;
  }

  set htmlContent(val: string) {
    this.$emit('input', val);
  }

  editor: any = null;

  addLinkModal: boolean = false;

  addImageModal: boolean = false;

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Image(),
        new Strike(),
        new Underline(),
        new History(),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['paragraph'],
        }),
      ],
      content: this.htmlContent,
      onUpdate: ({ getHTML }: any) => {
        this.htmlContent = getHTML();
      },
    });
  }

  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>
