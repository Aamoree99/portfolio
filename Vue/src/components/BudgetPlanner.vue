<template>
  <div class="header">
      <router-link to="/">Home</router-link>
    </div>
    <div class="IncomeContainer">
      <h2>Budget Planner</h2>
      
      <!-- Форма для установки общего бюджета -->
      <form @submit.prevent="setTotalBudget">
        <input v-model.number="totalBudget" type="number" placeholder="Total Monthly Budget" />
        <button type="submit">Set Total Budget</button>
      </form>
  
      <div v-for="(budget, category) in categoryBudgets" :key="category" v-if="Object.keys(categoryBudgets).length > 0" class="budgetItem">
        <p2>{{ category }} - </p2> 
        <input v-model.number="categoryBudgets[category]" type="number" :placeholder="`Budget for ${category}`" />
      </div>
      <button v-if="Object.keys(categoryBudgets).length > 0" @click="setCategoryBudgets">Set Category Budgets</button>
  

      <div v-if="totalBudget">
        <h3>Current Total Budget: {{ totalBudget }}</h3>
        <div v-for="(budget, category) in categoryBudgets" :key="category">
          {{ category }}: {{ budget }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'BudgetPlanner',
    data() {
      return {
        totalBudget: 0,
        categoryBudgets: {}
      };
    },
      created() {
    const categoriesFromVuex = this.$store.state.categories || [];
    categoriesFromVuex.forEach(category => {
      if (!(category in this.categoryBudgets)) {
        this.categoryBudgets[category.name] = 0;
      }
    });
    },
    methods: {
      ...mapActions(['setBudget', 'setCategoryBudget']),
      setTotalBudget() {
        this.setBudget(this.totalBudget);
      },
      setCategoryBudgets() {
        Object.keys(this.categoryBudgets).forEach(category => {
          this.setCategoryBudget({ category, amount: this.categoryBudgets[category] });
        });
      }
    }
  };
  </script>
  
  <style>
  .budgetItem {
    margin: 10px;
  }
</style>