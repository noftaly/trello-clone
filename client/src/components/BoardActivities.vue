<template>
  <v-navigation-drawer absolute permanent right>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Activities</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list three-line>
      <v-list-item v-for="activity in activitiesByDate" :key="activity._id">
        <user-avatar :imageUrl="activity.user.imageUrl" class="mr-2"></user-avatar>

        <v-list-item-content>
          <v-list-item-subtitle v-html="markdownify(activity.text)"></v-list-item-subtitle>
          <small>{{activity.formattedDate}}</small>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import marked from 'marked';
import UserAvatar from '@/components/UserAvatar';

export default {
  props: ['activitiesByDate'],
  components: {
    UserAvatar,
  },
  methods: {
    markdownify(text) {
      return marked(text);
    },
  },
};
</script>
