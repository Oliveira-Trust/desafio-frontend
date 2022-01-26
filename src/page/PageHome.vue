<template>
  <div>
    <App-Header :accountUser="account" />
    <App-Home />
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "Otávio Oliveira",
    };
  },
};
</script>