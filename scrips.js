  document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('myChart').getContext('2d');
  let chart; // Variable to hold the chart instance

  // Function to update the chart
  function updateChart(data) {
    if (chart) {
      chart.destroy(); // Destroy the previous chart instance if exists
    }

    const chartData = {
      labels: Array.from({ length: data.length }, (_, i) => `Data ${i + 1}`),
      datasets: [{
        label: 'User Input Data',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    };

    chart = new Chart(ctx,{
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        animations: {
          y: {
            easing: 'easeInOutElastic',
            from: (ctx) => {
              if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += ': ' + context.parsed.y;
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  // Function to handle form submission
  document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const inputData = document.getElementById('dataInput').value;
    const data = inputData.split(',').map(Number);

    updateChart(data)// Update the chart with new data
    document.getElementById('dataInput').value = ''; // Clear the input box
  });

});


