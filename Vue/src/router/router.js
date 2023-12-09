import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import IncomeTracker from '@/components/IncomeTracker.vue';
import ExpenseTracker from '@/components/ExpenseTracker.vue';
import BudgetPlanner from '@/components/BudgetPlanner.vue';
import CategoryManager from '@/components/CategoryManager.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/income', component: IncomeTracker },
  { path: '/expenses', component: ExpenseTracker },
  { path: '/budget', component: BudgetPlanner },
  { path: '/categories', component: CategoryManager }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 
