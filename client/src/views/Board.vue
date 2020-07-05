<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs10>
        <h2 class="text-center" v-if="board">{{board.name}}</h2>

        <v-row class="d-flex ml-5">
          <themed-progress v-if="loadingBoard || loadingLists"></themed-progress>

          <v-flex xs12 mx-3 v-if="listsError">
            <v-alert type="error">{{listsError.message}}</v-alert>
          </v-flex>

          <v-flex xs12 v-else>
            <themed-progress v-if="loadingBoard || loadingLists"></themed-progress>

            <v-row v-else>
              <v-flex
                class="sm3 mx-4 my-4"
                v-for="list in lists"
                :key="list._id"
              >
                <board-list
                  :list="list"
                  :setDroppingList="onSetDroppingList"
                  :droppingList="droppingList"
                  :cardsByListId="cardsByListId"
                  :startDraggingCard="startDraggingCard"
                  :dropCard="dropCard"
                  :user="user"
                  :createActivity="createActivity"
                ></board-list>
              </v-flex>

              <new-list-form :creatingList="creatingList" :createList="createList"></new-list-form>
            </v-row>
          </v-flex>
        </v-row>
      </v-flex>

      <v-flex xs2>
        <board-activities :activitiesByDate="activitiesByDate"></board-activities>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapActions,
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex';
import NewListForm from '@/components/NewListForm';
import ThemedProgress from '@/components/ThemedProgress';
import BoardActivities from '@/components/BoardActivities';
import BoardList from '@/components/BoardList';

export default {
  name: 'board',
  components: {
    NewListForm,
    ThemedProgress,
    BoardActivities,
    BoardList,
  },
  data: () => ({
    board: {},
  }),
  async mounted() {
    const boardId = this.$route.params.id;
    const boardResponse = await this.getBoard(boardId);
    this.board = boardResponse.data || boardResponse;

    await this.findLists({ query: { boardId } });
    await this.findCards({ query: { boardId } });
    await this.findActivities({ query: { boardId } });
  },
  methods: {
    ...mapMutations('board', ['setDroppingList', 'setDraggingCard']),
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    ...mapActions('activities', { findActivities: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex.api;
      list.boardId = this.$route.params.id;
      const newList = new List(list);
      await newList.save();
      await this.createActivity(`**${this.user.username}** created list **${newList.name}**`);
    },
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex.api;
      const activity = new Activity();
      activity.text = text;
      activity.boardId = this.$route.params.id;
      activity.userId = this.user._id;
      await activity.save();
    },
    startDraggingCard(card) {
      this.setDraggingCard(card);
    },
    async dropCard() {
      if (this.droppingList && this.draggingCard.listId !== this.droppingList._id) {
        const fromList = this.lists.find((list) => list._id === this.draggingCard.listId);
        this.draggingCard.listId = this.droppingList._id;
        await this.draggingCard.save();
        this.createActivity(`**${this.user.username}** moved the card **${this.draggingCard.title}** from **${fromList.name}** to **${this.droppingList.name}**`);
      }
      this.setDraggingCard(null);
      this.setDroppingList(null);
    },
    onSetDroppingList(event, list) {
      event.preventDefault();
      this.setDroppingList(list);
    },
  },
  computed: {
    ...mapState('board', ['droppingList', 'draggingCard']),
    ...mapState('boards', { loadingBoard: 'isGetPending' }),
    ...mapState('lists', { loadingLists: 'isFindPending', creatingList: 'isCreatePending', listsError: 'errorOnFind' }),
    ...mapGetters('auth', ['user']),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    ...mapGetters('activities', { findActivitiesInStore: 'find' }),
    activities() {
      return this.findActivitiesInStore({ query: { boardId: this.$route.params.id } }).data;
    },
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
    activitiesByDate() {
      return this.activities.slice().reverse();
    },
  },
};
</script>
