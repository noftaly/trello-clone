<template>
  <v-navigation-drawer absolute permanent right>
    <v-tabs
      fixed-tabs
      background-color="white"
    >
      <v-tab>Activities</v-tab>
      <v-tab>Settings</v-tab>

      <v-tab-item>
        <board-sidebar-activities :activitiesByDate="activitiesByDate"></board-sidebar-activities>
      </v-tab-item>
      <v-tab-item>
        <board-sidebar-settings></board-sidebar-settings>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import BoardSidebarActivities from '@/components/BoardSidebarActivities';
import BoardSidebarSettings from '@/components/BoardSidebarSettings';

export default {
  name: 'BoardSidebar',
  components: {
    BoardSidebarActivities,
    BoardSidebarSettings,
  },
  props: {
    activitiesByDate: { type: Array, required: true },
  },
};
</script>
