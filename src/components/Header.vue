<template>
  <header>
    <nav class="header">
        <div class="header-container mx-auto flex">
            <div class="logo">
                <img :src="logo" />
            </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
        logo () {
            return 'https://www.oliveiratrust.com.br/wp-content/themes/OliveiraTrust_WP/assets/img/logotipo_padrao_grey.svg'
        },
        user () {
            return 'https://img.favpng.com/3/7/23/login-google-account-computer-icons-user-png-favpng-ZwgqcU6LVRjJucQ9udYpX00qa.jpg'
        }
    }
}
</script>

<style lang="scss" scoped>
  .header {
      background: #fff;
      
      .header-container {
        justify-content: center;
        align-items: center;
        height: 54px;

        .logo {
          width: 180px;
          height: 33px;
        }
      }
    }

</style>
