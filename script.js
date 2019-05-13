
mapboxgl.accessToken = 'pk.eyJ1IjoiYm9nZHkiLCJhIjoiY2puMzl1Y2ljMjl2aDNrbzFtZzU2dzFsZyJ9.h5bdy1iAE_46JJHBl2sf-g';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/bogdy/cjud22znv0dwl1gns8eoxjo3w',
  center: [-2.50,  53.5000],
  zoom: 9.5

});


map.on('load', function() { 

// Another layer again shows the Ashton sation future development:
map.addLayer({         
  id: 'Ashton_Interchange',       
  type: 'fill',         
  source: {           
  type: 'vector',           
  url: 'mapbox://bogdy.8zrnzvq3'        
  },         
  'source-layer': 'Ashton_Interchange-1cm3x6',          
  'layout': {},         
  paint: {
    'fill-color': '#4CAF50',

    'fill-opacity': 0.4
  }
  });

// Another layer again shows the Carrington future development:
map.addLayer({         
  id: 'Carrington',       
  type: 'line',         
  source: {           
  type: 'vector',           
  url: 'mapbox://bogdy.awj7v110'        
  },         
  'source-layer': 'Carrington-8f1npt',          
  'layout': {},         
  paint: {
    'line-color': '#ff8000',
    'line-width': 3,

    // 'line-opacity': 0.9
  }
  });


// Another layer again shows the Metrolink future development:
map.addLayer({         
  id: 'Metrolink',       
  type: 'line',         
  source: {           
  type: 'vector',           
  url: 'mapbox://bogdy.bcr4bkkj'        
  },         
  'source-layer': 'Metrolink-b04itj',          
  'layout': {},         
  paint: {
    'line-color': '#8000ff',

    'line-opacity': 0.9
  }
  });

    // Another layer again shows the Rail future development:
    map.addLayer({         
      id: 'Rail',       
      type: 'line',         
      source: {           
      type: 'vector',           
      url: 'mapbox://bogdy.airn0xeu'        
      },         
      'source-layer': 'Rail-a64udg',          
      'layout': {},         
      paint: {
        'line-color': '#ff0000',
        'line-width': .5,
    
        'line-opacity': 0.9
      }
      });

// Another layer again shows the Ashton_Rail future development:
map.addLayer({         
  id: 'Ashton_Rail',       
  type: 'line',         
  source: {           
  type: 'vector',           
  url: 'mapbox://bogdy.5ccftljm'        
  },         
  'source-layer': 'Ashton_Rail-95a52d',          
  'layout': {},         
  paint: {
    'line-color': '#a65959',
    'line-width': 3,

    'line-opacity': 0.9
  }
  });

  // Another layer again shows the New_baley future development:
map.addLayer({         
  id: 'New_baley',       
  type: 'fill',         
  source: {           
  type: 'vector',           
  url: 'mapbox://bogdy.8140kx9w'        
  },         
  'source-layer': 'New_baley-cugb2j',          
  'layout': {},         
  paint: {
    'fill-color': '#D8A500',
    // 'fill-width': 2,

    'fill-opacity': 0.6
  }
  });

  // Another layer again shows the Train_stations future development:
  map.addLayer({         
    id: 'Train_station',       
    type: 'circle',         
    source: {           
    type: 'vector',           
    url: 'mapbox://bogdy.6350ohuc'        
    },         
    'source-layer': 'Train_stations-95b1bf',          
    'layout': {},         
    paint: {
      'circle-color': '#00ff00',
      'circle-radius': 3
      // 'circle-opacity': 0.9
    }
    });
  
  // Another layer again shows the Stock_Port_Interchange future development:
  map.addLayer({         
    id: 'Stock_Port_Interchange',       
    type: 'fill',         
    source: {           
    type: 'vector',           
    url: 'mapbox://bogdy.ckeat7hz'        
    },         
    'source-layer': 'Stock_Port_Interchange-6nw78m',          
    'layout': {},         
    paint: {
      'fill-color': '#00bfff',
      // 'circle-radius': 3
      'fill-opacity': 0.5
    }
    });

      // Another layer again shows the Train_stations future development:
  map.addLayer({         
    id: 'Stock_Port_Town_Access',       
    type: 'fill',         
    source: {           
    type: 'vector',           
    url: 'mapbox://bogdy.3dtnnw13'        
    },         
    'source-layer': 'Stock_Port_Town_Access_Plan-bxyz39',          
    'layout': {},         
    paint: {
      'fill-color': '#ff8000',
      // 'circle-radius': 3
      'fill-opacity': 0.5
    }
    });
  
// Popup features on click
    map.on('click', 'Rail', function (e) {
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.name)
      .addTo(map);
      });
    map.on('mouseenter', 'Rail', function () {
      map.getCanvas().style.cursor = 'pointer';
      });
    map.on('mouseleave', 'Rail', function () {
      map.getCanvas().style.cursor = '';
      mypopup.remove();
      });

      

      map.on('click', 'Metrolink', function (e) {     
        new mapboxgl.Popup(
          // offset:[150,50],
          // closeButton: true
        )      
        .setLngLat(e.lngLat)      
        .setHTML(
          // e.features[0].properties.Descritpti + 
        // e.features[0].properties.Rational + 
        e.features[0].properties.name)      
        .addTo(map);    
        });
        map.on('mouseenter', 'Metrolink', function () {      
          map.getCanvas().style.cursor = 'pointer';   
          }); 
          map.on('mouseleave', 'Metrolink', function () {    
            map.getCanvas().style.cursor = '';    
            mypopup.remove();
            }); 
      

            
            map.on('click', 'Carrington', function (e) {
              new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                "<h3>" + e.features[0].properties.name 
                + "</h3> " + e.features[0].properties.ration 
                + "<br/> " + e.features[0].properties.Decript 
                + "<br/> "+ "<img src = 'https://www.futurecarrington.com/wp-content/uploads/2016/02/Future-Carrington-Draft-Phase-One-Masterplan_LR-768x616.jpg' width=500>"
                + "<br/> "+ "<iframe src='https://player.vimeo.com/video/301024280' frameborder=0 allowfullscreen=allowfullscreen id=fitvid573283 width=500></iframe>"

                //  e.features[0].properties.Descritpti + "m<br />2010: " 
              )
              .addTo(map);
              });
            map.on('mouseenter', 'Carrington', function () {
              map.getCanvas().style.cursor = 'pointer';
              });
            map.on('mouseleave', 'Carrington', function () {
              map.getCanvas().style.cursor = '';
              mypopup.remove();
              });



              map.on('click', 'Ashton_Interchange', function (e) {
                new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                  "<h3>" + e.features[0].properties.name 
                  + "<br/> "+  "<embed src='https://assets.ctfassets.net/nv7y93idf4jq/33sLnXk4KIA8QY6IWcoAa4/8105cbc9c0c2aaf54d712d2d00a2879a/Tameside_Interchange_Consultation_Report.pdf' width=500 height=500 type='application/pdf'>"
  
                  //  e.features[0].properties.Descritpti + "m<br />2010: " 
                  )
                .addTo(map);
                });
              map.on('mouseenter', 'Ashton_Interchange', function () {
                map.getCanvas().style.cursor = 'pointer';
                });
              map.on('mouseleave', 'Ashton_Interchange', function () {
                map.getCanvas().style.cursor = '';
                mypopup.remove();
                });


                map.on('click', 'New_baley', function (e) {
                  new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(
                    "<h3>" + e.features[0].properties.name 
                    + "<br/> "+  "<embed src='http://www.new-bailey.com/brochure/files/assets/common/downloads/New%20Bailey%20Brochure.pdf' width=500 height=500 type='application/pdf'>"
    
                    //  e.features[0].properties.Descritpti + "m<br />2010: " 
     )
                  .addTo(map);
                  });
                map.on('mouseenter', 'New_baley', function () {
                  map.getCanvas().style.cursor = 'pointer';
                  });
                map.on('mouseleave', 'New_baley', function () {
                  map.getCanvas().style.cursor = '';
                  mypopup.remove();
                  });



                  map.on('click', 'Stock_Port_Interchange', function (e) {
                    new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(
                      "<h3>" + e.features[0].properties.name 
                      + "<br/> "+  "<embed src='https://www.stockportchangehere.org/a-transport-renaissance-in-stockport' width=500 height=500>"
      
                      //  e.features[0].properties.Descritpti + "m<br />2010: " 
       )
                    .addTo(map);
                    });
                  map.on('mouseenter', 'Stock_Port_Interchange', function () {
                    map.getCanvas().style.cursor = 'pointer';
                    });
                  map.on('mouseleave', 'Stock_Port_Interchange', function () {
                    map.getCanvas().style.cursor = '';
                    mypopup.remove();
                    });

document.getElementById('interventions_2040').addEventListener('click', function(){
  map.flyTo(
    intervention_area
  )
})
});





// PART 2.
// Graph creation from json url address

// An empty array is created to host the extracted values
// var arr = [];

// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

// //The function is called back with the json url
// readTextFile("https://opendata.camden.gov.uk/resource/ue2p-evqd.json", 
// function(text){
//     var data = JSON.parse(text);

// ///////////////////////////////



// // Looping through the data and selecting the interested arrays
// for (var i = 0; i < 100; i++) {
// var x = data[i].tariff;
// x_replace = x.replace(/[^0-9\.]+/g, "");
// var x_float = parseFloat(x_replace);

// var y = data[i].parking_spaces;
// var y_integer = parseInt( y, 10);
// var y_number = y_integer || 0 

// var z = data[i].maximum_stay;

// // After some other cleaning, the "parking_data" is pushed into the empty array 
// arr.push(y);

// //The histogram graph uses the array to plot the distribution of parking capacity accross the Camden Borough
// var trace = 
// {
// x: arr,
// type:'histogram',

// };

// var dataj = [trace];
// var layout={
// title:'Distribution of parking capacity - Sample 100',
// font: {size: 18}
// }

// Plotly.newPlot('graph', dataj, layout);

// }
// });

// Interventions 

var interventions = {
  'Intro': {
    
    center: [-2.53,  53.5000],
    zoom: 9
    },
  'Rail': {
    
    center: [-2.23,  53.5000],
    zoom: 10
    },

  'Ashton_Interchange': {
  center: [ -2.097654, 53.489930],
  zoom: 15.5,
  pitch: 20
  },

  'Carrington': {
  duration: 6000,
  center: [ -2.397245, 53.426146],
  zoom: 13,
  pitch: 0
  },

  'Metrolink': {
  center: [-2.23,  53.5000],
  zoom: 10,
  speed: 0.6,
  pitch: 40
  },
  'Mill_Hill_Rail': {
  
  center: [ -2.171389, 53.550832],
  zoom: 15,
  pitch: 20,
  speed: 0.5
  },
  'New_baley': {
  center: [-2.255310, 53.482080],
  zoom: 15
  },
  'Stock_Port_Interchange': {
  center: [-2.163439, 53.408554],
  zoom: 16,
  pitch: 20
  },
  'Stock_Port_Town_Access': {
    
    center: [-2.161016, 53.411954],
    zoom: 12,
    pitch: 20
    }
  };
 
// On every scroll event, check which element is on screen
window.onscroll = function() {
var chapterNames = Object.keys( interventions);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};
 
var activeChapterName = 'Intro';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
map.flyTo(interventions[chapterName]);
 
document.getElementById(chapterName).setAttribute('class', 'active');
document.getElementById(activeChapterName).setAttribute('class', '');
 
activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}

; 
