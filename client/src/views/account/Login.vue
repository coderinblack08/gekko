<template>
  <div id="login" class="mt-20">
    <h1 class="text-center text-4xl font-poppins font-medium">Gekko Login</h1>
    <p class="text-center text-xl font-medium">Your Personal School Account</p>
    <form @submit.prevent="login" class="flex justify-center flex-col max-w-lg m-auto mt-5 pl-5 pr-5 md:p-0">
      <label for="email" class="tracking-widest text-md title-font font-medium text-gray-500 mb-1 mt-5 block">Email Address</label>
      <input class="border rounded block p-3 focus:outline-none pl-4 bg-gray-100 focus:bg-white ease-in duration-200" type="email" id="email" name="email" v-model="account.email" />

      <label for="password" class="tracking-widest text-md title-font font-medium text-gray-500 mb-1 mt-5 block">Password</label>
      <input class="border rounded block p-3 focus:outline-none pl-4 bg-gray-100 focus:bg-white ease-in duration-200" type="password" id="password" name="password" v-model="account.password" />

      <PrimaryButton class="w-48 mx-auto mt-10">
        <v-icon name="unlock" class="mr-2 mb-1" scale="1.3"/>
        Sign In
      </PrimaryButton>
    </form>
  </div>
</template>

<script>
import PrimaryButton from '@/components/form/PrimaryButton.vue';
export default {
  name: 'Login',
  components: {
    PrimaryButton
  },
  data() {
    return {
      account: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
          const user = await this.$store.dispatch('auth/authenticate', {
            strategy: 'local',
            ...this.account
          });
          this.$router.push('/schools');
        } catch (error) {
          // TODO: Implement error handling
        }
    }
  }
}
</script>