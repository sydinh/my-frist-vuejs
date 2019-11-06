<template>
  <div class="todos">
    <todo-list v-bind:todos="todos" />
    <todo-create v-on:add-todo="addTodo" />
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import TodoCreate from './components/TodoCreate'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoCreate,
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Todo A',
          project: 'Project A',
          done: false,
        },
        {
          id: 2,
          title: 'Todo B',
          project: 'Project B',
          done: false,
        },
        {
          id: 3,
          title: 'Todo C',
          project: 'Project C',
          done: true,
        },
        {
          id: 4,
          title: 'Todo D',
          project: 'Project D',
          done: true,
        },
      ],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.push(todo);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
