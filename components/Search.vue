<script setup lang="ts">
import {ref} from "vue";

const dates = ref();

const degreeRef = useState(() => []);
const degreeOptions = ref([
  { name: 'Для всех направлений', value: 'Для всех направлений' },
  { name: 'Гуманитарное', value: 'Гуманитарное' },
  { name: 'Техническое', value: 'Техническое' },
  { name: 'Социально-Экономическое', value: 'Социально-Экономическое' },
  { name: 'Дизайн', value: 'Дизайн' }
]);

const elementRef = useState(() => []);
const elementOptions = ref([
  { name: 'Лекция', value: 'Лекция' },
  { name: 'Семинар', value: 'Семинар' },
  { name: 'Домашнее задание', value: 'Домашнее задание' },
  { name: 'Проект', value: 'Проект' },
  { name: 'Оценивание', value: 'Оценивание' },
  { name: 'Самостоятельная работа', value: 'Самостоятельная работа' }
]);

const formatRef = useState(() => []);
const formatOptions = ref([
  { name: 'Синхронный', value: 'Синхронный' },
  { name: 'Асинхронный', value: 'Асинхронный' },
  { name: 'Оффлайн', value: 'Оффлайн' },
  { name: 'Онлайн', value: 'Онлайн' },
  { name: 'Любой', value: 'Любой' }
]);


const isSelected = (option: any) => {
  for (let valueElement of degree.value) {
    if (valueElement.name == option) {
      console.log(option)
      return true
    }
  }

  return false
}

const search = () => {
  console.log(degreeRef.value)
  let degrees = degreeRef.value.map(x => 'degree=' + x.value).join('&')
  let elements = elementRef.value.map(x => 'element=' + x.value).join('&')
  let formats = formatRef.value.map(x => 'format=' + x.value).join('&')

  navigateTo(`/search?${degrees}&${elements}&${formats}`, {
    replace: true
  })
}
</script>

<template>
  <Card>
    <template #title>
      <h2 class="m-0">Search Articles</h2>
    </template>
    <template #subtitle>Search by author, date, tag, or topic</template>
    <template #content>
      <div class="flex flex-column">
        <InputText placeholder="Search articles by title" type="text" variant="filled" class="mt-3 h-3rem" style="max-width: 30vw"/>

        <span class="font-600 mt-4">Filter by publication date</span>
        <div class="flex gap-4 mt-4 align-items-center">
          <span>Publication date</span>
          <Divider class="w-1"></Divider>
          <Calendar showIcon class="w-17rem" v-model="dates" selectionMode="range" :manualInput="false" />
        </div>

        <span class="font-600 mt-4">Filter by author</span>
        <div class="flex gap-4 mt-4 align-items-center">
          <InputText placeholder="Author name" style="width: 30vw" />
        </div>

        <span class="font-600 mt-4">Filter by degree</span>
        <div class="flex flex-wrap gap-2 mt-4 overflow-x-scroll white-space-nowrap">
          <SelectButton v-model="degreeRef" :options="degreeOptions" optionLabel="name" multiple aria-labelledby="multiple" >
          </SelectButton>
        </div>

        <span class="font-600 mt-4">Filter by element</span>
        <div class="flex flex-wrap gap-2 mt-4 overflow-x-scroll white-space-nowrap">
          <SelectButton v-model="elementRef" :options="elementOptions" optionLabel="name" multiple aria-labelledby="multiple" >
          </SelectButton>
        </div>

        <span class="font-600 mt-4">Filter by format</span>
        <div class="flex flex-wrap gap-2 mt-4 overflow-x-scroll white-space-nowrap">
          <SelectButton v-model="formatRef" :options="formatOptions" optionLabel="name" multiple aria-labelledby="multiple" >
          </SelectButton>
        </div>


<!--        <span class="font-600 mt-4">Filter by topic</span>-->
<!--        <div class="flex flex-wrap gap-2 mt-4">-->
<!--          <Chip label="All topics"/>-->
<!--          <Chip label="Artificial Intelligence"/>-->
<!--          <Chip label="Climate Change"/>-->
<!--          <Chip label="Mental Health"/>-->
<!--          <Chip label="Blockchain"/>-->
<!--          <Chip label="Online Education"/>-->
<!--        </div>-->
      </div>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Search" class="w-5" @click="search()"/>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
