 /*Start date and end date function starts here*/
 var selectedBoards;
$(document).ready(function () {
    var minDate ;
    var maxDate;
    var mDate;
    
    var j = jQuery.noConflict();
    j( "#startTime" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
    onSelect: function abc() {
    minDate = j( "#startTime" ).datepicker("getDate");
    var mDate = new Date(minDate.setDate(minDate.getDate()));
    maxDate = new Date(minDate.setDate(minDate.getDate() + 30));
j("#endTime").datepicker("setDate", maxDate);
j( "#endTime" ).datepicker( "option", "minDate", mDate);
j( "#endTime" ).datepicker( "option", "maxDate", maxDate);
}
});
var tdate = new Date();
var ddate = new Date(tdate.setDate(tdate.getDate() + 31));
j("#startTime").datepicker("setDate", new Date());
j( "#endTime" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
            });
j("#endTime").datepicker("setDate",ddate);

$('#Boards').multiselect({
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    allSelectedText:false,
    
    }); 

 $('#Boards').change(function(e) {
     var selected = $(e.target).val();
     selectedBoards= $(e.target).val();
        console.dir(selected);
    });

 });
 /*Start date and end date function ends here*/

 /*Function on boards starts here*/
var allData;
var SD;
var ED;
var BI;

$.get("/users/api/data", function(data, status){
	allData= data;
    var filteredData = [];
   SD="01/17/2020";
   ED="01/17/2020";
   BI=["01"];
console.log(allData);
console.log(SD);
console.log(ED);
console.log(BI);
console.log(filteredData);
    
readyToGo(allData,SD,ED,BI);
   
	});




function filteredTableData()
{
var startDateFiltered = document.getElementById("startTime").value;
var endDateFiltered = document.getElementById("endTime").value;
var board = document.getElementById("Boards").value;
SD=startDateFiltered;
ED=endDateFiltered;
BI=selectedBoards;
console.log(BI);
    readyToGo(allData,SD,ED,BI);
}

/*function on boards end here*/

/*Ready to go function*/
function readyToGo(data,SD,ED,BI){

alert("click ok to see data.");

var filteredData = [];
    
    for(i=0;i<data.length;i++)
    {
        for(j=0;j<BI.length;j++)
        {
             if(data[i].BoardId == BI[j] && data[i].Date >= SD  && data[i].Date <= ED)
        {
             filteredData.push(data[i]);
            
        }  
        }
       

    }
    console.log(filteredData);
    
    var txt=""; 
            
      for (var x in filteredData) {
        
        txt += "<tr><td>"+ filteredData[x].Date + "</td><td>" + filteredData[x].Time + "</td><td>" + filteredData[x].UTC + "</td><td>" + filteredData[x].BoardId + "</td><td>" + filteredData[x].temp + "</td><td>" + filteredData[x].humidity + "</td><td>" + filteredData[x].lumVal + "</td><tr>"; 
      }
         
      document.getElementById("tBody").innerHTML=txt;
     
            var tim_data=[];
            var time_data=[]; 
            var date_data=[];
            var b_data=[];
            var tt_data=[];
            var hu_data=[];
            var lu_data=[];
            
            for (var i =0;i < filteredData.length; i++)
            {
                var times = filteredData[i].timestamp;
                var tims= filteredData[i].Time;
                var dates= filteredData[i].Date;
                var boards= filteredData[i].BoardId;
                var temps= filteredData[i].temp;
                var humis= filteredData[i].humidity;
                var lumis= filteredData[i].lumVal;
                var conc = dates.concat(tims);//concanating time and date
                console.log(conc);

                
                tim_data.push(conc);
                time_data.push(tims);
                date_data.push(dates);
                b_data.push(boards);
                hu_data.push(humis);
                tt_data.push(temps);
                lu_data.push(lumis);
                
                

                
            }


    /*function for boards ends here*/

      /*Code for container chart*/

      Highcharts.chart('container', {
                    chart:{
                        zoomType: 'xy'
                    },

    title: {
        text: 'Anayltics'
    },
    yAxis: {
        title: {
            text: 'Temprature, Humidity, Luminosity'
        }
    },
    xAxis: {
         categories:  tim_data,
        
            title: {
                text: 'Date',

            },
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [{
        name: 'Temprature',
        data: tt_data
    },{
        name: 'Humidity',
        data: hu_data
    },{
        name: 'Luminosity',
        data: lu_data

    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});

      /*Container chart end to here*/

      /*container1 */

     Highcharts.chart('container1', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average weekly Weather Data for sensors',
        align: 'center'
    },
    
    xAxis: [{
         categories: tim_data,
            crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        opposite: true

    }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
            text: 'Humidity',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }

    }, { // Tertiary yAxis
        gridLineWidth: 1,
        title: {
            text: 'Luminosity',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} mb',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'Humidity',
        type: 'column',
        yAxis: 1,
        data: hu_data,
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Luminosity',
        type: 'spline',
        yAxis: 2,
        data: lu_data,
        marker: {
            enabled: false
        },
        dashStyle: 'shortdot',
        tooltip: {
            valueSuffix: ' mb'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: tt_data,
        tooltip: {
            valueSuffix: ' °C'
        }
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    floating: false,
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 0
                }
            }
        }]
    }
});


      /*container2*/

     /*google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var container = document.getElementById('container2');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'President' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
          [ 'Board-1', new Date(2019, 1, 2), new Date(2019, 2, 5) ],
          [ 'Board-2', new Date(2019, 2, 8),  new Date(2019, 2, 9) ],
          [ 'Board-3',  new Date(2019, 2, 4),  new Date(2019, 2, 4) ]]);

        var options = {'title':'Board Timeline',
                     'width':400,
                     'height':300};

        chart.draw(dataTable);
      } */

}


 
