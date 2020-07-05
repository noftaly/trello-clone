const state = {
  draggingCard: null,
  droppingList: null,
};

const mutations = {
  setDroppingList: (givenState, droppingList) => {
    givenState.droppingList = droppingList;
  },
  setDraggingCard: (givenState, draggingCard) => {
    givenState.draggingCard = draggingCard;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
