<template>
  <div class="todo-label">
    <p>Completed Tasks: {{ completedTasks }}</p>
    <p>Pending Tasks: {{ pendingTasks }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['todos'],
  computed: {
    completedTasks() {
      return this.todos.filter(todo => todo.done === true).length;
    },
    pendingTasks() {
      return this.todos.filter(todo => todo.done === false).length;
    },
  },
};
</script>

<style>
</style>

