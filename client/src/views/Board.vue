<template>
  <v-container fluid>
    <v-layout column align-center>
      <h2 v-if="board">{{board.name}}</h2>
      <v-row class="d-flex">
        <v-progress-circular
          v-if="loadingBoard || loadingLists"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <v-flex
          v-else
          sm3
          class="mx-4 my-4"
          v-for="list in lists"
          :key="list._id"
        >
          <v-card max-width="400px">
            <v-card-title primary-title>
              <div class="headline">{{list.name}}</div>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex sm3 class="mx-4 my-4" >
          <v-card max-width="400px">
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create List</div>
              <div>
                <v-form
                  v-if="!creatingList"
                  v-model="validList"
                  @submit.prevent="createList()"
                  @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="list.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-btn type="submit" :disabled="!validList">Create List</v-btn>
                </v-form>
                <v-progress-circular
                  v-else
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'board',
  data: () => ({
    validList: false,
    board: {},
    list: {
      name: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  async mounted() {
    const boardResponse = await this.getBoard(this.$route.params.id);
    this.board = boardResponse.data || boardResponse;
    await this.findLists({ query: { boardId: this.$route.params.id } });
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    async createList() {
      if (this.validList) {
        const { List } = this.$FeathersVuex.api;
        this.list.boardId = this.$route.params.id;
        const list = new List(this.list);
        await list.save();
        this.list = {
          name: '',
        };
      }
    },
  },
  computed: {
    ...mapState('boards', { loadingBoard: 'isGetPending' }),
    ...mapState('lists', { loadingLists: 'isFindPending', creatingList: 'isCreatePending' }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    lists() {
      return this.findListsInStore({ query: { boardId: this.$route.params.id } }).data;
    },
  },
};
</script>
