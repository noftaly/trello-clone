<template>
  <v-list v-if="activitiesByDate.length > 0" three-line>
    <v-list-item v-for="activity in activitiesByDate" :key="activity._id">
      <user-avatar :imageUrl="activity.user.imageUrl" class="mr-2"></user-avatar>

      <v-list-item-content>
        <v-list-item-subtitle v-html="markdownify(activity.text)"></v-list-item-subtitle>
        <small>{{activity.formattedDate}}</small>
      </v-list-item-content>
    </v-list-item>
  </v-list>

  <p v-else class="mx-4 my-3">
    No activity
  </p>
</template>

<script>
import marked from 'marked';
import UserAvatar from '@/components/UserAvatar';

export default {
  name: 'BoardSidebarActivities',
  components: {
    UserAvatar,
  },
  props: {
    activitiesByDate: { type: Array, required: true },
  },
  methods: {
    markdownify(text) {
      return marked(text);
    },
  },
};
</script>
