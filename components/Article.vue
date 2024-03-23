<script setup lang="ts">
let props = defineProps({
  content: { type: String, required: true, default: '' },
  id: { type: String, required: true, default: '' },
  image: { type: String, required: true, default: '' },
  record: { required: false, default: {} }
})

let { content } = toRefs(props);

const items = [
  {
    label: 'Docs',
    command: () => {
    }
  },
  {
    label: 'Pdf',
    command: () => {
    }
  },
];

let loading = ref(false)
</script>

<!--style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/e8/Homer_E_Newell_NASA.jpg');-->
<template>
  <Card>
    <template #header>
      <div class="bg-center border-primary-500 border-2 border-round-xl h-20rem w-full flex flex-column align-items-start justify-content-end gap-4 box">
        <div class="p-4">
          <h1 class="m-0 text-white">Title Lorem Ipsum</h1>
        </div>
      </div>
    </template>
<!--    <template #subtitle>Search by author, date, tag, or topic</template>-->
    <template #content>
      <div class="grid">
        <div class="col-8">
          <div v-if="!loading" class="ql-editor" >
            <div v-html="content"></div>
          </div>
          <div v-else>
            <Skeleton height="16rem" class="mt-2 w-full"></Skeleton>
          </div>
        </div>

        <div class="col-4">
          <div class="mt-2 flex flex-column gap-3">
            <div v-if="loading" v-for="i in [1, 2, 3, 4, 5]">
              <div>
                <Skeleton height="1.2rem" class="w-10rem"></Skeleton>
              </div>
              <div>
                <Skeleton height="1rem" class="w-6rem mt-1"></Skeleton>
              </div>
            </div>

            <div v-else class="mt-2 flex flex-column gap-2">
              <div>
                <div>
                  <span class="font-semibold">Degree</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.degree }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Element</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.element }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Form</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.form }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Format</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.format }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Variant</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.variant }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Application</span>
                </div>
                <div>
                  <span class="font-normal mt-1">{{ record.application }}</span>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Blum</span>
                </div>
                <div>
                  <ProgressBar :value="record.blum * 20" > {{record.blum}} </ProgressBar>
                </div>
              </div>

              <div>
                <div>
                  <span class="font-semibold">Difficulty</span>
                </div>
                <div>
                  <ProgressBar :value="record.difficulty * 10" > {{record.difficulty}} </ProgressBar>
                </div>
              </div>
            </div>

            <div>
              <SplitButton label="Download" :model="items" @click="loading = !loading"/>
            </div>

          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.box {
  background-image: v-bind('props.image');
}
</style>
