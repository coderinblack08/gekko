<template>
  <div id="create">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-green-100 border-b border-green-200">
      <div class="rounded-full bg-green-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="plus-square" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">Create School</h1>
        <p class="font-medium text-xl sm:text-2xl">Effortlessly Create Your Online Portal</p>
      </div>
    </div>
    <form @submit.prevent="createSchool" class="max-w-2xl md:m-auto pt-12 ml-10 mr-10">
      <h2 class="mb-8 text-bold tracking-wide font-bold text-primary text-center font-poppins text-2xl flex items-center justify-center"><v-icon name="info-circle" scale="1.4" class="mr-2" /> Basic Information</h2>
      <label for="name" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
        <v-icon name="school" class="mr-2 ml-1" />
        School Name
      </label>
      <input type="text" id="name" class="w-full p-2 pl-3 text-gray-600 border bg-gray-100 focus:bg-white block focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="school.name" required />
      <div class="flex flex-col md:flex-row">
        <div class="w-full mr-4">
          <label for="email" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="envelope" class="mr-2 ml-1" />
            Email
          </label>
          <input type="email" id="email" class="w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none transition ease-in duration-200 rounded mb-8 mt-3" v-model="school.email" required />
        </div>
        <div class="w-full">
          <label for="url" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="link" class="mr-2 ml-1" />
            Website URL
          </label>
          <input type="url" id="url" class="w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="school.url" required />
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-2/3 mr-4">
          <label for="location" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="map-marker-alt" class="mr-2 ml-1" />
            Location City
          </label>
          <input type="text" id="location" class="w-full p-2 pl-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none transition ease-in duration-200 rounded mb-8 mt-3" v-model="school.location" required />
        </div>
        <div class="w-full md:w-1/3">
          <label for="type" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
            <v-icon name="tags" class="mr-2 ml-1" />
            School Type
          </label>
          <select type="url" id="type" class="w-full py-2 px-3 text-gray-600 border block bg-gray-100 focus:bg-white focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="school.type" required>
            <option value="K-12">K-12</option>
            <option value="Higher Ed">Higher Ed</option>
          </select>
        </div>
      </div>
      <PrimaryButton class="flex items-center mb-20 mx-auto"><v-icon name="plus-square" scale="1.4" class="mr-4" /> Create School</PrimaryButton>
    </form>
  </div>
</template>

<script>
import PrimaryButton from '@/components/form/PrimaryButton.vue';
export default {
  name: 'Create',
  data() {
    return {
      school: {
        name: '',
        email: '',
        url: '',
        location: '',
        type: ''
      }
    }
  },
  components: {
    PrimaryButton
  },
  methods: {
    async createSchool() {
      const { School } = this.$FeathersVuex.api;
      const newSchool = new School({
        ...this.school
      });
      try {
        const savedSchool = await newSchool.save();
        this.$router.push(`/school/${savedSchool._id}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>