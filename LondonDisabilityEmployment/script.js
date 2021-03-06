$(document).ready(function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bnNyaW5pIiwiYSI6ImNqcXA2M2hhZDBsMW80M252bDBsbTQ4Zm8ifQ.mFW4JBmqjzluJeiNcnBU9Q';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/arunsrini/cjvycf8m009ct1cmpj96frvxs',
        center: [-0.367,51.491],
        zoom: 9.41
    });

	// Loading the main JSON Data
	
    var mainData = $.getJSON('data.json', function(jsonData) {

        var years = [];
        jsonData.data.forEach(function(row) {
            years.push(row.Year);
        });

        years = $.unique(years).sort();

        var yearsObject = {};

        var minYear = years.shift();
        var maxYear = years.pop();
		
		// Function to get the year from the slider and color the boroughs and set the legend
		
        var calculateExpression = function() {

            var year = $('#year-slider')[0].noUiSlider.get();

            var modifiedData = $.grep(jsonData.data, function(row) {
                return row.Year == year;
            });

            var field = $("input[name='inlineRadioOptions']:checked").val();

            var layers = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'];
            var colors = ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#ef3b2c','#e31a1c','#bd0026','#800026'];

            var expression = ["match", ["get", "GSS_CODE"]];

            modifiedData.forEach(function(row) {
                var color = colors[Math.floor(row[field] / 10)];
                expression.push(row.Code, color);
            });

            expression.push("rgba(0,0,0,0)");

            legend.innerHTML = '';
            for (i = 0; i < layers.length; i++) {
                var layer = layers[i];
                var color = colors[i];
                var item = document.createElement('div');
                var key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;
  
                var value = document.createElement('span');
                value.innerHTML = layer;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            }

            return expression;
        }

        // Define noUiSlider
		
        noUiSlider.create($('#year-slider')[0], {
            start: minYear,
            step: 1,
            tooltips: true,
            connect: true,
            orientation: 'vertical',
            format: {
                to: function (value) {
                    return value;
                },
                from: function (value) {
                    return value;
                }
            },
            range: {
                'min': minYear,
                'max': maxYear,
            }
        }).on('change', function(years) {
            var expression = calculateExpression();

            map.setPaintProperty('LocalBoroughs', 'fill-color', expression);
        });

        $('.inlineRadioOptions').on('change', function() {
            var field = $(this).val();

            var expression = calculateExpression();

            map.setPaintProperty('LocalBoroughs', 'fill-color', expression);
        });

        map.on('load', function() {
            var expression = calculateExpression();

            map.addLayer({
                id: 'LocalBoroughs',
                type: 'fill',
                source: {
                    type: 'vector',
                    url: 'mapbox://arunsrini.60m0e91b' // Your Mapbox tileset Map ID
                },
                'source-layer': 'London_Borough-4bs8v6', // name of tilesets
                'layout': {
                    'visibility': 'visible'
                },
                paint: {
                    'fill-color': expression,
                    'fill-opacity': 0.5
                }
            });

            map.addLayer({
                id: 'lahighlight',
                type: 'line',
                source: {
                    type: 'vector',
                    url: 'mapbox://arunsrini.60m0e91b' // Your Mapbox tileset Map ID
                },
                'source-layer': 'London_Borough-4bs8v6', // name of tilesets
                'layout': {
                    'visibility': 'visible'
                },
                paint: {
                    'line-color': '#a8a8a8',
                    'line-width': 2
                },
                filter: ['==', 'NAME', 'empty']
            });
			
			// Defining the on-hover function and rendering of Statistics Data
			
            var previousGssCode = null;
            var previousField = null;
            var chart = null;
            map.on('mousemove', function(e) {
                var la = map.queryRenderedFeatures(e.point, {
                    layers: ['LocalBoroughs']
                });

                var gssCode = null;
				var stats = null;
                var field = $("input[name='inlineRadioOptions']:checked").val();
                var year = $('#year-slider')[0].noUiSlider.get();

                if (la.length == 1) {
                    map.setFilter('lahighlight', ['==', 'NAME', la[0].properties.NAME]);
                    $('#location-name').html(la[0].properties.NAME);
                    $('#location-code').html(la[0].properties.GSS_CODE);
                    gssCode = la[0].properties.GSS_CODE;

                    var statsData = $.grep(jsonData.data, function(row) {
                        return (row.Year == year) && (row.Code == gssCode);
                    });
										
					var stats = 'In '+year+', '+statsData[0].Disabled_Percent+'% of the population were disabled. Of those, '+statsData[0].Employed_Disabled+'% are employed and '+statsData[0].UnEmployed_Disabled+'% are unemployed in comparison to the able-bodied who are '+statsData[0].Employed_Not_Disabled+'% employed and '+statsData[0].UnEmployed_Not_Disabled+'% unemployed.';
					
					$('#display-stats').html(stats);

                } else {
                    map.setFilter('lahighlight', ['==', 'NAME', 'null']);
                }

                // Stops repeated rendering of the chart
				
                if (!((previousGssCode == gssCode) && (previousField == field))) {
                    previousGssCode = gssCode;
                    previousField = field;

                    if (chart) {
                        chart.destroy();
                    }

                    var chartData = $.grep(jsonData.data, function(row) {
                        return row.Code == gssCode;
                    });

                    if (field == "Employed_Disabled"){
                        var labels = chartData.map(function(e) {
                           return e.Year;
                        });
                        var source1 = chartData.map(function(e) {
                           return e.Employed_Disabled;
                        });
                        var source2 = chartData.map(function(e) {
                           return e.Employed_Not_Disabled;
                        });
                    } else {
                        var labels = chartData.map(function(e) {
                           return e.Year;
                        });
                        var source1 = chartData.map(function(e) {
                           return e.UnEmployed_Disabled;
                        });
                        var source2 = chartData.map(function(e) {
                           return e.UnEmployed_Not_Disabled;
                        });
                    }

                    var ctx = canvas.getContext('2d');
                    Chart.defaults.global.defaultFontColor = 'black';
                    var config = {
                        type: 'line',
                        options: {
                            title: {
                              display: true,
                              text: 'Disabled vs Able-Bodied Employment'
                            },
                            scales: {
                                yAxes: [{
                                  scaleLabel: {
                                    display: true,
                                    labelString: '% of population'
                                    }
                                }],
                                xAxes: [{
                                  scaleLabel: {
                                    display: true,
                                    labelString: 'year'
                                    }
                                }]
                            }
                        },
                        data: {
                            labels: labels,
                            datasets: [{
                                label: "Disabled",
                                data: source1,
                                borderWidth: 2,
                                backgroundColor: "rgba(254,217,118, 0.1)",
                                borderColor: "rgba(254,217,118, 1)",
                                pointBackgroundColor: "rgba(225, 225, 225, 1)",
                                pointBorderColor: "rgba(254,217,118, 1)",
                                pointHoverBackgroundColor: "rgba(254,217,118, 1)",
                                pointHoverBorderColor: "#fff"
                            },
                            {
                                label: "Able-Bodied",
                                data: source2,
                                borderWidth: 2,
                                backgroundColor: "rgba(227,26,28, 0.1)",
                                borderColor: "rgba(227,26,28, 1)",
                                pointBackgroundColor: "rgba(225, 225, 225, 1)",
                                pointBorderColor: "rgba(227,26,28, 1)",
                                pointHoverBackgroundColor: "rgba(227,26,28, 1)",
                                pointHoverBorderColor: "#fff"
                            }]
                        }
                    };
                    chart = new Chart(ctx, config);
                }
            });
        });
    });
});
