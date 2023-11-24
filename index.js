// const building_marker_url = 'https://cdn.icon-icons.com/icons2/1258/PNG/512/1495574608-map-location-solid-style-24_84561.png';
// const building_marker_url = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Office_building_icon.png';
// const building_marker_url = 'https://static.thenounproject.com/png/17374-200.png';
// const building_marker_url = 'https://cdn-icons-png.flaticon.com/512/1046/1046438.png';
// last one should be 64x64
// const building_marker_url = 'https://static.vecteezy.com/system/resources/previews/010/871/094/original/3d-isometric-office-free-png.png';

let SELECTED_POLYLINE_ORIGINAL_COLOR = null;

const markersArray = [];
let currentLine = null;
const lines = [];

const logLinesBtn = document.querySelector('button#log-lines');

const drawingModeCheckbox = document.querySelector(
  'input#drawing-mode-checkbox'
);
const startNewLineBtn = document.querySelector('button#start-line-btn');
const colorPicker = document.querySelector('input[type="color"]');

let SELECTED_COLOR = colorPicker.value;

colorPicker.addEventListener('change', () => {
  console.log(colorPicker.value);
  SELECTED_COLOR = colorPicker.value;
});

// drawingModeCheckbox.addEventListener('change', () => {
//   if (drawingModeCheckbox.checked) {
//   }
// });

startNewLineBtn.addEventListener('click', () => {
  currentLine = null;
});

let selectedPolyline = null;
// ----------------------------------------------------------------------->
const deleteLineBtn = document.querySelector('button#delete-line');
const dialog = document.querySelector('dialog');
const yesButton = dialog.querySelector('div > span:first-child');
const noButton = dialog.querySelector('div > span:last-child');

// console.log(yesButton);
// ----------------------------------------------------------------------->

function initMap() {
  const myStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];

  const plovdivLatLng = {
    lat: 42.1354,
    lng: 24.7453,
  };

  const options = {
    center: plovdivLatLng,
    // zoom: 2.4,
    zoom: 5,
    styles: myStyles,
  };

  const map = new google.maps.Map(
    document.querySelector('section#map'),
    options
  );

  // ---------------------23-11-23-drawing-lines----------------------------
  const lineCoordinates = [];

  // Add click event listener to the map
  google.maps.event.addListener(map, 'click', function (event) {
    console.log(event);

    if (!drawingModeCheckbox.checked) return;
    // Add clicked point to the array
    console.log(
      `%cLat: ${event.latLng.lat()}`,
      'background: black; color: white'
    );
    console.log(
      `%cLng: ${event.latLng.lng()}`,
      'background: green; color: black'
    );

    if (!currentLine || currentLine.getPath().getLength() === 0) {
      currentLine = new google.maps.Polyline({
        path: [],
        geodesic: true,
        // strokeColor: '#FF0000',
        strokeColor: SELECTED_COLOR,
        strokeOpacity: 1.0,
        strokeWeight: 10,
      });

      // --------------------------------------------------------------------------------
      // google.maps.event.addListener(currentLine, 'click', function (event) {
      // The event parameter contains information about the click event
      // console.log('Polyline clicked!', event);

      // console.log(event);

      // if (selectedPolyline) {
      //   selectedPolyline.setOptions({ strokeWeight: 2 });
      // }

      // Select the clicked polyline
      // selectedPolyline = currentLine;
      // selectedPolyline.setOptions({ strokeWeight: 5 });

      // Delete the selected polyline from the map
      // deleteSelectedPolyline(currentLine);
      // });

      function deleteSelectedPolyline(cl) {
        cl.setMap(null);
      }
      // --------------------------------------------------------------------------------
      lines.push(currentLine);
      currentLine.addListener('click', function () {
        // console.log(`Polyline ${lines.indexOf(lines[lines])} clicked!`);
        // console.log(this)

        if(selectedPolyline) {
          selectedPolyline.setOptions({strokeColor: SELECTED_POLYLINE_ORIGINAL_COLOR});
        }

        selectedPolyline = this;
        document.body.classList.add('selected-line');
        // this.setMap(null);
        // currentLine = null;
        // lines.splice(lines.indexOf(this), 1);

        SELECTED_POLYLINE_ORIGINAL_COLOR = this.get('strokeColor');

        this.setOptions({ strokeColor: 'white' });

        deleteLineBtn.scrollIntoView();
      });
      currentLine.setMap(map);
    }

    // Add clicked point to the current line
    currentLine.getPath().push(event.latLng);
  });

  // ---------------------23-11-23-drawing-lines----------------------------

  // map.data.loadGeoJson(googleGeoJSON);
  // map.data.addGeoJson(CSKAGeoJSON);
  // map.data.addGeoJson(googleGeoJSON);
  // map.data.addGeoJson(transformersGeoJSONAfrica);
  // map.data.addGeoJson(simpleRectangle);

  // map.data.setStyle(function(feature) {
  //   const color = feature.getProperty('color'); // Replace 'yourProperty' with the actual property name
  //   const icon = feature.getProperty('icon');

  //   const returnedObject = {
  //     fillColor: color ? color : 'red',
  //     fillOpacity: 0.3,
  //     strokeColor: 'darkblue',
  //     strokeWeight: 1,
  //   };

  //   if(icon) {
  //     returnedObject.icon = {
  //         url: building_marker_url, // Specify the path to your custom marker image
  //         scaledSize: new google.maps.Size(64, 64), // Adjust the size of the custom marker
  //     }
  //   }

  //   return returnedObject;
  // });

  //   const flightPlanCoordinates = [
  //     { lat: 37.772, lng: -122.214 },
  //     { lat: 21.291, lng: -157.821 },
  //     { lat: -18.142, lng: 178.431 },
  //     { lat: -27.467, lng: 153.027 },
  //   ];
  //   const flightPath = new google.maps.Polyline({
  //     path: flightPlanCoordinates,
  //     geodesic: true,
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2,
  //   });

  //   var lineSymbol = {
  //     path: 'M 0,-1 0,1',
  //     strokeOpacity: 1,
  //     scale: 2
  // };

  //   const exampleLine = new google.maps.Polyline({
  //     path: [
  //       { lat: 0, lng: 20 },
  //       { lat: 5, lng: 15 },
  //       { lat: 20.111111, lng: 30 },
  //       { lat: 5, lng: 45 },
  //       { lat: 0, lng: 40 },
  //       { lat: 0, lng: 20 },
  //       { lat: 20.111111, lng: 30 },
  //       { lat: 0, lng: 40 },
  //     ],
  //     icons: [{
  //       icon: lineSymbol,
  //       offset: '0',
  //       repeat: '15px' // Adjust the distance between dots as needed
  //     }],
  //     geodesic: true,
  //     strokeColor: "red",
  //     strokeOpacity: 0,
  //     strokeWeight: 0.3,
  //   });

  // const numPoints = 5000;

  // const lineCoordinates = [];
  // for (let i = 0; i <= numPoints; i++) {
  //     const fraction = i / numPoints;
  //     const curvedPoint = google.maps.geometry.spherical.interpolate({ lat: 47, lng: -120 }, { lat: 47, lng: -125 }, fraction);
  //     lineCoordinates.push(curvedPoint);
  // }
  // ----------------------------------------------------------------------------->
  // const anotherExampleLine = new google.maps.Polyline({
  //   path: [
  //     { lat: 47, lng: -120 }, { lat: 42, lng: -115 }, { lat: 37, lng: -105 },{ lat: 26, lng: -97 }
  //   ],
  //   geodesic: true,
  //   strokeColor: "blue", // Set the line color to blue
  //   strokeOpacity: 0.7,
  //   strokeWeight: 15, // Set the line thickness
  // });

  // anotherExampleLine.setOptions({
  //   icons: [{
  //     icon: {
  //       path: google.maps.SymbolPath.CIRCLE,
  //       // fillColor: 'blue',
  //       // fillOpacity: 1,
  //       scale: 1,
  //       strokeColor: 'black',
  //       strokeOpacity: 1,
  //       strokeWeight: 1
  //     },
  //     offset: '0%',
  //     repeat: '10px'
  //   }]
  // });
  // ----------------------------------------------------------------------------->
  // const opticLine = new google.maps.Polyline({
  //   path: [
  //     {
  //       lng: 39.662587054809194,
  //       lat: 53.93187337324531
  //     },
  //     {

  //       lng:41.865997207526846,
  //       lat:54.708051142103415
  //     }
  //     ,
  //     {

  //       lng:45.78516915049511,
  //       lat:54.090681792613594
  //     }
  //     ,
  //     {

  //       lng:45.85635109344042,
  //       lat:52.28610050379035
  //     }
  //     ,
  //     {

  //       lng:40.382883313845696,
  //       lat:51.81938433327403
  //     }
  //     ,
  //     {

  //       lng:39.006834048960826,
  //       lat:49.43857626435596
  //     }
  //     ,
  //     {

  //       lng:42.1591544155815,
  //       lat:49.20035039903573
  //     }
  //     ,
  //     {

  //       lng:46.364409670864745,
  //       lat:48.326084156308895
  //     }
  //     ,
  //     {

  //       lng:47.99888428439158,
  //       lat:49.079028772620774
  //     }
  //     ,
  //     {

  //       lng:51.825698135758074,
  //       lat:48.81088214395484
  //     }
  //     ,
  //     {

  //       lng:54.155575546524545,
  //       lat:49.50387995148182
  //     }
  //     ,
  //     {

  //       lng:47.78042532456743,
  //       lat:50.55469189740029
  //     }
  //     ,
  //     {

  //       lng:42.732009010445154,
  //       lat:50.58434780631552
  //     }
  //   ],
  //   geodesic: true,
  //   strokeColor: "red", // Set the line color to blue
  //   strokeOpacity: 0.8,
  //   strokeWeight: 15, // Set the line thickness
  // });

  // opticLine.setOptions({
  //   icons: [{
  //     icon: {
  //       path: google.maps.SymbolPath.CIRCLE,
  //       // fillColor: 'blue',
  //       // fillOpacity: 1,
  //       scale: 1,
  //       strokeColor: 'yellow',
  //       strokeOpacity: 1,
  //       strokeWeight: 5
  //     },
  //     offset: '0%',
  //     repeat: '10px'
  //   }]
  // });
  // ----------------------------------------------------------------------------->

  // flightPath.setMap(map);
  // exampleLine.setMap(map);
  // anotherExampleLine.setMap(map);
  // opticLine.setMap(map);

  //   map.data.setStyle({
  //     fillColor: 'red',
  //   });
  //   map.data.addGeoJson(googleGeoJSON);
  //   map.data.addGeoJson(exampleGeoJSON);
  // map.data.setStyle(function (feature) {
  //   const color = feature.getProperty('color');
  //   console.log(color);
  //   return {
  //     fillColor: color,
  //     strokeWeight: 1,
  //   };
  // });

  // -------------------24.11.23-modal-delete-----------------

  deleteLineBtn.addEventListener('click', () => {
    dialog.show();
    document.body.classList.add('modal-opened');
  });

  yesButton.addEventListener('click', () => {
    selectedPolyline.setMap(null);
    currentLine = null;
    lines.splice(lines.indexOf(selectedPolyline), 1);
    document.body.classList.remove('selected-line');
    document.body.classList.remove('modal-opened');
    dialog.close();
    SELECTED_POLYLINE_ORIGINAL_COLOR = null;
    selectedPolyline = null;
  });
  
  noButton.addEventListener('click', () => {
    document.body.classList.remove('selected-line');
    document.body.classList.remove('modal-opened');
    dialog.close();
    console.log(SELECTED_POLYLINE_ORIGINAL_COLOR)
    selectedPolyline.setOptions({strokeColor: SELECTED_POLYLINE_ORIGINAL_COLOR});
    SELECTED_POLYLINE_ORIGINAL_COLOR = null;
    selectedPolyline = null;
  });



  // -------------------24.11.23-modal-delete-----------------

  logLinesBtn.addEventListener('click', () => {
    console.clear();

    lines.forEach((line, lineIndex) => {
      const backgroundColor = line.get('strokeColor');

      console.log(
        `%cLine: ${lineIndex + 1}`,
        `color: #fff; background-color: ${backgroundColor}; font-size: 2rem; font-weight: bold;`
      );
      line.getPath().forEach((point, pointIndex) => {
        console.log(
          `%cPoint: ${pointIndex + 1}:`,
          'text-align: center; border-radius: 1rem; background-color: #333; padding: 1rem; color: #fff;'
        );
        console.log('Lat:', point.lat());
        console.log('Lng', point.lng());
      });
    });

    if (logLinesBtn.textContent === 'Show points') {
      logLinesBtn.textContent = 'Hide points';
      getPointsOnMap(map);
      return;
    }

    logLinesBtn.textContent = 'Show points';
    hidePoints();
  });
}

// ---Init map ending----

// ------------------------------------------------------------------->
// const googleGeoJSON = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'G',
//         color: 'blue',
//         rank: '7',
//         ascii: '71',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [123.61, -22.14],
//             [122.38, -21.73],
//             [121.06, -21.69],
//             [119.66, -22.22],
//             [119.0, -23.4],
//             [118.65, -24.76],
//             [118.43, -26.07],
//             [118.78, -27.56],
//             [119.22, -28.57],
//             [120.23, -29.49],
//             [121.77, -29.87],
//             [123.57, -29.64],
//             [124.45, -29.03],
//             [124.71, -27.95],
//             [124.8, -26.7],
//             [124.8, -25.6],
//             [123.61, -25.64],
//             [122.56, -25.64],
//             [121.72, -25.72],
//             [121.81, -26.62],
//             [121.86, -26.98],
//             [122.6, -26.9],
//             [123.57, -27.05],
//             [123.57, -27.68],
//             [123.35, -28.18],
//             [122.51, -28.38],
//             [121.77, -28.26],
//             [121.02, -27.91],
//             [120.49, -27.21],
//             [120.14, -26.5],
//             [120.1, -25.64],
//             [120.27, -24.52],
//             [120.67, -23.68],
//             [121.72, -23.32],
//             [122.43, -23.48],
//             [123.04, -24.04],
//             [124.54, -24.28],
//             [124.58, -23.2],
//             [123.61, -22.14],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'o',
//         color: 'red',
//         rank: '15',
//         ascii: '111',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [128.84, -25.76],
//             [128.18, -25.6],
//             [127.96, -25.52],
//             [127.88, -25.52],
//             [127.7, -25.6],
//             [127.26, -25.79],
//             [126.6, -26.11],
//             [126.16, -26.78],
//             [126.12, -27.68],
//             [126.21, -28.42],
//             [126.69, -29.49],
//             [127.74, -29.8],
//             [128.8, -29.72],
//             [129.41, -29.03],
//             [129.72, -27.95],
//             [129.68, -27.21],
//             [129.33, -26.23],
//             [128.84, -25.76],
//           ],
//           [
//             [128.45, -27.44],
//             [128.32, -26.94],
//             [127.7, -26.82],
//             [127.35, -27.05],
//             [127.17, -27.8],
//             [127.57, -28.22],
//             [128.1, -28.42],
//             [128.49, -27.8],
//             [128.45, -27.44],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'o',
//         color: 'yellow',
//         rank: '15',
//         ascii: '111',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [131.87, -25.76],
//             [131.35, -26.07],
//             [130.95, -26.78],
//             [130.82, -27.64],
//             [130.86, -28.53],
//             [131.26, -29.22],
//             [131.92, -29.76],
//             [132.45, -29.87],
//             [133.06, -29.76],
//             [133.72, -29.34],
//             [134.07, -28.8],
//             [134.2, -27.91],
//             [134.07, -27.21],
//             [133.81, -26.31],
//             [133.37, -25.83],
//             [132.71, -25.64],
//             [131.87, -25.76],
//           ],
//           [
//             [133.15, -27.17],
//             [132.71, -26.86],
//             [132.09, -26.9],
//             [131.74, -27.56],
//             [131.79, -28.26],
//             [132.36, -28.45],
//             [132.93, -28.34],
//             [133.15, -27.76],
//             [133.15, -27.17],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'g',
//         color: 'blue',
//         rank: '7',
//         ascii: '103',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [138.12, -25.04],
//             [136.84, -25.16],
//             [135.96, -25.36],
//             [135.26, -25.99],
//             [135, -26.9],
//             [135.04, -27.91],
//             [135.26, -28.88],
//             [136.05, -29.45],
//             [137.02, -29.49],
//             [137.81, -29.49],
//             [137.94, -29.99],
//             [137.9, -31.2],
//             [137.85, -32.24],
//             [136.88, -32.69],
//             [136.45, -32.36],
//             [136.27, -31.8],
//             [134.95, -31.84],
//             [135.17, -32.99],
//             [135.52, -33.43],
//             [136.14, -33.76],
//             [137.06, -33.83],
//             [138.12, -33.65],
//             [138.86, -33.21],
//             [139.3, -32.28],
//             [139.3, -31.24],
//             [139.3, -30.14],
//             [139.21, -28.96],
//             [139.17, -28.22],
//             [139.08, -27.41],
//             [139.08, -26.47],
//             [138.99, -25.4],
//             [138.73, -25.0],
//             [138.12, -25.04],
//           ],
//           [
//             [137.5, -26.54],
//             [136.97, -26.47],
//             [136.49, -26.58],
//             [136.31, -27.13],
//             [136.31, -27.72],
//             [136.58, -27.99],
//             [137.5, -28.03],
//             [137.68, -27.68],
//             [137.59, -26.78],
//             [137.5, -26.54],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'l',
//         color: 'green',
//         rank: '12',
//         ascii: '108',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [140.14, -21.04],
//             [140.31, -29.42],
//             [141.67, -29.49],
//             [141.59, -20.92],
//             [140.14, -21.04],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         letter: 'e',
//         color: 'red',
//         rank: '5',
//         ascii: '101',
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [144.14, -27.41],
//             [145.67, -27.52],
//             [146.86, -27.09],
//             [146.82, -25.64],
//             [146.25, -25.04],
//             [145.45, -24.68],
//             [144.66, -24.6],
//             [144.09, -24.76],
//             [143.43, -25.08],
//             [142.99, -25.4],
//             [142.64, -26.03],
//             [142.64, -27.05],
//             [142.64, -28.26],
//             [143.3, -29.11],
//             [144.18, -29.57],
//             [145.41, -29.64],
//             [146.46, -29.19],
//             [146.64, -28.72],
//             [146.82, -28.14],
//             [144.84, -28.42],
//             [144.31, -28.26],
//             [144.14, -27.41],
//           ],
//           [
//             [144.18, -26.39],
//             [144.53, -26.58],
//             [145.19, -26.62],
//             [145.72, -26.35],
//             [145.81, -25.91],
//             [145.41, -25.68],
//             [144.97, -25.68],
//             [144.49, -25.64],
//             [144, -25.99],
//             [144.18, -26.39],
//           ],
//         ],
//       },
//     },
//   ],
// };

// const exampleGeoJSON = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [-66.0757686495808798, 18.4499537362477994],
//             [-66.0758142471334082, 18.4498888554426905],
//             [-66.0758692324173325, 18.4499219319315699],
//             [-66.0758263170737763, 18.4499868127366753],
//             [-66.0757686495808798, 18.4499537362477994],
//           ],
//         ],
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         type: 'Point',
//         coordinates: [-66.0758182704468595, 18.4499359258307116],
//       },
//     },
//   ],
// };

// const CSKAGeoJSON = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {
//         color: 'red',
//       },
//       geometry: {
//         coordinates: [
//           [
//             [24.06251320135962, 43.12174369963097],
//             [23.061365590523422, 43.10912768477229],
//             [23.133613713395732, 42.00382011953084],
//             [24.15343471538054, 42.011793530927434],
//             [24.147698677912956, 42.167901027210576],
//             [23.364273303403365, 42.15986644752351],
//             [23.302550611602726, 42.970847183660055],
//             [24.107106622891223, 42.96667100572449],
//             [24.056647849691387, 43.130158562177485],
//             [24.06251320135962, 43.12174369963097],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         color: 'red',
//       },
//       geometry: {
//         coordinates: [
//           [
//             [25.069888008218413, 43.15121038213633],
//             [24.355430186678007, 43.1385767755327],
//             [24.355004762937256, 42.96667100572449],
//             [24.388755639320976, 42.56139479282288],
//             [25.1391009152548, 42.57778334210735],
//             [25.151521861977898, 42.22423147501263],
//             [24.490096515636935, 42.21617478637566],
//             [24.4879366003467, 42.09169961287273],
//             [25.409379095843036, 42.092587025445624],
//             [25.38279614796909, 42.690091021964065],
//             [24.6781633171135, 42.690091021964065],
//             [24.654574583104335, 43.005876028875434],
//             [25.322186061022705, 43.022628596568524],
//             [25.333077076766585, 43.1444841297527],
//             [25.089263618705473, 43.1402704962195],
//             [25.069888008218413, 43.15121038213633],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         color: 'red',
//       },
//       geometry: {
//         coordinates: [
//           [
//             [25.776605899553658, 43.15713006652578],
//             [25.78900132876791, 42.03258236512835],
//             [25.96532577058042, 42.02459505723962],
//             [25.946017797213813, 42.427825530459586],
//             [26.178820444744503, 42.423753852127106],
//             [26.45282969445529, 42.05256432808358],
//             [26.68293463366055, 42.05256432808358],
//             [26.188299932141547, 42.57904346197796],
//             [26.767539352536573, 43.123424349903786],
//             [26.490920943620637, 43.131845745934015],
//             [25.950566423016227, 42.6736021047752],
//             [25.94832476783546, 43.14869860250241],
//             [25.793069375155284, 43.1444841297527],
//             [25.776605899553658, 43.15713006652578],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         color: 'red',
//       },
//       geometry: {
//         coordinates: [
//           [
//             [27.053914387271845, 42.08457620998246],
//             [26.823006923108437, 42.07256587306816],
//             [26.794341907970846, 42.50125314946581],
//             [27.287888923297885, 43.11921490918985],
//             [27.56388929079779, 43.10659161364512],
//             [27.578883152790667, 42.08457620998246],
//             [27.465576066348547, 42.07256587306816],
//             [27.409455446972487, 42.525787004041916],
//             [26.979148345259034, 42.50534010867267],
//             [27.026915839447582, 42.08057197971044],
//             [27.053914387271845, 42.08457620998246],
//           ],
//           [
//             [27.094762373058046, 42.63243682966157],
//             [27.3889160460171, 42.968231405941225],
//             [27.412603780330215, 42.65712622700033],
//             [27.08385800112768, 42.63243682966157],
//             [27.094762373058046, 42.63243682966157],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//   ],
// };

// const transformersGeoJSONAfrica = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [0, 0],
//             [20, 0],
//             [20, 20],
//             [0, 20],
//             [0, 0],
//           ],
//           [
//             [5, 5],
//             [10, 2],
//             [15, 5],
//             [15, 15],
//             [10, 18],
//             [5, 15],
//             [5, 5],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         icon: true
//       },
//       geometry: {
//         coordinates: [
//          10, 10
//           // [
//           //   [5, 5],
//           //   [10, 2],
//           //   [15, 5],
//           //   [15, 15],
//           //   [10, 18],
//           //   [5, 15],
//           //   [5, 5],
//           // ],
//         ],
//         type: 'Point',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//       },
//       geometry: {
//         coordinates: [
//          10, 15
//           // [
//           //   [5, 5],
//           //   [10, 2],
//           //   [15, 5],
//           //   [15, 15],
//           //   [10, 18],
//           //   [5, 15],
//           //   [5, 5],
//           // ],
//         ],
//         type: 'Point',
//       },
//     },
//   ],
// };

// const simpleRectangle = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [30, 30],
//             [34, 30],
//             [34, 34],
//             [30, 34],
//             [30, 30],
//           ]
//         ],
//         type: 'Polygon',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//         icon: true,
//       },
//       geometry: {
//         coordinates: [
//          32, 32
//         ],
//         type: 'Point',
//       },
//     },
//     {
//       type: 'Feature',
//       properties: {
//       },
//       geometry: {
//         coordinates: [
//          32, 33
//         ],
//         type: 'Point',
//       },
//     }
//   ],
// };

function addMarker(map, lat, lng, index, color) {
  // Create a custom SVG path for the marker icon
  //  const strokeColor = color === '#000000' ? 'white' : 'black';
  const strokeColor = 'black';
  console.log(strokeColor);
  const svgPath = `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${strokeColor}" stroke-width="2" width="48px" height="48px">
       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
   </svg>
`;

  const newMarker = new google.maps.Marker({
    position: {
      lat,
      lng,
    },
    map,
    title: `${index + 1}`,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPath),
    },
  });

  markersArray.push(newMarker);
}

function getPointsOnMap(map) {
  lines.forEach((line) => {
    const backgroundColor = line.get('strokeColor');

    line.getPath().forEach((point, pointIndex) => {
      addMarker(map, point.lat(), point.lng(), pointIndex, backgroundColor);
    });
  });
}

function hidePoints() {
  markersArray.forEach((marker) => marker.setMap(null));
}
