<template>
  <div class="ui basic content center aligned segment">
    <button class="ui basic button icon" v-on:click="openForm" v-show="!isCreating">
      <i class="plus icon"></i>
    </button>
    <form v-on:submit.prevent="sendForm" class="ui centered card" v-show="isCreating">
      <div class="content">
        <div class="ui form">
          <div class="field">
            <label>Title</label>
            <input v-model="titleText" type="text" ref="title" placeholder="title" />
          </div>
          <div class="field">
            <label>Project</label>
            <input v-model="projectText" type="text" ref="project" placeholder="project" />
          </div>
          <div class="ui two button attached buttons">
            <button type="submit" class="ui basic blue button" v-on:click="sendForm">Create</button>
            <button class="ui basic red button" v-on:click="closeForm">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      projectText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length === 0 || this.projectText.length === 0) return;
      const title = this.titleText;
      const project = this.projectText;
      this.$emit('add-todo', { title, project, done: false });
      this.titleText = '';
      this.projectText = '';
      this.isCreating = false;
    },
  },
};
</script>
