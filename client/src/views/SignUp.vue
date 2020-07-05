<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="signUp({ valid, user, router: $router })"
        @keydown.prevent.enter
      >
        <v-text-field
          v-model="user.username"
          :rules="notEmptyRules"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.displayName"
          :rules="notEmptyRules"
          label="Display Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :rules="notEmptyRules"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm Password"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.imageUrl"
          :rules="notEmptyRules"
          label="Avatar URL"
          required
        ></v-text-field>
        <v-btn type="submit" :disabled="!valid">Sign Up</v-btn>
      </v-form>
      <app-progress v-else></app-progress>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppProgress from '@/components/AppProgress';
import { notEmptyRules } from '@/validators';

export default {
  name: 'SignUp',
  components: {
    AppProgress,
  },
  data: (vm) => ({
    valid: false,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules,
    confirmPasswordRules: [(confirmPwd) => confirmPwd === vm.user.password || 'Passwords must match.'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    ...mapActions('localAuth', ['signUp']),
  },
};
</script>
