<template>
  <div id="question">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-blue-100 border-b border-blue-200">
      <div class="rounded-full bg-blue-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="graduation-cap" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">{{ school.name }}</h1>
        <p class="font-medium text-xl sm:text-2xl">
          <router-link :to="`/forum/${schoolid}`" class="mr-2 text-blue-400"><v-icon name="arrow-left"></v-icon> Go Back</router-link>
          <span class="border-l-2 border-gray-500 ml-3 mr-4"></span> 
          Ask a question on the forum
        </p>
      </div>
    </div>
    <div class="flex justify-center my-10 flex-col lg:flex-row">
      <div class="rounded p-5 bg-gray-200 w-11/12 mx-auto md:w-2/3">
        <div class="flex items-center tracking-widest text-sm title-font font-bold font-sans text-gray-600 mb-1 uppercase">
          <v-icon name="comment-alt" class="mr-2"></v-icon> Forum
        </div>
        <FeathersVuexFind service="forums" :query="{ '_id': id }">
          <div slot-scope="props" class="flex flex-wrap justify-center">
            <div v-for="(post, key) in props.items" :key="key" class="w-full bg-gray-100 my-3 rounded p-5 transition ease-in-out duration-300 hover:bg-white cursor-pointer">
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
        <h2 class="flex items-center mt-2 mr-2 font-bold font-sans text-darkblue text-xl"><v-icon name="flag" class="mr-2"></v-icon> Answers</h2>
        <FeathersVuexFind service="answers" :query="{ 'forum_id': id }">
          <div slot-scope="props" class="flex flex-wrap justify-center">
            <div v-for="(post, key) in props.items" :key="key" class="w-full bg-gray-100 my-3 rounded p-5 transition ease-in-out duration-300 hover:bg-white cursor-pointer" @click="$router.push(`/question/${id}/${post._id}`)">
              <p>{{ post.answer }}</p>
              <div class="flex justify-end items-center mt-1">
                <v-icon name="exclamation-triangle" class="mr-4 text-white bg-red-500 p-1 rounded" v-if="post.importance === 3"></v-icon>
                <v-icon name="exclamation-triangle" class="mr-4 text-white bg-blue-500 p-1 rounded" v-if="post.importance === 2"></v-icon>
                <v-icon name="exclamation-triangle" class="mr-4 text-white bg-green-500 p-1 rounded" v-if="post.importance === 1"></v-icon>
                <div class="flex items-center font-medium text-gray-600">
                  <v-icon name="calendar-day" class="mr-2"></v-icon>{{ formatDate(new Date(post.createdAt)) }}
                  <v-icon name="circle" scale="0.3" class="mx-2"></v-icon> Answered by {{ post.user }}
                </div>
              </div>
            </div>
          </div>
        </FeathersVuexFind>
        <div class="my-3 bg-white rounded-lg overflow-hidden transform transition-all w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" v-if="showAnswer">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="mb-5 text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Respond to Question
              </h3>
              <div class="mt-2">
                <label for="description" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                  <v-icon name="bookmark" class="mr-2 ml-1" />
                  Answer
                </label>
                <textarea type="text" id="description" class="h-32 resize-none w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white transition ease-in duration-200 focus:outline-none rounded mb-8 mt-3" v-model="answer.answer" required></textarea>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="createAnswer">
                Respond
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="showAnswer=false">
                Cancel
              </button>
            </span>
          </div>
        </div>
        <div class="w-full bg-gray-100 py-3 px-3 rounded font-weight text-gray-500 font-semibold mt-5 select-none cursor-pointer duration-300 ease-in-out transition hover:bg-white" @click="showAnswer=!showAnswer">
          <v-icon name="share" class="mr-2"></v-icon> Respond
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Question',
  data() {
    return {
      showAnswer: false,
      answer: {
        answer: ''
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    schoolid() {
      return this.$route.params.schoolid;
    },
    school() {
      const { School } = this.$FeathersVuex.api;
      return School.getFromStore(this.schoolid);
    }
  },
  async mounted() {
    const school = await this.getSchoolInStore(this.schoolid);
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async createAnswer() {
      const { Answer } = this.$FeathersVuex.api;
      const newAnswer = new Answer({
        ...this.answer,
        forum_id: this.id
      });
      try {
        const savedAnswer = newAnswer.save();
        this.showAnswer = false;
      } catch (error) {
        console.error(error);
      }
    },
    ...mapActions('schools', { getSchoolInStore: 'get' }),
    ...mapActions('schools', { getSchoolInStore: 'get' })
  }
}
</script>