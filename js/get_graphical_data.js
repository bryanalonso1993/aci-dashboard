// load graphical data
const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
// define function
function loadChartData(element,type,labels,label,data,backgroundColor){
    return new Chart(element, {
        type:type,
        data:{
            labels: labels ,
            datasets : [{
                label:label,
                data:data,
                backgroundColor:backgroundColor,
                borderColor:[],
                borderWidth: 1
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio: false,
            legend:{
                position:"top"
            },
            scales:{
                yAxes:[{ ticks: {beginAtZero: true }}]
            }
        }
    });
}

function callBackFunctions(){
    loadChartData(ctx,
        'bar',
        ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        "This example data",
        [10, 11, 5, 6, 20, 3 , 5],
        "#4d94ff"
    );
    loadChartData(ctx2,
        'line',
        ["jueves","viernes","sabado","domingo","lunes","martes","miercoles"],
        "This other Example",
        [15,17,2, 15, 1, 3 , 3],
        "#b3b3ff"
    );
}
window.addEventListener('load', callBackFunctions, false);