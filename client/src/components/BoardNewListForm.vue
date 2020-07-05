<template>
  <v-flex class="sm3 mx-4 my-4" >
    <v-card max-width="400px">
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create List</div>
        <div>
          <v-form
            v-if="!creatingList"
            v-model="validList"
            @submit.prevent="onCreateList()"
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
          <app-progress v-else></app-progress>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import { notEmptyRules } from '@/validators';
import AppProgress from '@/components/AppProgress';

export default {
  components: {
    AppProgress,
  },
  props: {
    creatingList: { type: Boolean, required: true },
    createList: { type: Function, required: true },
  },
  data: () => ({
    validList: false,
    list: { name: '' },
    notEmptyRules,
  }),
  methods: {
    async onCreateList() {
      if (this.validList) {
        await this.createList(this.list);
        this.list = { name: '' };
      }
    },
  },
};
</script>
