<script setup lang="ts">
import {useToast} from "primevue/usetoast";

const toast = useToast()
const showToast = () => {
  toast.add({ severity: 'success', summary: 'Info', detail: 'Message Content', life: 3000 });
}
</script>

<template>
  <Toast/>
  <Button label="Login" icon="pi pi-user" class="w-10rem mx-auto" @click="showToast()"></Button>
</template>

<style scoped>

</style>
