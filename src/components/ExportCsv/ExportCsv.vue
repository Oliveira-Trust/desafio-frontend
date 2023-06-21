<template>
  <Fragment>
    <download-csv
      :data   = "wallets"
      :name    = "dataFile"
      :labels="labels"
      :fields="fields"
      :separatorExcel="separator"
      >
      <button type="button" class="btn btn-primary btn-sm">Exportar CSV</button>
    </download-csv>
  </Fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment';
  import JsonCSV from 'vue-json-csv';

  export default {
    components: {
      Fragment,
      'download-csv': JsonCSV
    },
    props: ['wallets', 'dataFile', 'labels', 'fields'],
    data() {
      return {
        separator: true
      }
    }
  }
</script>