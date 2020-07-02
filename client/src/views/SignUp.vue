<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="signUp()"
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
      <v-progress-circular
        v-else
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SignUp',
  data: (vm) => ({
    valid: false,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
    confirmPasswordRules: [(confirmPwd) => confirmPwd === vm.user.password || 'Passwords must match.'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    async signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;
        const user = new User(this.user);
        await user.save();
        this.$router.push('/login');
      }
    },
  },
};
</script>
