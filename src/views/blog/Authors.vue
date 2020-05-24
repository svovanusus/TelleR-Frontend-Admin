<template>
  <content-wrapper-with-title title="Authors">
    <template v-if="isBlogAvailableToEdit">
      <search-box v-model="search">
        <v-dialog v-model="dialogShown" max-width="500">
          <template #activator="{ on }">
            <v-btn elevation="0" dark color="success" class="ml-4" v-on="on">
              <v-icon left>mdi-plus</v-icon>
              Invite
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Invite new author</v-card-title>
            <v-card-text>
              <v-form ref="inviteForm" @submit.prevent.stop="newInvite">
                <v-text-field
                  type="text"
                  label="Author E-Mail"
                  :counter="invitingEmail.maxLength"
                  :rules="invitingEmail.validationRules"
                  v-model="invitingEmail.value"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="error" @click="close" :disabled="isSending">Cancel</v-btn>
              <v-btn text color="success" @click="newInvite" :loading="isSending">Invite</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </search-box>

      <v-sheet tile>
        <v-data-table
          :headers="!isLoading ? headers : undefined"
          :loading="isLoading"
          loading-text="Loading... Please wait."
          :items="!isLoading ? authors : undefined"
          :search="search"
        >
          <template #item.actions="{ item }">
            <v-btn icon @click.prevent.stop="kickDialogOpen(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </template>
    <p v-else>This page is not availeble for you.</p>
    <v-dialog v-model="kickDialogShown" max-width="350">
      <v-card>
        <v-card-title>Kick author</v-card-title>
        <v-card-text>
          Are you shure that you want to kick the {{ itemToKick.authorName }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click.prevent.stop="kickDialogClose">Cancel</v-btn>
          <v-btn text color="success" @click.prevent.stop="kickDialogApprove">Kick</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { RootState } from '@/store/root-types';
import AuthorInviteService from '@/services/api/author-invite-service';
import BlogService from '../../services/api/blog-service';

interface FormField<T> {
  maxLength: number,
  validationRules: ((v: T) => (boolean | string))[],
  value: T,
}

interface AuthorListItem {
  authorId: number,
  authorName: string,
}

@Component({
  name: 'authhors-view',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    SearchBox: () => import('@/components/SearchBox.vue'),
  },
})
export default class AuthorsView extends Vue {
  @Ref('inviteForm') readonly inviteForm!: any;

  rootState: RootState = this.$store.state;

  isFormValid: boolean = true;

  isSending: boolean = false;

  search: string = '';

  dialogShown: boolean = false;

  kickDialogShown: boolean = false;

  itemToKick: AuthorListItem = {
    authorId: 0,
    authorName: '',
  }

  invitingEmail: FormField<string> = {
    maxLength: 120,
    validationRules: [
      v => /.+@.+\..+/gm.test(v) || 'Email format is incorrect',
    ],
    value: '',
  }

  isLoading: boolean = false;

  headers = [
    {
      text: 'Name',
      filterable: true,
      sortable: true,
      align: 'start',
      value: 'authorName',
    },
    {
      text: 'Actions',
      filterable: false,
      sortable: false,
      align: 'end',
      value: 'actions',
    },
  ];

  authors: AuthorListItem[] = [];

  get isBlogAvailableToEdit():boolean {
    return !this.rootState.currentBlogId || this.rootState.currentBlogAvailableToEdit;
  }

  close() {
    this.dialogShown = false;
    this.invitingEmail.value = '';
    this.isSending = false;
  }

  newInvite() {
    this.inviteForm.validate();
    if (this.isFormValid) {
      this.isSending = true;

      AuthorInviteService.createInvite({
        blogId: this.rootState.currentBlogId || 0,
        email: this.invitingEmail.value || '',
      }).then((response) => {
        if (response && response.data) {
          if (response.data.status) this.$notify.success('Invite successfully sended');
          else this.$notify.error(response.data.message);
        }
        this.close();
      }).catch((data) => {
        this.$notify.error(data.message);
        this.close();
      });
    }
  }

  fetchData() {
    BlogService.getAuthors(this.rootState.currentBlogId || 0).then((response) => {
      if (response && response.data) {
        this.authors = response.data.map<AuthorListItem>(x => ({
          authorId: x.id,
          authorName: x.fullName,
        }));
      }
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
    });
  }

  kick(authorId: number) {
    BlogService.kickAuthor(this.rootState.currentBlogId || 0, authorId).then((response) => {
      if (response && response.data) {
        this.$notify.success('Author successfully kicked.');
        this.fetchData();
      } else {
        this.$notify.error('Error occured while sending data.');
      }
    }).catch((data) => {
      this.$notify.error('Error occured while sending data.');
    });
  }

  kickDialogOpen(item: AuthorListItem) {
    this.itemToKick = item;
    this.kickDialogShown = true;
  }

  kickDialogClose() {
    this.kickDialogShown = false;
    this.itemToKick = {
      authorId: 0,
      authorName: '',
    };
  }

  kickDialogApprove() {
    this.kick(this.itemToKick.authorId);
    this.kickDialogClose();
  }

  mounted() {
    this.isLoading = true;
    this.fetchData();
  }
}
</script>
