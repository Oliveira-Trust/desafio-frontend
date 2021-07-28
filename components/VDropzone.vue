<template>
  <div
    class="dropzone relative py-4"
    @dragover.prevent="dragover"
    @drop.prevent="adicionaArquivo"
  >
    <div
      v-if="arquivosToUpload.length === 0"
      class="dropzone__no-files flex justify-center items-center h-full"
    >
      Arraste seus arquivos para essa área
    </div>
    <div v-else class="dropzone__content flex flex-column h-full">
      <div class="dropzone__body grid lg:grid-columns-5 px-4 pb-4">
        <div
          v-for="(arquivo, index) in arquivosToUpload"
          :key="index"
          class="dropzone__item flex flex-column justify-center px-2"
        >
          <i class="mx-auto"
            ><font-awesome-icon class="lg-icon mb-3" :icon="['far', 'file']"
          /></i>
          <p class="text-center">{{ arquivo.name }}</p>
        </div>
      </div>
      <div class="dropzone__footer flex justify-end w-full mt-auto px-4 pt-4">
        <VButton @click="realizaUpload">Upload dos arquivos</VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const arquivosStore = namespace('arquivos')

@Component
export default class IndexPage extends Vue {
  @arquivosStore.Mutation('ADICIONA_ARQUIVOS')
  adicionaArquivos!: (files: File[]) => void

  arquivosToUpload: File[] = []

  dragover() {}

  adicionaArquivo(event: any) {
    this.arquivosToUpload = [
      ...this.arquivosToUpload,
      ...event.dataTransfer.files,
    ]
  }

  realizaUpload() {
    this.adicionaArquivos(this.arquivosToUpload)
    this.arquivosToUpload = []
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  background-color: $backgroud-primario-opaco;
  border: 3px dashed rgba($cor-primaria, 0.5);
  border-radius: 10px;

  &__body {
    column-gap: 20px;
    row-gap: 20px;
  }

  &__item {
    height: 5rem;
  }

  &__item p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__footer {
    align-self: flex-end;
    border-top: 1px solid $cor-preta;
  }
}
</style>
