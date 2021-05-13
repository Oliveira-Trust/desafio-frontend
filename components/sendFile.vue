<template>
  <div>
    <div v-if="progressInfos">
      <div
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
        class="mb-2"
      >
        <span>{{ progressInfo.fileName }}</span>
        <v-progress-linear
          v-model="progressInfo.percentage"
          height="25"
          reactive
        >
          <strong>{{ progressInfo.percentage }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="8">
        <v-file-input
          accept="image/*"
          multiple
          show-size
          label="Selecione"
          @change="selectFiles"
        ></v-file-input>
      </v-col>

      <v-col cols="12" sm="4" class="text-center">
        <v-btn color="success" dark small @click.stop="uploadFiles">
          Enviar
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert
      v-if="message"
      border="left"
      color="teal"
      outlined
      class="multi-line"
    >
      {{ message }}
    </v-alert>

    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>Lista de Aqruivos</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                <a :href="file.name">{{ file.name }}</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      progressInfos: [],
      message: '',
      fileInfos: [],
    }
  },
  methods: {
    selectFiles(files) {
      this.progressInfos = []
      this.selectedFiles = files
    },
    upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name }
      // Faremos o upaload aqui
      this.fileInfos = this.selectedFiles
      console.log(this.fileInfos)
    },
    uploadFiles() {
      this.message = ''
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i])
      }
    },
  },
}
</script>

<style>
.multi-line {
  white-space: pre-line;
}
</style>
