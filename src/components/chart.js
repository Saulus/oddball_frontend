import Chart from 'chart.js';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var borderColor = [window.chartColors.red,window.chartColors.blue,window.chartColors.green,window.chartColors.grey];
var backgroundColor = [window.chartColors.red,window.chartColors.blue,window.chartColors.green,window.chartColors.grey];

function add_options_to_data(sourcedata) {
	for (var index = 0; index < sourcedata.datasets.length; index++) { 
		sourcedata.datasets[index].label = sourcedata.datasets[index].title;
		sourcedata.datasets[index].yAxisID = 'y-axis-'.concat(index+1);
		sourcedata.datasets[index].borderColor = borderColor[index];
		sourcedata.datasets[index].backgroundColor = backgroundColor[index];
		sourcedata.datasets[index].fill = false;
	} 
	
	return sourcedata;
  }


export default function chart(canvas_ref,sourcedata, ) {
	var ctx = canvas_ref.getContext('2d');
	if (window.myLine !== undefined) window.myLine.destroy();
	window.myLine = Chart.Line(ctx, {
				data: add_options_to_data(sourcedata),
				options: {
					responsive: true,
					maintainAspectRatio: false,
					tooltips: {
						mode: 'index'
					},
					stacked: false,
					title: {
						display: false,
						text: ''
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
				}
			});
  }