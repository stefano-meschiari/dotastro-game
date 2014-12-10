

// $(function () {
//     $(document).ready(function () {
//         Highcharts.setOptions({
//             global: {
//                 useUTC: false
//             }
//         });
// 
//         $('#top-right').highcharts({
//             chart: {
//                 type: 'spline',
//                 animation: Highcharts.svg, // don't animate in old IE
//                 marginRight: 10,
//                 events: {
//                     load: function () {
// 
//                         // set up the updating of the chart each second
//                         var series = this.series[0];
//                         setInterval(function () {
//                             var x = (new Date()).getTime(), // current time
//                                 y = Math.random();
//                             series.addPoint([x, y], true, true);
//                         }, 1000);
//                     }
//                 }
//             },
//             title: {
//                 text: 'Live random data'
//             },
//             xAxis: {
//                 type: 'datetime',
//                 tickPixelInterval: 150
//             },
//             yAxis: {
//                 title: {
//                     text: 'Value'
//                 },
//                 plotLines: [{
//                     value: 0,
//                     width: 1,
//                     color: '#808080'
//                 }]
//             },
//             tooltip: {
//                 formatter: function () {
//                     return '<b>' + this.series.name + '</b><br/>' +
//                         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
//                         Highcharts.numberFormat(this.y, 2);
//                 }
//             },
//             legend: {
//                 enabled: false
//             },
//             exporting: {
//                 enabled: false
//             },
//             series: [{
//                 name: 'Random data',
//                 data: (function () {
//                     // generate an array of random data
//                     var data = [],
//                         time = (new Date()).getTime(),
//                         i;
// 
//                     for (i = -19; i <= 0; i += 1) {
//                         data.push({
//                             x: time + i * 1000,
//                             y: Math.random()
//                         });
//                     }
//                     return data;
//                 }())
//             }]
//         });
//     });
// });

$(function() {
    $(document).ready(function() {
        $("#top-right").highcharts({
            title: {
                text: 'Stellar brightness'
            },
            chart: {
                animation:false
            },
            xAxis: {
                title: { text: 'Time' }
            },
            yAxis: {
                title: {
                    text: 'Brightness'
                },
                labels: {
                    enabled:false
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            series:  [
                {
                    animation:false,
                    name: 'Brightness',
                    type: 'line',
                    marker: {
                        enabled:false
                    }
                }
                
            ],
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },

            tooltip: {
                enabled: false
            }
        });
    });
});

function addData(x, y, which) {
    var p = $(which).highcharts();
    p.series[0].addPoint([x, y], true, p.series[0].data.length > 250, false);
}

function resetData() {
}

/*
 $(function () {
 $(document).ready(function () {
 Highcharts.setOptions({
 global: {
 useUTC: false
 }
 });

 $('#top-left').highcharts({
 chart: {
 type: 'spline',
 animation: Highcharts.svg, // don't animate in old IE
 marginRight: 10,
 events: {
 load: function () {

 // set up the updating of the chart each second
 var series = this.series[0];
 var series2 = this.series[1];
 setInterval(function () {
 var x = (new Date()).getTime(), // current time
 y = Math.random();
 var x2 = (new Date()).getTime(), // current time
 y2 = Math.random()-10;                           
 series.addPoint([x, y], false, true);
 series2.addPoint([x2, y2], true, true);
 }, 1000);
 }
 }
 },
 title: {
 text: 'Live random data'
 },
 xAxis: {
 type: 'datetime',
 tickPixelInterval: 150
 },
 yAxis: {
 title: {
 text: 'Value'
 },
 plotLines: [{
 value: 0,
 width: 1,
 color: '#808080'
 }]
 },
 tooltip: {
 formatter: function () {
 return '<b>' + this.series.name + '</b><br/>' +
 Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
 Highcharts.numberFormat(this.y, 2);
 }
 },
 legend: {
 enabled: false
 },
 exporting: {
 enabled: false
 },
 series: [
 {
 name: 'Random data 2',
 data: (function () {
 // generate an array of random data
 var data = [],
 time = (new Date()).getTime(),
 j;

 for (j = -19; j <= 0; j += 1) {
 data.push({
 x: time + j * 1000,
 y: Math.random()
 });
 }
 return data;
 }())
 } ,
 {
 name: 'Random data',
 data: (function () {
 // generate an array of random data
 var data = [],
 time = (new Date()).getTime(),
 i;

 for (i = -19; i <= 0; i += 1) {
 data.push({
 x: time + i * 1000,
 y: Math.random()-10
 });
 }
 return data;
 }())
 }
 
 
 ]
 });
 });
 });

 $(function () {
 $(document).ready(function () {
 Highcharts.setOptions({
 global: {
 useUTC: false
 }
 });

 $('#top-right').highcharts({
 chart: {
 type: 'spline',
 animation: Highcharts.svg, // don't animate in old IE
 marginRight: 10,
 events: {
 load: function () {

 // set up the updating of the chart each second
 var series = this.series[0];
 setInterval(function () {
 var x = (new Date()).getTime(), // current time
 y = Math.random();
 series.addPoint([x, y], true, true);
 }, 1000);
 }
 }
 },
 title: {
 text: 'Live random data'
 },
 xAxis: {
 type: 'datetime',
 tickPixelInterval: 150
 },
 yAxis: {
 title: {
 text: 'Value'
 },
 plotLines: [{
 value: 0,
 width: 1,
 color: '#808080'
 }]
 },
 tooltip: {
 formatter: function () {
 return '<b>' + this.series.name + '</b><br/>' +
 Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
 Highcharts.numberFormat(this.y, 2);
 }
 },
 legend: {
 enabled: false
 },
 exporting: {
 enabled: false
 },
 series: [{
 name: 'Random data',
 data: (function () {
 // generate an array of random data
 var data = [],
 time = (new Date()).getTime(),
 i;

 for (i = -19; i <= 0; i += 1) {
 data.push({
 x: time + i * 1000,
 y: Math.random()
 });
 }
 return data;
 }())
 }]
 });
 });
 });
 */
