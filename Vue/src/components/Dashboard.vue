<template>
      <section class="actions">
        <router-link to="/income">Manage Income</router-link>
        <router-link to="/expenses">Manage Expenses</router-link>
        <router-link to="/budget">Manage Budget</router-link>
        <router-link to="/categories">Manage Categories</router-link>
      </section>

      <div class="dashboard">
    <h1>Dashboard</h1>

    <section class="balance">
      <h2>Total Balance</h2>
      <p>{{ totalBalance }}</p>
    </section>


    <FinancialChart :chartData="chartData" />

    <div class="tables-container">
      <div class="table-container">
        <h3>Expenses</h3>
        <div class="category-selection">
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category.name)">
              {{ category.name }}
            </button>
          </div>
        <table class="expenses-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in filteredExpenses" :key="expense.id">
              <td>{{ expense.amount }}</td>
              <td>{{ expense.description }}</td>
              <td>{{ expense.category || 'Uncategorized' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-container">
        <h3>Incomes</h3>
        <table class="incomes-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="income in incomes" :key="income.id">
              <td>{{ income.amount }}</td>
              <td>{{ income.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import FinancialChart from './FinancialChart.vue';
  import { mapState } from 'vuex';
  
  export default {
    name: 'Dashboard',
    components: {
      FinancialChart
    },
    data() {
      return {
        selectedCategory: null 
      };
    },
    computed: {
      ...mapState(['incomes', 'expenses', 'categories']),
  
      totalBalance() {
        const totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        return totalIncome - totalExpense;
      },
  
      chartData() {
        return {
        labels: this.categories, 
        datasets: [{
            label: 'Расходы по категориям',
            data: this.expensesByCategory, 
            backgroundColor: ['red', 'blue', 'green'] 
        }]
        };
    },
  
      filteredExpenses() {
        if (!this.selectedCategory) {
          return this.expenses;
        }
        return this.expenses.filter(expense => expense.category === this.selectedCategory);
      }
    },
    methods: {
      selectCategory(category) {
        if (this.selectedCategory === category) {
          this.selectedCategory = null; 
        } else {
          this.selectedCategory = category;
        }
      }
    }
  };
  </script>
  
  
  <style>
body {
  background:#84bb657c;
  background-repeat: no-repeat;
  min-height: 100vh;
}


.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
}

.actions a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF; 
  color: #fff; 
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease; 
}

.actions a:hover {
  background-color: #0056b3; 
}

.dashboard {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top center;
  height: 100vh; 
}

.balance {
  margin-top: 20px;
}

.category-selection {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.category-selection button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  border: none; 
  cursor: pointer;
}

.category-selection button:hover {
  background-color: #0056b3;
}


.tables-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.table-container {
  width: 45%; 
}

.expenses-table, .incomes-table {
  width: 100%; 
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.incomes-table {
  margin-top: 10%;
}
  </style>
  