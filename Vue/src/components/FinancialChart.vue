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

const doughnutTextPlugin = {
  id: 'doughnutTextPlugin',
  afterDraw: function(chart, args, options) {
    const ctx = chart.ctx;
    const centerText = options.centerText || '';
    const fontSize = (chart.innerRadius / 10).toFixed(2);

    ctx.save();
    ctx.font = fontSize + "em Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    ctx.fillText(centerText, centerX, centerY);

    ctx.restore();
  }
};



export default {
  name: 'FinancialChart',
  computed: {
    ...mapState({
      budget: state => state.budget,
      categories: state => state.categories,
      categoryBudgets: state => state.categoryBudgets,
      expenses: state => state.expenses
    }),
    freeBudget() {
    const totalBudget = this.budget;
    const totalCategoryBudget = Object.values(this.categoryBudgets).reduce((sum, budget) => sum + budget, 0);
    return totalBudget - totalCategoryBudget;
    },
    categoryBudgetData() {
      const budgetCategoryNames = Object.keys(this.categoryBudgets);
      const budgetData = budgetCategoryNames.map(categoryName => ({
        category: categoryName,
        budget: this.categoryBudgets[categoryName]
      }));
      const freeBudget = this.freeBudget

      return {
        labels: [...budgetCategoryNames, 'Free Budget'],
        datasets: [{
          data: [...budgetData.map(cat => cat.budget), freeBudget],
          backgroundColor: [...budgetCategoryNames.map(getRandomColor), 'grey']
        }]
      };
    },
    expenseBudgetComparisonData() {
      const categoryBudgetData = Object.entries(this.categoryBudgets).map(([category, budget]) => {
        const totalExpense = this.expenses
          .filter(expense => expense.category === category)
          .reduce((sum, exp) => sum + exp.amount, 0);
        return {
          category,
          remainingBudget: budget - totalExpense
        };
      });

      return {
        labels: categoryBudgetData.map(data => data.category),
        datasets: [{
          data: categoryBudgetData.map(data => data.remainingBudget),
          backgroundColor: categoryBudgetData.map(() => getRandomColor())
        }]
      };
    },
  },
  
  mounted() {
    const doughnutCtx = this.$refs.canvas.getContext('2d');
    const freeBudgetValue = this.freeBudget || 'No data';
    const doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: this.categoryBudgetData,
      options: {
        plugins: {
          doughnutTextPlugin: {
            centerText: 'Free Budget = ' + freeBudgetValue
          }
        }
      },
      plugins: [doughnutTextPlugin]
    });

      const barCtx = this.$refs.secondCanvas.getContext('2d');
      const barChart = new Chart(barCtx, {
      type: 'bar',
      data: this.expenseBudgetComparisonData,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Budget Remaining'
          },
          legend: {
            display: false,
          }
        }
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

</script>


<style>
.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 30vw;
}


</style>