import { createStore } from 'vuex';

export default createStore({
    state: {
      incomes: JSON.parse(localStorage.getItem('incomes')) || [],    
      expenses: JSON.parse(localStorage.getItem('expenses')) || [],  
      budget: JSON.parse(localStorage.getItem('budgets')) || 0,
      categories: JSON.parse(localStorage.getItem('categories')) || [],
      categoryBudgets: JSON.parse(localStorage.getItem('categoryBudgets')) || {}
    },
    mutations: {
      ADD_INCOME(state, income) {
        state.incomes.push(income);
        localStorage.setItem('incomes', JSON.stringify(state.incomes));
      },
      ADD_EXPENSE(state, expense) {
        state.expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
      },
      SET_BUDGET(state, budget) {
        state.budget = budget || 0;
        localStorage.setItem('budgets', JSON.stringify(state.budget));
        console.log(state.budget);
      },
      SET_CATEGORY_BUDGET(state, { category, amount }) {
        state.categoryBudgets[category] = amount;
        localStorage.setItem('categoryBudgets', JSON.stringify(state.categoryBudgets));
      },
      REMOVE_INCOME(state, incomeId) {
        state.incomes = state.incomes.filter(income => income.id !== incomeId);
        localStorage.setItem('incomes', JSON.stringify(state.incomes));
      },
      REMOVE_EXPENSE(state, expenseId) {
        state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
      },
      ADD_CATEGORY(state, category) {
        state.categories.push(category);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      },
      DELETE_CATEGORY(state, categoryId) {
        state.categories = state.categories.filter(category => category.id !== categoryId);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      }
    },
    actions: {
      // Действия для вызова мутаций
      addIncome({ commit }, income) {
        commit('ADD_INCOME', income);
      },
      addExpense({ commit }, expense) {
        commit('ADD_EXPENSE', expense);
      },
      setBudget({ commit }, budget) {
        commit('SET_BUDGET', budget);
      },
      setCategoryBudget({ commit }, { category, amount }) {
        commit('SET_CATEGORY_BUDGET', { category, amount });
      },
      removeIncome({ commit }, incomeId) {
        commit('REMOVE_INCOME', incomeId);
      },
      removeExpense({ commit }, expenseId) {
        commit('REMOVE_EXPENSE', expenseId);
      },
      addCategory({ commit }, category) {
        commit('ADD_CATEGORY', category);
      },
      deleteCategory({ commit }, categoryId) {
        commit('DELETE_CATEGORY', categoryId);
      }
    }
});
