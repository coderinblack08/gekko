<template>
  <div id="create">
    <div class="text-center flex justify-center flex-col md:flex-row items-center md:items-start pb-20 pt-10 px-5 bg-yellow-100 border-b border-yellow-200">
      <div class="rounded-full bg-yellow-400 text-white font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-0 md:mr-8 mb-4 md:mb-0 mt-3"><v-icon name="plus-square" scale="2" /></div>
      <div>
        <h1 class="font-lora text-4xl sm:text-5xl font-bold">Join School</h1>
        <p class="font-medium text-xl sm:text-2xl">Easily Login to Your School Portal</p>
      </div>
    </div>
    <form @submit.prevent="joinSchool" class="max-w-2xl md:m-auto pt-12 ml-10 mr-10">
      <h2 class="mb-8 text-bold tracking-wide font-bold text-primary text-center font-poppins text-2xl flex items-center justify-center"><v-icon name="info-circle" scale="1.4" class="mr-2" /> School Information</h2>
      <label for="name" class="flex items-center tracking-widest text-sm title-font font-medium text-gray-500 mb-1 uppercase">
        <v-icon name="key" class="mr-2 ml-1" />
        Access Code
      </label>
      <input type="text" id="code" class="w-full p-2 pl-3 text-gray-600 border bg-gray-100 focus:bg-white block focus:outline-none rounded transition ease-in duration-200 mb-8 mt-3" v-model="school.code" required />
      <PrimaryButton class="flex items-center mb-20 mt-10 mx-auto"><v-icon name="plus-square" scale="1.4" class="mr-4" /> Join School</PrimaryButton>
    </form>
  </div>
</template>

<script>
import PrimaryButton from '@/components/form/PrimaryButton.vue';
export default {
  name: 'Join',
  data() {
    return {
      school: {
        code: ''
      }
    }
  },
  components: {
    PrimaryButton
  },
  methods: {
    async joinSchool() {
      const { Member } = this.$FeathersVuex.api;
      const newMember = new Member({
        ...this.school,
        user_id: this.$store.state.auth.user._id
      });
      try {
        const savedMember = await newMember.save();
        this.$router.push('/schools');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>