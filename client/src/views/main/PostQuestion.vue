<template>
  <div id="postquestion">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-purple-100 border-b border-purple-200">
      <div class="rounded-full bg-purple-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="graduation-cap" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">{{ school.name }}</h1>
        <p class="font-medium text-xl sm:text-2xl">
          <router-link :to="`/forum/${id}`" class="mr-2 text-blue-400"><v-icon name="arrow-left"></v-icon> Go Back</router-link>
          <span class="border-l-2 border-gray-500 ml-3 mr-4"></span> 
          Ask a question on the forum
        </p>
      </div>
    </div>
    <form @submit.prevent="createPost" class="max-w-2xl md:m-auto pt-12 ml-10 mr-10">
      <h2 class="mb-8 text-bold tracking-wide font-bold text-purple-500 text-center font-poppins text-2xl flex items-center justify-center"><v-icon name="info-circle" scale="1.4" class="mr-2" /> Basic Information</h2>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-2/3 mr-4">
          <label for="name" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="map-marker-alt" class="mr-2 ml-1" />
            Question Name
          </label>
          <input type="text" id="name" class="w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none transition ease-in duration-200 rounded mb-8 mt-3" v-model="question.title" required />
        </div>
        <div class="w-full md:w-1/3">
          <label for="importance" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="tags" class="mr-2 ml-1" />
            Question Importance
          </label>
          <select type="url" id="importance" class="w-full py-2 px-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="question.importance" required>
            <option value="1">Low - 1</option>
            <option value="2">Medium - 2</option>
            <option value="3">High - 3</option>
          </select>
        </div>
      </div>
      <label for="instructions" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
        <v-icon name="stream" class="mr-2 ml-1" />
        Question
      </label>
      <textarea type="text" id="instructions" class="h-32 resize-none w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white transition ease-in duration-200 focus:outline-none rounded mb-8 mt-3" v-model="question.question" required></textarea>
      <PrimaryButton class="bg-purple-500 flex items-center mb-20 mx-auto"><v-icon name="plus-square" scale="1.4" class="mr-4" /> Create School</PrimaryButton>
    </form>
  </div>
</template>

<script>
import PrimaryButton from '@/components/form/PrimaryButton.vue';
import { mapActions } from 'vuex';
export default {
  name: 'PostQuestion',
  data() {
    return {
      question: {
        title: '',
        importance: '',
        question: ''
      }
    }
  },
  components: {
    PrimaryButton
  },
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
    async createPost() {
      const { Forum } = this.$FeathersVuex.api;
      const newForum = new Forum({
        school_id: this.id,
        ...this.question
      });
      try {
        const savedForum = newForum.save();
        this.$router.push(`/forum/${this.id}`);
      } catch (error) {
        console.error(error);
      }
    },
    ...mapActions('schools', { getSchoolInStore: 'get' }),
    ...mapActions('schools', { getSchoolInStore: 'get' })
  }
}
</script>