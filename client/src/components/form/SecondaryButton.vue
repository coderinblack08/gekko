<template>
  <button class="font-medium text-2xl text-primary bg-secondary rounded focus:outline-none my-6 mx-2 py-3 px-8">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SecondaryButton'
}
</script>