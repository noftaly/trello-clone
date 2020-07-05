<template>
  <v-flex sm3 class="mx-4 my-4">
    <v-card max-width="400px">
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Board</div>
        <div>
          <v-form
            v-if="!creating"
            v-model="valid"
            @submit.prevent="onCreateBoard()"
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
          <themed-progress v-else></themed-progress>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import ThemedProgress from '@/components/ThemedProgress';
import { notEmptyRules } from '@/validators';

export default {
  props: ['creating', 'createBoard'],
  components: {
    ThemedProgress,
  },
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules,
  }),
  methods: {
    async onCreateBoard() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: '',
          background: '',
        };
      }
    },
  },
};
</script>
