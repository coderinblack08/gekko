<template>
  <nav 
    :class="{ 
      'bg-purple-100': $route.name==='Schools' || $route.name==='PostQuestion', 
      'bg-yellow-100': $route.name==='Join',
      'bg-blue-100': $route.name==='School' || $route.name==='Question',
      'bg-green-100': $route.name==='Forum' || $route.name==='Create'
    }" 
    class="text-gray-700 body-font font-poppins"
  >
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <router-link to="/" class="flex title-font font-normal items-center text-gray-900 mb-4 md:mb-0">
        <span class="ml-3 text-2xl uppercase">Gekko</span>
      </router-link>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <router-link to="/" class="mr-10 hover:text-gray-900" v-if="!user">Our Message</router-link>
        <router-link to="/" class="mr-10 hover:text-gray-900" v-if="!user">Our Team</router-link>
        <router-link to="/login" class="mr-10 hover:text-gray-900" v-if="!user">Login</router-link>
        <router-link to="/schools" class="mr-10 hover:text-gray-900" v-if="user">Schools</router-link>
        <!-- TODO: Add profile page -->
        <router-link to="/profile" class="mr-10 hover:text-gray-900" v-if="user">Profile</router-link>
      </nav>
      <router-link to="/register" class="inline-flex items-center bg-black border-0 py-2 px-5 focus:outline-none rounded text-base mt-4 md:mt-0 text-white" tag="button" v-if="!user">
        Register
      </router-link>
      <button class="inline-flex items-center bg-black border-0 py-2 px-5 focus:outline-none rounded text-base mt-4 md:mt-0 text-white" v-if="user" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error occured while logging user out!');
      }
    }
  }
}
</script>