<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-row class="d-flex">
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-flex
          v-else
          sm3
          class="mx-4 my-4"
          v-for="board in boards"
          :key="board._id"
        >
          <v-card max-width="400px">
            <v-img height="200px" :src="board.background"></v-img>
            <v-card-title primary-title>
              <div class="headline">{{board.name}}</div>
            </v-card-title>
            <v-card-actions>
              <v-btn :to="{ name: 'board', params: { id: board._id } }" color="primary">Go</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex sm3 class="mx-4 my-4">
          <v-card max-width="400px">
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create Board</div>
              <div>
                <v-form
                  v-if="!creating"
                  v-model="valid"
                  @submit.prevent="createBoard()"
                  @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="board.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="board.background"
                    :rules="notEmptyRules"
                    label="Background"
                    required
                  ></v-text-field>
                  <v-btn type="submit" :disabled="!valid">Create</v-btn>
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
  name: 'boards',
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  async mounted() {
    await this.findBoards({ query: {} });
    // const response = await this.findBoards({ query: {} });
    // const boards = response.data || response;
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    async createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex.api;
        const board = new Board(this.board);
        await board.save();
        this.board = {
          name: '',
          background: '',
        };
      }
    },
  },
  computed: {
    ...mapState('boards', { loading: 'isFindPending', creating: 'isCreatePending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },
};
</script>
