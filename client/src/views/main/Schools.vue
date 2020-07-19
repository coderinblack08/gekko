<template>
  <div id="schools">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-purple-100 border-b border-purple-200">
      <div class="rounded-full bg-purple-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="plus-square" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">School Dashboard</h1>
        <p class="font-medium text-xl sm:text-2xl">All your schools directly listed out</p>
      </div>
    </div>
    <div class="flex mx-20 my-12 flex-wrap justify-center">
      <FeathersVuexFind service="schools" :query="{}">
        <div slot-scope="props" class="flex flex-wrap justify-center">
          <div v-for="(school, key) in props.items" :key="key" @click="$router.push(`/school/${school._id}`)">
            <div style="max-width: 20rem;" class="flex items-center flex-col mt-5 px-10 py-8 text-center bg-white rounded-md shadow mx-3 cursor-pointer duration-300 ease-in-out hover:bg-gray-100 hover:shadow-none select-none">
              <div class="font-poppins text-2xl font-medium text-gray-700">
                {{ school.name }}
              </div>
              <div class="flex flex-col sm:flex-row items-center text-gray-600 mt-2">
                <v-icon name="compass" class="mr-2"></v-icon> {{ school.location }}
              </div>
            </div>
          </div>
        </div>
      </FeathersVuexFind>
      <div class="w-64 mt-5 flex justify-center flex-col items-center px-10 py-8 text-center bg-white rounded-md shadow mx-3 text-gray-600 font-medium cursor-pointer duration-300 ease-in-out hover:bg-gray-100 hover:shadow-none">
        <router-link to="/join" class="flex items-center mb-1"><v-icon name="building" class="mr-2"></v-icon> Join School</router-link>
        <router-link to="/create" class="flex items-center"><v-icon name="plus" class="mr-2"></v-icon> Create School</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schools',
  methods: {
    isPrincipal(school) {
      return this.$store.state.auth.user._id === school.user_id;
    }
  },
  async mounted() {
    const schools = this.$store.dispatch
  }
}
</script>