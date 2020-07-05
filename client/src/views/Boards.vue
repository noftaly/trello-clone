<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-row class="d-flex">
        <app-progress v-if="loading"></app-progress>

        <v-flex
          v-else
          class="sm3 mx-4 my-4"
          v-for="board in boards"
          :key="board._id"
        >
          <board-list-card :board="board"></board-list-card>
        </v-flex>

        <boards-new-board-form
          :creating="creating"
          :createBoard="createBoard"
        ></boards-new-board-form>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import AppProgress from '@/components/AppProgress';
import BoardsNewBoardForm from '@/components/BoardsNewBoardForm';
import BoardListCard from '@/components/BoardListCard';

export default {
  name: 'boards',
  components: {
    AppProgress,
    BoardsNewBoardForm,
    BoardListCard,
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
