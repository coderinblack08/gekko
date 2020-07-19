<template>
  <div id="school">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-blue-100 border-b border-blue-200">
      <div class="rounded-full bg-blue-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="graduation-cap" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">{{ school.name }}</h1>
        <p class="font-medium text-xl sm:text-2xl">
          {{ school.location }} 
          <span class="border-l-2 border-gray-500 ml-3 mr-4"></span> 
          {{ school.type }} School 
          <span class="border-l-2 border-gray-500 ml-3 mr-4"></span> 
          <span class="inline-flex items-center select-none cursor-pointer" @click="expandCode=!expandCode">
            <v-icon name="expand" class="mr-2" scale="1.2"></v-icon> {{ school.code }}
          </span>
          </p>
      </div>
    </div>
    <div class="fixed bottom-0 z-50 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center" v-if="expandCode">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <v-icon name="code" class="text-blue-500"></v-icon>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Access Code: {{ school.code }}
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Go to your schools dashboard and click on the link on the last card that says "Join School". Then type in the access code above to join this school.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              <router-link to="/join">Join</router-link>
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="expandCode=false">
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
    <div>
      <!-- Tabs -->
      <div class="flex justify-center mt-8">
        <div class="text-xl font-normal font-sans">
          <router-link class="inline-flex items-center pr-6 pl-6 border-b-2 text-blue-500 border-blue-500 pb-2" :to="`/school/${id}`"><v-icon name="columns" class="mr-2"></v-icon> Overview</router-link>
          <router-link class="inline-flex items-center pr-6 pl-6 hover:text-gray-700 pb-2 " :to="`/forum/${id}`"><v-icon name="comments" class="mr-2"></v-icon> Message Board</router-link>
        </div>
      </div>
      <div class="flex justify-center mt-10 flex-col lg:flex-row">
        <!-- Updates/Events -->
        <div class="rounded p-5 bg-gray-200 mb-5 mx-5 md:w-2/3 lg:w-1/3 md:mx-auto lg:mr-3">
          <div class="flex items-center tracking-widest text-sm title-font font-bold font-sans text-gray-600 mb-1 uppercase">
            <v-icon name="sync" class="mr-2"></v-icon> Updates
          </div>
          <FeathersVuexFind service="posts" :query="{ 'type': 'update', 'school_id': id }">
            <div slot-scope="props" class="flex flex-wrap justify-center">
              <div v-for="(post, key) in props.items" :key="key" class="w-full bg-gray-100 my-3 rounded p-5 transition ease-in-out duration-300 hover:bg-white">
                <h1 class="font-bold font-sans text-darkblue text-xl">{{ post.title }}</h1>
                <p>{{ post.description }}</p>
                <div class="flex justify-end items-center mt-1">
                  <v-icon name="redo" class="mr-4 text-white bg-blue-500 p-1 rounded" spin></v-icon>
                  <div class="flex items-center font-medium text-gray-600">
                    <v-icon name="calendar-day" class="mr-2"></v-icon>{{ formatDate(new Date(post.createdAt)) }}
                  </div>
                </div>
              </div>
            </div>
          </FeathersVuexFind>
          <div class="my-3 bg-white rounded-lg overflow-hidden transform transition-all sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" v-if="showUpdate">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="mb-5 text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Create Update
                </h3>
                <div class="mt-2">
                  <label for="title" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                    <v-icon name="align-justify" class="mr-2 ml-1" />
                    Upate Title
                  </label>
                  <input type="text" id="title" class="w-full p-2 pl-3 text-gray-600 border bg-gray-100 focus:bg-white block focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="update.title" required />
                  <label for="description" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                    <v-icon name="bookmark" class="mr-2 ml-1" />
                    Description
                  </label>
                  <textarea type="text" id="description" class="h-32 resize-none w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white transition ease-in duration-200 focus:outline-none rounded mb-8 mt-3" v-model="update.description" required></textarea>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="createUpdate">
                  Post Update
                </button>
              </span>
              <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="showUpdate=false">
                  Cancel
                </button>
              </span>
            </div>
          </div>
          <div class="w-full bg-gray-100 p-3 mt-3 rounded font-weight text-gray-500 font-semibold select-none cursor-pointer duration-300 ease-in-out transition hover:bg-white" @click="showUpdate=!showUpdate" v-if="school.user_id === $store.state.auth.user._id">
            <v-icon name="plus" class="mr-2"></v-icon> Add Update
          </div>
        </div>
        <div class="rounded p-5 bg-gray-200 mb-5 mx-5 md:w-2/3 lg:w-1/3 md:mx-auto lg:ml-3">
          <div class="flex items-center tracking-widest text-sm title-font font-bold font-sans text-gray-600 mb-1 uppercase">
            <v-icon name="calendar-day" class="mr-2"></v-icon> Events
          </div>
          <FeathersVuexFind service="posts" :query="{ 'type': 'event', 'school_id': id }">
            <div slot-scope="props" class="flex flex-wrap justify-center">
              <div v-for="(post, key) in props.items" :key="key" class="w-full bg-gray-100 my-3 rounded p-5 transition ease-in-out duration-300 hover:bg-white">
                <h1 class="font-bold font-sans text-darkblue text-xl">{{ post.title }}</h1>
                <p>{{ post.description.substring(0,200) }}</p>
                <div class="flex justify-end items-center mt-1">
                  <v-icon name="arrow-up" class="mr-2 text-white bg-green-500 p-1 rounded" v-if="(new Date(post.date).getTime()-new Date().getTime())/(1000*3600*24)<=14"></v-icon>
                  <v-icon name="forward" class="mr-2 text-white bg-red-500 p-1 rounded" v-if="(new Date(post.date).getTime()-new Date().getTime())/(1000*3600*24)<=7"></v-icon>
                  <div class="flex items-center font-medium text-gray-600">
                    <v-icon name="calendar-day" class="ml-2 mr-2"></v-icon>{{ formatDate(new Date(post.date)) }}
                  </div>
                </div>
              </div>
            </div>
          </FeathersVuexFind>
          <div class="my-3 bg-white rounded-lg overflow-hidden transform transition-all w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" v-if="showEvent">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="mb-5 text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Create Event
                </h3>
                <div class="mt-2">
                  <div class="flex">
                    <div class="w-2/3 mr-2">
                      <label for="title" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                      <v-icon name="align-justify" class="mr-2 ml-1" />
                        Event Title
                      </label>
                      <input type="text" id="title" class="w-full p-2 pl-3 text-gray-600 border bg-gray-100 focus:bg-white block focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="event.title" required />
                    </div>
                    <div class="w-1/3">
                      <label for="date" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                      <v-icon name="clock" class="mr-2 ml-1" />
                        Date
                      </label>
                      <input type="date" id="date" class="w-full p-2 pl-3 text-gray-600 border bg-gray-100 focus:bg-white block focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="event.date" required />
                    </div>
                  </div>
                  <label for="description" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
                    <v-icon name="bookmark" class="mr-2 ml-1" />
                    Description
                  </label>
                  <textarea type="text" id="description" class="h-32 resize-none w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white transition ease-in duration-200 focus:outline-none rounded mb-8 mt-3" v-model="event.description" required></textarea>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="createEvent">
                  Post Update
                </button>
              </span>
              <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="showEvent=false">
                  Cancel
                </button>
              </span>
            </div>
          </div>
          <div class="w-full bg-gray-100 py-3 px-3 rounded font-weight text-gray-500 font-semibold mt-5 select-none cursor-pointer duration-300 ease-in-out transition hover:bg-white" @click="showEvent=!showEvent" v-if="school.user_id === $store.state.auth.user._id">
            <v-icon name="plus" class="mr-2"></v-icon> Add Event
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'School',
  data() {
    return {
      update: {
        title: '',
        description: '',
        type: 'update'
      },
      event: {
        title: '',
        description: '',
        date: '',
        type: 'event'
      },
      showUpdate: false,
      showEvent: false,
      expandCode: false
    }
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async createUpdate() {
      const { Post } = this.$FeathersVuex.api;
      const newPost = new Post({
        school_id: this.id,
        ...this.update
      });
      try {
        const savedPost = newPost.save();
        this.showUpdate = false;
      } catch (error) {
        console.error(error);
      }
    },
    async createEvent() {
      const { Post } = this.$FeathersVuex.api;
      const newPost = new Post({
        school_id: this.id,
        ...this.event
      });
      try {
        const savedPost = newPost.save();
        this.showEvent = false;
      } catch (error) {
        console.error(error);
      }
    },
    ...mapActions('schools', { getSchoolInStore: 'get' }),
    ...mapActions('schools', { getSchoolInStore: 'get' })
  }
}
</script>