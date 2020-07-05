<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-row class="d-flex">
        <themed-progress v-if="loading"></themed-progress>

        <v-flex
          v-else
          class="sm3 mx-4 my-4"
          v-for="board in boards"
          :key="board._id"
        >
          <board-card :board="board"></board-card>
        </v-flex>

        <new-board-form
          :creating="creating"
          :createBoard="createBoard"
        ></new-board-form>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ThemedProgress from '@/components/ThemedProgress';
import NewBoardForm from '@/components/NewBoardForm';
import BoardCard from '@/components/BoardCard';

export default {
  name: 'boards',
  components: {
    ThemedProgress,
    NewBoardForm,
    BoardCard,
  },
  async mounted() {
    await this.findBoards({});
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    async createBoard(board) {
      const { Board } = this.$FeathersVuex.api;
      const newBoard = new Board(board);
      await newBoard.save();
    },
  },
  computed: {
    ...mapState('boards', { loading: 'isFindPending', creating: 'isCreatePending' }),
    ...mapGetters('auth', ['user']),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      if (!this.user) return [];
      return this.findBoardsInStore({ query: { ownerId: this.user._id } }).data;
    },
  },
};
</script>
