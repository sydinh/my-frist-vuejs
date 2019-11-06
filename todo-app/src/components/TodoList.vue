<template>
  <div class="todo-list">
    <todo-label v-bind:todos="todos">
      <div style="margin: 10px 0 0">I am Slot</div>
    </todo-label>
    <todo
      v-for="todo in todos"
      v-bind:key="todo.id"
      v-bind:todo.sync="todo"
      v-on:delete-todo="deleteTodo"
      v-on:complete-todo="completeTodo"
    ></todo>
  </div>
</template>

<script>
import TodoLabel from './TodoLabel'
import Todo from './Todo'

export default {
  props: ['todos'],
  components: {
    TodoLabel,
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].done = true;
    },
  },
};
</script>
<style>
</style>
