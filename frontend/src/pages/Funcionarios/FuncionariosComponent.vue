<template>
    <DashboardComponent>
        <div slot="slot-pages" class="content-pages">
            <p>FUNCIONÁRIOS</p>

            <div class="inputs">

                <div v-if="!isEditing">
                    <input type="text" v-model="todo">
                    <input type="submit" class="btn btn-primary" value="Adicionar Funcionário" @click="storeTodo">
                </div>

                <div v-else>
                    <input type="text" v-model="todo">
                    <input type="submit" class="btn btn-primary" value="Atualizar" @click="updateTodo">
                </div>


            </div>

            <ul class="list">
                <li v-for="(todo, index) in todos" :key="todo.id">
                    {{ todo }}
                    <div class="edicaobtn">
                        <button @click="editTodo(index, todo)">Editar</button>
                        <button @click="deleteTodo(index)">Deletar</button>
                    </div>
                </li>
            </ul>

        </div>
    </DashboardComponent>
</template>


<script>
    import DashboardComponent from '../Dashboard/DashboardComponent';

    export default {
        components: {
            DashboardComponent,
        },
        data: function() {
            return {
                isEditing: false,
                selectedIndex: null,
                todo: '',
                limit: 5,
                todos: [
                    "Harry",
                    "Ross",
                    "Bruce",
                    "Cook",
                    "Carolyn",
                    "Morgan",
                    "Albert",
                    "Walker",
                    "Randy",
                    "Reed",
                    "Larry",
                    "Barnes",
                    "Lois",
                    "Wilson",
                    "Jesse",
                    "Campbell",
                    "Ernest",
                    "Rogers",
                    "Theresa",
                    "Patterson",
                    "Henry",
                    "Simmons",
                    "Michelle",
                    "Perry",
                    "Frank",
                    "Butler",
                    "Shirley",
                    "Harry",
                    "Ross",
                    "Bruce",
                    "Cook",
                    "Carolyn",
                    "Morgan",
                    "Albert",
                    "Walker",
                    "Randy",
                    "Reed",
                    "Larry",
                    "Barnes",
                    "Lois",
                    "Wilson",
                    "Jesse",
                    "Campbell",
                    "Ernest",
                    "Rogers",
                    "Theresa",
                    "Patterson",
                    "Henry",
                    "Simmons",
                    "Michelle"
                ]
            }
        },

        methods: {
            storeTodo() {
                this.todos.unshift(this.todo)
                //reset input value to a empty string after adding:
                this.todo = ''
            },

            editTodo(index, todo) {
                this.todo = todo
                this.selectedIndex = index
                this.isEditing = true
            },

            updateTodo() {
                this.todos.splice(this.selectedIndex, 1, this.todo)
                this.isEditing = false
            },

            deleteTodo(index) {
                this.todos.splice(index, 1)
            }
        }
    }
</script>


<style lang="scss" src="./style.scss" scoped />