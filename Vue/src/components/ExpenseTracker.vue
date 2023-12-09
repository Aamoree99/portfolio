<template>
  <div class="header">
    <router-link to="/">Home</router-link>
  </div>
  <div class="IncomeContainer">
    <h2>Expenses</h2>
    <form @submit.prevent="submitExpense">
      <input v-model.number="newExpense.amount" type="number" placeholder="Amount" />
      <input v-model="newExpense.description" type="text" placeholder="Description" />
      <select v-model="newExpense.category">
        <option v-for="category in formattedCategories" :key="category">{{ category }}</option>
      </select>
      <button type="submit">Add</button>
    </form>

    <div class="incomeList">
      <ul>
        <li v-for="expense in expenses" :key="expense.id" @click="deleteExpense(expense.id)">
          {{ expense.amount }} - "{{ expense.description }}" - {{ expense.category }} <hr>
        </li>
      </ul>
    </div>  
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ExpenseTracker',
  data() {
    return {
      newExpense: {
        amount: 0,
        description: '',
        category: '' 
      },
    };
  },
  computed: {
    ...mapState(['expenses', 'categories']), 
    formattedCategories() {
    return this.categories.map(category => category.name); 
  }
  },
  methods: {
    ...mapActions(['addExpense', 'removeExpense']), 

    submitExpense() {
      if (this.newExpense.amount > 0 && this.newExpense.description && this.newExpense.category) {
        this.addExpense({
          ...this.newExpense,
          id: Date.now(),
        });
        this.resetForm();
      }
    },
    resetForm() {
      this.newExpense.amount = 0;
      this.newExpense.description = '';
      this.newExpense.category = '';
    },
    deleteExpense(expenseId) {
      this.removeExpense(expenseId);
    },
  }
};
</script>

