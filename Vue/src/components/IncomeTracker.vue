<template>
   <div class="header">
      <router-link to="/">Home</router-link>
    </div>
  <div class="IncomeContainer">
    <h2>Income</h2>
    <form @submit.prevent="submitIncome">
      <input v-model.number="newIncome.amount" type="number" placeholder="Value" />
      <input v-model="newIncome.description" type="text" placeholder="Description" />
      <button type="submit">Add</button>
    </form>

    <div class="incomeList">
      <ul>
        <li v-for="income in incomes" :key="income.id" @click="deleteIncome(income.id)">
          {{ income.amount }} - "{{ income.description }}" <hr>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: 'IncomeTracker',
    data() {
      return {
        newIncome: {
          amount: 0,
          description: ''
        }
      };
    },
    computed: {
      ...mapState(['incomes'])
    },
    methods: {
      ...mapActions(['addIncome', 'removeIncome']), 
  
      submitIncome() {
        if (this.newIncome.amount > 0 && this.newIncome.description) {
          this.addIncome({
            ...this.newIncome,
            id: Date.now() 
          });
          this.resetForm();
        }
      },
      resetForm() {
        this.newIncome.amount = 0;
        this.newIncome.description = '';
      },
      deleteIncome(incomeId) {
      this.removeIncome(incomeId); 
    }
    }
  };
  </script>
  
  <style>

  .IncomeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .header {
  display: flex;
  justify-content: left;
  gap: 20px;
  margin-top: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
}

.header a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF; 
  color: #fff; 
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease; 
}
  
  form {
    width: 100%;
    max-width: 300px; 
  }
  
  .incomeList {
    max-width: 50%; 
    width: fit-content;
  }

  ul {
    list-style-type: none; 
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  li:hover {
    background-color: #ccc;
    cursor: pointer;
  }
  </style>
  