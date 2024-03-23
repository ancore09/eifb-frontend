<script setup lang="ts">

</script>

<template>
  <div class="bg-center border-primary-500 border-2 border-round-xl h-25rem w-full flex flex-column align-items-center justify-content-center gap-4"
       style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/e8/Homer_E_Newell_NASA.jpg'); ">
    <div>
      <h1 class="font-600 text-white">Welcome to EduPulse</h1>
    </div>
    <div>
      <span class="text-white text-center px-4" style="max-width: 50vw">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, dolor a mattis tempor, urna velit interdum ipsum.</span>
    </div>
    <div>
      <IconField icon-position="left">
        <InputIcon class="pi pi-search"/>
        <InputText placeholder="Search articles or authors" type="text" variant="filled" class="h-3rem w-30rem" style="max-width: 50vw"/>
      </IconField>
    </div>
  </div>
</template>

<style scoped>

</style>
