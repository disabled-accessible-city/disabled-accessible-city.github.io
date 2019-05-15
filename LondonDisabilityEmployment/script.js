$(document).ready(function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bnNyaW5pIiwiYSI6ImNqcXA2M2hhZDBsMW80M252bDBsbTQ4Zm8ifQ.mFW4JBmqjzluJeiNcnBU9Q';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/arunsrini/cjvdoubsh06yh1fmazxvhpaz8',
        center: [-0.070, 51.517],
        zoom: 9.41
    });

    var mainData = $.getJSON('data.json', function(jsonData) {

        var years = [];
        jsonData.data.forEach(function(row) {
            years.push(row.Year);
        });

        years = $.unique(years).sort();

        console.log(years);

        var yearsObject = {};

        var minYear = years.shift();
        var maxYear = years.pop();

        var calculateExpression = function() {

            var year = $('#year-slider')[0].noUiSlider.get();

            var modifiedData = $.grep(jsonData.data, function(row) {
                return row.Year == year;
            });

            var field = $("input[name='inlineRadioOptions']:checked").val();

            var layers = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'];
            var colors = ['#cbdce7', '#a8c5d7', '#85aec7', '#6297b6', '#497d9d', '#38617a', '#284657', '#182a34', '#080e11', '#000'];

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

        // Slider
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
                    'line-color': '#88b0c8',
                    'line-width': 4
                },
                filter: ['==', 'NAME', 'empty']
            });

            map.on('mousemove', function(e) {
                var la = map.queryRenderedFeatures(e.point, {
                    layers: ['LocalBoroughs']
                });

                if (la.length == 1) {
                    map.setFilter('lahighlight', ['==', 'NAME', la[0].properties.NAME]);
                    $('#location-name').html(la[0].properties.NAME);
                    $('#location-code').html(la[0].properties.GSS_CODE);

                } else {
                    map.setFilter('lahighlight', ['==', 'NAME', 'null']);
                }
            });
        });

        var jsonfile = {
           "jsonarray": [{
           "name": "Joe",
           "age": 12
           }, {
           "name": "Tom",
           "age": 14
           }]
        };

        var labels = jsonfile.jsonarray.map(function(e) {
           return e.name;
        });
        var data = jsonfile.jsonarray.map(function(e) {
           return e.age;
        });;

        var ctx = canvas.getContext('2d');
        var config = {
           type: 'line',
           data: {
           labels: labels,
           datasets: [{
              label: 'Graph Line',
              data: data,
              backgroundColor: '#88b0c8'
           }]
           }
        };
        var chart = new Chart(ctx, config);
    });
});