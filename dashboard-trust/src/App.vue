<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap");

// Consulta de media queries
@mixin tamanho-tela($size) {
  @if $size==apenas-celular {
    @media (max-width: 575.98px) {
      @content;
    }
  } @else if $size==celular {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $size==tablet {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $size==desktop {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $size==desktop-up {
    @media (min-width: 1200px) {
      @content;
    }
  }
}

* {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  --red: #ff0000ff;
  --red-2: #f10000ff;
  --rosso-corsa: #e30000ff;
  --rosso-corsa-2: #d40000ff;
  --international-orange-engineering: #c60000ff;
  --international-orange-engineering-2: #b80000ff;
  --rufous: #aa0000ff;
  --rufous-2: #9b0000ff;
  --dark-red: #8d0000ff;
  --maroon-web: #7f0000ff;
  --light: #ffffff;
  --dark: #353535;
  --gray: #4f4f4f;
}

html,
body {
  height: 105vh;
}

img {
  max-width: 100%;
}

.conteudo {
  margin-top: 140px;

  .titulo {
    font-weight: 700;
    font-size: 1.5rem;
    text-align: center;
    color: var(--light);
    margin-bottom: 80px;

    @include tamanho-tela(tablet) {
      font-size: 2.18rem;
      margin-bottom: 50px;
      text-align: initial;
    }

    @include tamanho-tela(desktop) {
      margin-bottom: 50px;
    }
  }
}
</style>
