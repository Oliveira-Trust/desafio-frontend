<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap");

* {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  --red: #ff0000ff;
  --red-2: #f10000ff;
  --rosso-corsa: #e30000ff;
  --rosso-corsa-2: #d40000ff;
  --rich-black-fogra-29: #001219ff;
  --blue-sapphire: #005f73ff;
  --viridian-green: #0a9396ff;
  --middle-blue-green: #94d2bdff;
  --medium-champagne: #e9d8a6ff;
  --gamboge: #ee9b00ff;
  --alloy-orange: #ca6702ff;
  --mahogany: #bb3e03ff;
  --rufous: #ae2012ff;
  --ruby-red: #9b2226ff;
  --light: #ffffff;
  --dark: #353535;
  --gray: #4f4f4f;
}

html,
body {
  min-height: 105vh;
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

    small {
      font-size: 1.225rem;
    }

    @media screen and (min-width: 768px) {
      font-size: 2.18rem;
      margin-bottom: 50px;
      text-align: initial;
    }

    @media screen and (min-width: 992px) {
      margin-bottom: 50px;
    }
  }
}
</style>
