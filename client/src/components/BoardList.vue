<template>
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
            class="my-1 px-2"
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
      <board-new-card-form
        :createActivity="createActivity"
        :listId="list._id"
        :boardId="$route.params.id"
        :user="user"
      ></board-new-card-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import BoardNewCardForm from '@/components/BoardNewCardForm';

export default {
  props: {
    list: { type: Object, required: true },
    setDroppingList: { type: Function, required: true },
    droppingList: { type: Object, required: true },
    cardsByListId: { type: Array, required: true },
    startDraggingCard: { type: Function, required: true },
    dropCard: { type: Function, required: true },
    user: { type: Object, required: true },
    createActivity: { type: Function, required: true },
  },
  components: {
    BoardNewCardForm,
  },
};
</script>
