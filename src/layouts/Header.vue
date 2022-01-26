<template>
  <header>
    <div class="container container-flex-center-between">
      <div class="header-logo">
        <img :src="imageLogo" alt="logo oliveira" />
      </div>
      <div class="container-flex-center-between">
        <img class="account-img" :src="account" alt="account" />
        <span class="account-name" v-text="accountUser"></span>
        <App-Button variation="icone">
          <LogoutIcon :size="18" fillColor="var(--color-default)"/>
        </App-Button>
      </div>
    </div>
  </header>
</template>

<script>
import imageLogo from "../assets/img/logo-full.png";
import account from "../assets/img/account.png";

export default {
  name: "App-Header",
  props: {
    accountUser: {
      type: String,
    },
  },
  data: () => {
    return {
      imageLogo,
      account,
    };
  },
};
</script>

<style scoped>
header {
  background-color: var(--color-white);
  padding: 1.5rem 0;
  margin-bottom: 3rem;
}

.header-logo img {
  margin-right: 0.5rem;
  width: 15rem;
}

.account-name {
  font-weight: var(--weight-bold);
}

.account-img {
  width: 2rem;
  margin-right: 0.5rem;
}
</style>
