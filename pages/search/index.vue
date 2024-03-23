<script setup lang="ts">
let route = useRoute()

let degrees = ''
let elements = ''
let formats = ''

let articles = useState(() => [])

let pb = useNuxtApp().$pb

let filter = useState(() => '')
let first = useState(() => 0)


onUpdated(async () => {
  if (degrees == route.query.degree && elements == route.query.element && formats == route.query.format)
    return

  await fetchArticles()
})

const fetchArticles = async () => {
  degrees = route.query.degree
  elements = route.query.element
  formats = route.query.format

  if (typeof degrees == 'string')
    degrees = [degrees]

  if (typeof elements == 'string')
    elements = [elements]

  if (typeof formats == 'string')
    formats = [formats]

  filter.value = createFilter()


  let records = await pb.collection('articles').getFullList({
    filter: filter.value,
  })

  articles.value = records

  console.log(records)
}

const createFilter = () => {
  let degreesFilter = degrees ? wrapFilter(degrees.map((x) => `degree="${x}"`).join(' || ')) : ''
  let elementsFilter = elements ? wrapFilter(elements.map((x) => `element="${x}"`).join(' || ')) : ''
  let formatsFilter = formats ? wrapFilter(formats.map((x) => `format="${x}"`).join(' || ')) : ''

  let filters = [degreesFilter, elementsFilter, formatsFilter]

  let finalFilter = filters.filter(x => x != '').join(' && ')

  console.log(finalFilter)

  return finalFilter
}

const wrapFilter = (filter: string) => {
  if (!filter)
    return ''
  return '(' + filter + ')'
}

const getImageUrl = (record: any) => {
  let url = pb.files.getUrl(record, record.image);
  return url
}
await fetchArticles()

</script>

<template>
  <Card>
    <template #title>
      <h2 class="m-0">Search Results</h2>
    </template>
    <template #subtitle>
      <div class="border-primary-500 border-2 border-round-xl p-2">
        For {{filter}}
      </div>
    </template>
    <template #content>
      <div class="flex flex-column gap-3 overflow-scroll" style="height: 70vh">
        <div v-for="i in articles">
          <ArticleCard
              class="h-10rem"
              :id="i.id"
              :image="`url('${getImageUrl(i)}')`"
              :title="i.title"
              :annotation="i.annotation"
              :author="i.author"
              image-size="20rem"
              height="5rem"
          />
        </div>
      </div>

      <Paginator :rows="10" :totalRecords="120" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" />
    </template>
  </Card>

</template>

<style scoped>

</style>
