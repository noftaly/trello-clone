<template>
  <v-container fluid>
    <v-layout column>
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
          <v-card
            max-width="400px"
            @dragover="setDroppingList($event, list)"
            :class="{ 'green lighten-5': droppingList === list }"
          >
            <v-card-title primary-title>
              <v-layout column>
                <v-flex xs-12>
                  <div class="headline">{{list.name}}</div>
                </v-flex>

                <v-flex xs12 v-for="card in cardsByListId[list._id]" :key="card._id">
                  <v-card
                    class="my-1"
                    draggable="true"
                    @dragstart="startDraggingCard(card)"
                    @dragend="dropCard()"
                  >
                    <v-container>
                      <v-layout row>
                        <v-flex xs7>
                          <div>{{card.title}}</div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-actions>
              <create-card :listId="list._id" :boardId="$route.params.id"></create-card>
            </v-card-actions>
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
import CreateCard from '../components/CreateCard';

export default {
  name: 'board',
  components: {
    CreateCard,
  },
  data: () => ({
    draggingCard: null,
    droppingList: null,
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

    await this.findCards({ query: { boardId: this.$route.params.id } });
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
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
    startDraggingCard(card) {
      this.draggingCard = card;
    },
    dropCard() {
      if (this.droppingList) {
        this.draggingCard.listId = this.droppingList._id;
        this.draggingCard.save();
      }
      this.draggingCard = null;
      this.droppingList = null;
    },
    setDroppingList(event, list) {
      event.preventDefault();
      this.droppingList = list;
    },
  },
  computed: {
    ...mapState('boards', { loadingBoard: 'isGetPending' }),
    ...mapState('lists', { loadingLists: 'isFindPending', creatingList: 'isCreatePending' }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    lists() {
      return this.findListsInStore({ query: { boardId: this.$route.params.id } }).data;
    },
    cards() {
      return this.findCardsInStore({ query: { boardId: this.$route.params.id } }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
  },
};
</script>
