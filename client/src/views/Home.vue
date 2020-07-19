<template>
  <div id="home">
    <img src="@/assets/static/studying.svg" alt="studying image by undraw" class="mx-auto max-w-md md:w-1/3 my-4" />
    <div class="flex justify-center flex-col md:flex-row items-center md:items-start text-center pb-6 pt-10 px-5">
      <div class="flex items-center justify-center rounded-full bg-primary text-white font-bold font-poppins w-5 h-5 p-8 mr-0 mt-2 mb-5 md:mb-0 md:mr-8">
        <v-icon name="graduation-cap" scale="2"></v-icon>
      </div>
      <div>
        <h1 class="font-poppins text-4xl sm:text-5xl font-bold">All-in-one School Portal</h1>
        <p class="font-medium text-xl sm:text-2xl text-gray-800">Communicate with your entire school virtually</p>
        <div class="m-2"></div>
        <PrimaryButton><router-link to="/register">Get Started</router-link></PrimaryButton>
        <SecondaryButton><router-link to="/login">Go to School</router-link></SecondaryButton>
      </div>
    </div>

    <!-- Media Cards -->

    <div class="flex justify-center w-4/5 mx-auto my-10">
      <div class="mt-5">
        <div class="uppercase tracking-wide font-bold text-darkblue">IT COMES EQUIPPED</div>
        <h1 class="font-poppins text-4xl md:text-5xl font-bold text-darkblue">Tailored for Teachers and Students</h1>
        <p class="text-gray-800 text-xl md:text-2xl mt-2">
          Gekko offers a seamless product that will help you and your school stay connected while practicing social distancing.
          The best part is, it is free! No more costly fees for your school district!
        </p>
      </div>
      <div class="hidden md:block ml-10 mt-20">
        <img src="@/assets/static/learning.svg" alt="learning image by undraw">
      </div>
    </div>

    <div class="flex flex-row-reverse justify-center w-4/5 mx-auto mb-20 mt-20 md:mb-40 md:mt-40">
      <div class="mt-5">
        <div class="uppercase tracking-wide font-bold text-darkblue">REALTIME COMMUNICATION</div>
        <h1 class="font-poppins text-4xl md:text-5xl font-bold text-darkblue">Ask And Answer Questions In Realtime</h1>
        <p class="text-gray-800 text-xl md:text-2xl mt-2">
          Gekko's realtime forum allows for students, teachers, and parents to ask and answer questions. Its like magic!
        </p>
      </div>
      <div class="hidden md:block mr-20 mt-20 max-w-xl">
        <img src="@/assets/static/learning.svg" alt="learning image by undraw">
      </div>
    </div>

    <div class="text-center media-card">
      <div class="flex items-center justify-center flex-col md:flex-row">
        <div class="index-circle rounded-full text-white text-3xl font-bold font-poppins w-5 h-5 p-8 flex items-center justify-center mr-8 mb-4 md:mb-0">3</div>
        <div class="text-4xl font-poppins font-semibold">Get Started Today!</div>
      </div>
      <div class="text-2xl max-w-2xl m-auto p-2 font-semibold text-center">For the cost of absolutely nothing</div>
      <PrimaryButton>Get Started</PrimaryButton>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import PrimaryButton from '@/components/form/PrimaryButton.vue';
import SecondaryButton from '@/components/form/SecondaryButton.vue';
export default {
  name: 'Home',
  components: {
    Footer,
    PrimaryButton,
    SecondaryButton
  }
}
</script>

<style lang="scss" scoped>
.media-card {
  position: relative;
  background-color: #F1FAF9;
  width: 80%;
  padding: 3.4em 1.8em 3.4em 1.8em;
  margin: 3em auto;
  color: #09C0AC;
  .index-circle {
    background-color: #09C0AC;
  }
  button {
    background-color: #09C0AC;
  }
}
</style>
