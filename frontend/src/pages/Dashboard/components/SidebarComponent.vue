<template>
    <div>
        <div class="user">
            <div class="icon">
                <font-awesome-icon icon="user" />
            </div>
            <div class="username">
                <p>Luciano Horta</p> 
                <span>online</span>
            </div>
        </div>

        <div class="menu">
            <ul>
                <!-- <li><router-link to="/foo">Início</router-link></li> -->
                <li><router-link :to="{name: 'home'}">Início</router-link></li>
                <li><router-link :to="{name: 'funcionarios'}">Funcionários</router-link></li>
                <li><router-link :to="{name: 'upload'}">Upload</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarComponent',
}
</script>

<style lang="scss">
    .sidebar {
        position: fixed;
    }
    
    .icon {
        background: #dde1e4;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        position: relative;

        svg {
            position: absolute;
            display: block;
            top: 7px;
            right: 5px;
        }

        i, svg {
            color: #a4b0bb;
        }
    }

    .user {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15%;

        .username {
            line-height: 1em;

            p {
                font-size: 14px;
                margin-left: 8px;
                margin-top: 4px;
            }

            span {
                font-size: 12px;
                margin-left: 8px;
            }
        }
    }

    .menu {
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin-left: 20px;
        margin-top: 70px;

        li {
            margin-bottom: 20px;
            list-style: none;
        }

        a {
            font-weight: bold;
        }
    }
</style>