<script setup lang="ts">
definePageMeta({
  alias: ["/login"],
  layout: 'login'
});


let username = useState()
let password = useState()

let login = async () => {
  const nuxtApp = useNuxtApp()

  let authData = await nuxtApp.$pb.collection("users")
      .authWithPassword(username.value, password.value);

  console.log(authData)

  if (nuxtApp.$pb.authStore.isValid)
    navigateTo('/')
}
</script>

<template>
  <div class="flex align-items-center justify-content-center">
    <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
      <div class="flex flex-wrap justify-content-center align-items-center gap-2">
        <label class="w-6rem">Username</label>
        <InputText id="username" type="text" class="w-12rem" v-model="username"/>
      </div>
      <div class="flex flex-wrap justify-content-center align-items-center gap-2">
        <label class="w-6rem">Password</label>
        <InputText id="password" type="password" class="w-12rem" v-model="password"/>
      </div>
      <Button label="Login" icon="pi pi-user" class="w-10rem mx-auto" @click="login"></Button>
    </div>
  </div>
</template>

<style scoped>

</style>
