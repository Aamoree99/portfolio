<template>
  <div class="header">
      <router-link to="/">Home</router-link>
    </div>
    <div class="IncomeContainer">
      <h2>Category Manager</h2>
  
      <form @submit.prevent="addCategory">
        <input v-model="newCategory" type="text" placeholder="New Category Name" />
        <button type="submit">Add</button>
      </form>
  
      <ul>
        <li v-for="category in categories" :key="category.id" @click="deleteCategory(category.id)">
          {{ category.name }} <hr>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newCategory: "",
      };
    },
    computed: {
      categories() {
        return this.$store.state.categories;
      },
    },
    methods: {
      addCategory() {
        if (this.newCategory.trim() !== "") {

          this.$store.dispatch('addCategory', { name: this.newCategory, id: Date.now()  });
          this.newCategory = ""; 
        }
      },
      deleteCategory(categoryId) {
        this.$store.dispatch('deleteCategory', categoryId);
      },
    },
  };
  </script>
  
  <style>
  /* Здесь могут быть стили для вашей страницы */
  </style>
  