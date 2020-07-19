<template>
  <div id="forum">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-green-100 border-b border-green-200">
      <div class="rounded-full bg-green-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="graduation-cap" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">{{ school.name }}</h1>
        <p class="font-medium text-xl sm:text-2xl">
          Message board for everyone
        </p>
      </div>
    </div>
    <div>
      <!-- Tabs -->
      <div class="flex justify-center mt-8">
        <div class="text-xl font-normal font-sans">
          <router-link class="inline-flex items-center pr-6 pl-6 hover:text-gray-700 pb-2 " :to="`/school/${id}`"><v-icon name="columns" class="mr-2"></v-icon> Overview</router-link>
          <router-link class="inline-flex items-center pr-6 pl-6 border-b-2 text-blue-500 border-blue-500 pb-2" :to="`/forum/${id}`"><v-icon name="comments" class="mr-2"></v-icon> Message Board</router-link>
        </div>
      </div>
      <!-- Questions -->
      <div class="flex justify-center my-10 flex-col lg:flex-row">
        <div class="rounded p-5 bg-gray-200 w-11/12 mx-auto md:w-2/3">
          <div class="flex items-center tracking-widest text-sm title-font font-bold font-sans text-gray-600 mb-1 uppercase">
            <v-icon name="comment-alt" class="mr-2"></v-icon> Forum
          </div>
          <FeathersVuexFind service="forums" :query="{ 'school_id': id }">
            <div slot-scope="props" class="flex flex-wrap justify-center">
              <div v-for="(post, key) in props.items" :key="key" class="w-full bg-gray-100 my-3 rounded p-5 transition ease-in-out duration-300 hover:bg-white cursor-pointer" @click="$router.push(`/question/${id}/${post._id}`)">
                <h1 class="font-bold font-sans text-darkblue text-xl">{{ post.title }}</h1>
                <p>{{ post.question }}</p>
                <div class="flex justify-end items-center mt-1">
                  <v-icon name="exclamation-triangle" class="mr-4 text-white bg-red-500 p-1 rounded" v-if="post.importance === 3"></v-icon>
                  <v-icon name="exclamation-triangle" class="mr-4 text-white bg-blue-500 p-1 rounded" v-if="post.importance === 2"></v-icon>
                  <v-icon name="exclamation-triangle" class="mr-4 text-white bg-green-500 p-1 rounded" v-if="post.importance === 1"></v-icon>
                  <div class="flex items-center font-medium text-gray-600">
                    <v-icon name="calendar-day" class="mr-2"></v-icon>{{ formatDate(new Date(post.createdAt)) }}
                    <v-icon name="circle" scale="0.3" class="mx-2"></v-icon> Asked by {{ post.user }}
                  </div>
                </div>
              </div>
            </div>
          </FeathersVuexFind>
          <div class="w-full bg-gray-100 p-3 mt-3 rounded font-weight text-gray-500 font-semibold select-none cursor-pointer duration-300 ease-in-out transition hover:bg-white" @click="$router.push(`/postquestion/${id}`)">
            <v-icon name="plus" class="mr-2"></v-icon> Post Question
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Forum',
  computed: {
    id() {
      return this.$route.params.id;
    },
    school() {
      const { School } = this.$FeathersVuex.api;
      return School.getFromStore(this.id);
    }
  },
  async mounted() {
    const school = await this.getSchoolInStore(this.id);
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    ...mapActions('schools', { getSchoolInStore: 'get' }),
    ...mapActions('schools', { getSchoolInStore: 'get' })
  }
}
</script>