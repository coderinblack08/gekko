<template>
  <div id="app" class="bg-white h-screen font-quicksand">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar
  },
  async mounted() {
    await this.$store.dispatch('auth/authenticate');
  }
}
</script>