<template>
  <v-card max-width="400px">
    <v-img height="200px" :src="board.background"></v-img>
    <v-card-title primary-title>
      <div class="headline">{{board.name}}</div>
    </v-card-title>
    <v-card-actions>
      <v-btn :to="{ name: 'board', params: { id: board._id } }" color="primary">Go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['board'],
};
</script>
