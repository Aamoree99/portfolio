<template>
  <div class="charts">
    <canvas id="myChart" ref="canvas"></canvas>
    <canvas id="mySecondChart" ref="secondCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { mapState } from 'vuex';

Chart.register(...registerables);

export default {
  name: 'FinancialChart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      incomes: 'incomes', 
      expenses: 'expenses' 
    })
  },
  mounted() {
    const incomeData = {
      label: 'Income',
      data: this.incomes.map(income => income.amount),
      backgroundColor: 'green',
    };

    const expenseData = {
      label: 'Expense',
      data: this.expenses.map(expense => expense.amount),
      backgroundColor: 'red',
    };

    const chartData = {
      labels: ['test'],
      datasets: [incomeData, expenseData],
    };
    console.log(chartData);
    new Chart(this.$refs.canvas, {
      type: 'bar',
      data: chartData,
      options: {
        // Настройки графика
      }
    });
    const expensesByCategory = this.expenses.reduce((acc, expense) => {
      const category = expense.category || 'Undefined';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += expense.amount;
      return acc;
    }, {});

    const categoryData = {
      labels: Object.keys(expensesByCategory),
      datasets: [{
        data: Object.values(expensesByCategory),
        backgroundColor: Object.keys(expensesByCategory).map(getColorForCategory),
      }]
    };

    new Chart(this.$refs.secondCanvas, {
      type: 'pie', 
      data: categoryData,
      options: {
        // настройки диаграммы
      }
    });

  }
};
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getColorForCategory(category) {
  if (category === 'Undefined') {
    return 'grey'; 
  }
  return getRandomColor(); 
}

</script>

<style>
.charts {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
}

</style>