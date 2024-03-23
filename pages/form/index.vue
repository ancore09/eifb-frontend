<script setup lang="js">
import Editor from 'primevue/editor';
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useToast } from "primevue/usetoast";

const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const images = ref([]);

const contentHtml = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, dolor a mattis tempor, urna velit interdum ipsum, vel vestibulum turpis quam tempus enim. Nullam luctus mollis aliquet. Pellentesque eget odio dui. Aliquam fringilla efficitur rutrum. Suspendisse ut scelerisque lectus. Sed tristique diam eget eros aliquam, et bibendum nunc pretium. Nam felis sapien, luctus in imperdiet a, interdum sed mi. Vivamus euismod tellus ac odio vehicula, eget hendrerit purus lobortis. Proin varius dignissim est nec volutpat. Etiam suscipit ex at velit sagittis, et ullamcorper tortor luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
const content = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, dolor a mattis tempor, urna velit interdum ipsum, vel vestibulum turpis quam tempus enim. Nullam luctus mollis aliquet. Pellentesque eget odio dui. Aliquam fringilla efficitur rutrum. Suspendisse ut scelerisque lectus. Sed tristique diam eget eros aliquam, et bibendum nunc pretium. Nam felis sapien, luctus in imperdiet a, interdum sed mi. Vivamus euismod tellus ac odio vehicula, eget hendrerit purus lobortis. Proin varius dignissim est nec volutpat. Etiam suscipit ex at velit sagittis, et ullamcorper tortor luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
const degree = ref('');
const element = ref('');
const form = ref('');
const format = ref('');
const variant = ref('');
const application = ref('');
const title = ref('');
const annotation = ref('');

let degreeOpts = {
  name: 'a degree',
  options: ['Гуманитарное', 'Технической', 'Социально-Экономическое', 'Дизайн', 'Для всех направлений'],
  ref: degree
}

let elementsOpts = {
  name: 'an element',
  options: ['Лекция', 'Семинар', 'Домашнее задание', 'Проект', 'Самостоятельная работа', 'Оценивание'],
  ref: element
}

let formOpts = {
  name: 'a form',
  options: ['Фронтальная', 'Групповая', 'Индивидуальная'],
  ref: form
}

let formatOpts = {
  name: 'a format',
  options: ['Синхронный', 'Асинхронный', 'Оффлайн', 'Онлайн', 'Любой'],
  ref: format
}

let variantOpts = {
  name: 'a variant',
  options: ['Однократно', 'Многократно', 'В течение дисциплины'],
  ref: variant
}

let applicationOpts = {
  name: 'an application',
  options: ['Универсальное', 'Предметное'],
  ref: application
}

let fields = [degreeOpts, elementsOpts, formOpts, formatOpts, variantOpts, applicationOpts];

const difficulty = ref(1);
const blum = ref(1);

let blumOpts = {
  name: 'blum',
  ref: blum,
  min: 1,
  max: 5,
  tooltip: 'blum'
}

let difficultyOpts = {
  name: 'difficulty',
  ref: difficulty,
  min: 1,
  max: 10,
  tooltip: 'diff'
}

let sliders = [blumOpts, difficultyOpts]

const upload = async () => {
  let article = {
    title: title.value,
    contentHtml: contentHtml.value,
    degree: degreeOpts.ref.value,
    blum: blumOpts.ref.value,
    difficulty: difficultyOpts.ref.value,
    element: elementsOpts.ref.value,
    form: formOpts.ref.value,
    format: formatOpts.ref.value,
    variant: variantOpts.ref.value,
    application: applicationOpts.ref.value,
    fullArticle: files.value.length === 1 ? files.value[0] : null,
    image: images.value.length === 1 ? images.value[0] : null,
    annotation: annotation.value
  }

  await useNuxtApp().$pb.collection('articles').create(article);
}


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  console.log(event)
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const onSelectedImageFiles = (event) => {
  console.log(event)
  images.value = event.files;
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

let getUrl = () => {
  if (images.value.length !== 1)
    return ''
  return URL.createObjectURL(images.value[0])
}
</script>

<template>
  <Stepper>
    <StepperPanel header="Header I">
      <template #content="{ nextCallback }">
        <div class="flex flex-column">

          <div class="grid">
            <div class="col">
              <div class="field p-fluid ">
                <h3 class="font-semibold">Info about submitted work</h3>
              </div>


              <div class="field p-fluid ">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-user" />
                  </InputIcon>
                  <InputText placeholder="Full Name" />
                </IconField>
              </div>

              <div class="field p-fluid ">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-box" />
                  </InputIcon>
                  <InputText placeholder="Position" />
                </IconField>
              </div>

              <div class="field p-fluid ">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-box" />
                  </InputIcon>
                  <InputText placeholder="University" />
                </IconField>
              </div>

              <div class="field p-fluid ">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-box" />
                  </InputIcon>
                  <InputText placeholder="Faculty" />
                </IconField>
              </div>

              <div class="field p-fluid flex align-items-center justify-content-between" v-for="field in fields">
                <div>
                  <span class="font-semibold">Select {{field.name}}:</span>
                </div>
                <Dropdown
                    v-model="field.ref.value"
                    :options="field.options"
                    filter
                    :placeholder="`Select ${field.name}`"
                    class="w-full md:w-20rem justify-content-end">
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                      <div>{{ slotProps.value }}</div>
                    </div>
                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex align-items-center">
                      <div>{{ slotProps.option }}</div>
                    </div>
                  </template>
                </Dropdown>
              </div>

              <div class="field p-fluid flex align-items-center justify-content-between" v-for="slider in sliders">
                <div class="flex align-items-center gap-2">
                  <span class="font-semibold">Select {{slider.name}} </span>
                  <i class="pi pi-info-circle" v-tooltip="slider.tooltip"/>
                </div>
                <div class="flex align-items-center gap-4">
                  <span class="font-semibold">{{slider.ref.value}}</span>
                  <Slider class="w-14rem" v-model="slider.ref.value" :min="slider.min" :max="slider.max"/>
                </div>
              </div>

            </div>


            <div class="col">
              <div class="field p-fluid ">
                <h3 class="font-semibold">Content</h3>
              </div>

              <div class="field p-fluid">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-pencil" />
                  </InputIcon>
                  <InputText placeholder="Title" v-model="title"/>
                </IconField>
              </div>

              <div class="my-2">
                <div>
                  <span class="font-semibold">Annotation</span>
                </div>
                <Textarea v-model="annotation" rows="5" cols="70" style="resize: none;"/>
              </div>

              <div class="my-2">
                <div>
                  <span class="font-semibold">Short Content</span>
                </div>
                <Editor v-model="content" v-on:text-change="event => contentHtml = event.htmlValue" editorStyle="height: 320px;" class="mt-2">
                  <template v-slot:toolbar>
                    <select class="ql-size">
                      <option value="small"></option>
                      <option selected></option>
                      <option value="large"></option>
                      <option value="huge"></option>
                    </select>
                    <select class="ql-font">
                      <option selected></option>
                      <option value="monospace"></option>
                      <option value="serif"></option>
                    </select>
                    <span class="ql-formats">
                        <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                        <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                        <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                        <button v-tooltip.bottom="'Code Block'" class="ql-code-block"></button>
                    </span>
                  </template>
                </Editor>
              </div>

              <div class="my-2">
                <div>
                  <span class="font-semibold">File Upload</span>
                </div>
                <Toast />
                <div class="my-2 flex justify-content-between">
                  <FileUpload mode="basic" name="demo[]" :maxFileSize="1000000" @select="onSelectedFiles" choose-label="Choose File"/>
                  <FileUpload mode="basic" name="image[]" :maxFileSize="1000000" @select="onSelectedImageFiles" choose-label="Choose Image"/>
                </div>
              </div>
            </div>
          </div>

<!--          <div class="grid">-->
<!--            <div class="col">-->
<!--              Personal Info-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              Personal Info-->
<!--            </div>-->
<!--          </div>-->


        </div>

        <div class="flex pt-4 justify-content-end">
          <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
        </div>
      </template>
    </StepperPanel>

    <StepperPanel header="Header II">
      <template #content="{ prevCallback, nextCallback }">
        <div class="flex flex-column">
          <Article :content="contentHtml" :image="`url('${getUrl()}')`"/>
        </div>
        <div class="flex pt-4 justify-content-between">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          <Button label="Upload" icon="pi pi-arrow-right" iconPos="right" @click="upload" />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
</template>

<style scoped>

</style>
