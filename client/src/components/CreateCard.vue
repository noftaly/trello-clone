<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Card</div>
        <div>
          <v-form
            v-if="!creatingCard"
            v-model="validCard"
            @submit.prevent="createCard()"
            @keydown.prevent.enter
          >
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!validCard">Create Card</v-btn>
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
</template>

<script>
export default {
  name: 'create-card',
  props: ['listId', 'boardId'],
  data: () => ({
    creatingCard: false,
    validCard: false,
    card: {
      title: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  methods: {
    async createCard() {
      if (this.validCard) {
        this.creatingCard = true;
        const { Card } = this.$FeathersVuex.api;
        this.card.boardId = this.boardId;
        this.card.listId = this.listId;
        const card = new Card(this.card);
        await card.save();
        this.card = {
          title: '',
        };
        this.creatingCard = false;
      }
    },
  },
};
</script>
