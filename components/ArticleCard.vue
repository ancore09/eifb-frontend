<script setup lang="ts">
let props = defineProps({
  id: { type: String, required: true, default: '' },
  image: { type: String, required: true, default: '' },
  imageSize: { type: String, required: true, default: '' },
  height: { type: String, required: true, default: '' },
  title: { type: String, required: true, default: '' },
  annotation: { type: String, required: true, default: '' },
  author: { type: String, required: true, default: '' },
})


const read = () => {
  navigateTo(`/article/${props.id}`)
}
</script>

<template>
  <div class="flex gap-4 size">
    <div class="bg-contain bg-center border-primary-500 border-2 border-round-xl box">

    </div>

    <div class="flex flex-column gap-2 justify-content-between">
      <span class="font-light">{{ props.author }}</span>
      <span class="font-semibold">{{ props.title }}</span>

      <div class="overflow-scroll text-overflow-ellipsis" >
        {{ props.annotation }}
      </div>

      <div>
        <Button @click="read">
          Read
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  min-width: v-bind('props.imageSize');
  background-image: v-bind('props.image');
}

.size {
  height: v-bind('props.height')
}

.blur {
  filter: blur(1.5rem);
}
</style>
