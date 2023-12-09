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
    computed: {
      ...mapState(['incomes', 'expenses']),
  
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
    }
    }
  };
  </script>
  
  <style>
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

  </style>
  