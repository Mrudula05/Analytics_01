/*Start date and end date function starts here*/
 var selectedBoards;
$(document).ready(function () {
    var minDate1 ;
    var maxDate1;
    var mDate1;
    
    var j = jQuery.noConflict();
    j( "#startTime1" ).datepicker({
               showWeek:true,
               dateFormat:"mm/d/yy",
               showAnim: "slide",
    onSelect: function abc() {
    minDate = j( "#startTime1" ).datepicker("getDate");
    var mDate = new Date(minDate.setDate(minDate.getDate()));
    maxDate = new Date(minDate.setDate(minDate.getDate() + 30));
j("#endTime1").datepicker("setDate", maxDate);
j( "#endTime1" ).datepicker( "option", "minDate1", mDate);
j( "#endTime1" ).datepicker( "option", "maxDate1", maxDate);
}
});
var tdate1 = new Date();
var ddate1 = new Date(tdate1.setDate(tdate1.getDate() + 31));
j("#startTime1").datepicker("setDate", new Date());
j( "#endTime1" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
            });
j("#endTime1").datepicker("setDate",ddate1);

$('#Boards1').multiselect({
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    allSelectedText:false,
    
    }); 

 $('#Boards1').change(function(e) {
     var selected1 = $(e.target).val();
     selectedBoards= $(e.target).val();
        console.dir(selected1);
    });

 });
 /*Start date and end date function ends here*/

 /*Function on boards starts here*/
var allData1;
var SD1;
var ED1;
var BI1;

$.get("/users/api/data1", function(data1, status){
  allData1= data1;
  var filteredData1 = [];
  SD1="01/20/2020";
  ED1="01/20/2020";
  BI1=["109"];
console.log(allData1);
console.log(SD1);
console.log(ED1);
console.log(BI1);
console.log(filteredData1);
    
readyToGo(allData1,SD1,ED1,BI1);
   
  });

function filteredTableData()
{
var startDateFiltered = document.getElementById("startTime1").value;
var endDateFiltered = document.getElementById("endTime1").value;
var board = document.getElementById("Boards1").value;
SD1=startDateFiltered;
ED1=endDateFiltered;
BI1=selectedBoards;
console.log(BI1);
    readyToGo(allData1,SD1,ED1,BI1);
}

/*function on boards end here*/

/*Ready to go function*/
function readyToGo(data1,SD1,ED1,BI1){

alert("click ok to see data.");

var filteredData1 = [];
    
    for(i=0;i<data1.length;i++)
    {
        for(j=0;j<BI1.length;j++)
        {
             if(data1[i].Box_Id == BI1[j] && data1[i].Date >= SD1  && data1[i].Date <= ED1)
        {
             filteredData1.push(data1[i]);
            
        }  
        }
       

    }
    console.log(filteredData1);
     var txt1=""; 
            
      for (var x in filteredData1) {

         txt1 += "<tr><td>"+ filteredData1[x].Date + "</td><td>" + filteredData1[x].Time + "</td><td>" + filteredData1[x].UTC + "</td><td>" + filteredData1[x].Box_Id + "</td><td>" + filteredData1[x].Active_Power + "</td><td>"; 
        
    }
      document.getElementById("tBody").innerHTML=txt1;

      var time_data=[]; 
      var date_data=[];
      var b_data=[];
      var ap_data=[];



  for (var i =0;i < filteredData1.length; i++)
  {


    var tim = filteredData1[i].Time;
    var dates = filteredData1[i].Date;
    var boxid = filteredData1[i].Box_Id;
    var activepower = parseFloat(filteredData1[i].Active_Power);


    time_data.push(tim);
    date_data.push(dates);
    b_data.push(boxid);
    ap_data.push(activepower);

    
    

      /*Code for container chart*/

      Highcharts.chart('container', {
                    chart:{
                        zoomType: 'xy'
                    },

    title: {
        text: 'Energy_Meter_Data'
    },
    yAxis: {
          
        title: {
            text: 'Active_power'
        }
    },
    xAxis: {
         categories:  date_data,
        
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
        name: 'Active_power',
        data: ap_data
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
 
}
}
