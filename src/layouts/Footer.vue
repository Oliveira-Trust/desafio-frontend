<template>
  <footer>Fintools | Desafio Front-End</footer>
</template>

<script>

export default {
  name: "App-Footer",
};
</script>

<style scoped>
footer {
  width: 100%;
  text-align: center;
  padding: var(--space-m);
  font-size: 0.65rem;
  color: var(--color-default);
}

.footer::before {
  height: 100px;
}

.footer::before {
  content: " ";
  display: block;
}


</style>
