<template>
  <table class="c-table">
    <tr class="c-table c-table__header">
      <th v-for="(h, hIndex) in headers" :key="hIndex">{{ h.label }}</th>
    </tr>
    <tr v-for="(item, index) in body" :key="index">
      <td>{{ item.nome }}</td>
      <td>{{ item.sobrenome }}</td>
      <td>{{ item.email }}</td>
      <td>{{ item.bitcoin }}</td>
      <td v-if="item.action">
        <div>
          <img
            @click="$emit('edit', item)"
            src="@/assets/imgs/pencil.png"
            class="c-icon"
            alt="Edit"
          />
          <img
            @click="$emit('delete', item)"
            src="@/assets/imgs/delete.png"
            class="c-icon"
            alt="Delete"
          />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "CTable",
  props: {
    headers: {
      default: () => [],
    },
    body: {
      default: () => [],
    },
  },
};
</script>
