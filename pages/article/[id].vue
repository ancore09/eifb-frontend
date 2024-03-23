<script setup lang="ts">

let pb = await useNuxtApp().$pb;

let record = await pb.collection('articles').getOne(useRoute().params.id)
let getImageUrl = () => {
  let url = pb.files.getUrl(record, record.image);
  return url
}
</script>

<template>
  <Article :content="record.contentHtml" :image="`url('${getImageUrl()}')`" :record="record"/>
</template>

<style scoped>

</style>
