<template>
  <header>
    <div class="header">
        <div class="header-container">
            <div class="logo">
                <img :src="logo" />
            </div>
            <div class="user-info">
                <img :src="user" />
                <span>Otávio Oliveira</span>
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            </div>
        </div>
    </div>
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
  header {
    width: 100%;

    .header {
      display: flex;
      justify-content: center;
      background: #fff;
      
      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        

        .logo {
          width: 180px;
          height: 33px;
        }

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }

          span {
            margin-right: 10px;
          }

          .icon {
            cursor: pointer;
          }
        }
      }
    }
  }

</style>
