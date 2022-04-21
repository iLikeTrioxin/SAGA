const chartJS = require("chart.js")

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new chartJS.Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temp.',
            borderColor: 'red'
        },
        {
            label: 'RPM',
            borderColor: 'blue'
        },
        {
            label: 'Heater PWM',
            borderColor: 'yellow'
        },
        {
            label: 'Target RPM',
            borderColor: 'green'
        },
        {
            label: 'Target temp',
            borderColor: 'purple'
        },
        {
            label: 'Pump PWM',
            borderColor: 'pink'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: false
    }
});

class DataPoint{
    constructor(time, temp, rpm, heaterPWM, targetRPM, targetTemp, pumpPWM){
        this.time = time;
        this.temp = temp;
        this.rpm = rpm;
        this.heaterPWM = heaterPWM;
        this.targetRPM = targetRPM;
        this.targetTemp = targetTemp;
        this.pumpPWM = pumpPWM;
    }
}
let m1l =Date.now();
function getDataPoint(){
    let mil =Date.now();
    return {
        "time": mil,
        "temp": 30,
        "rpm": 60,
        "heaterPWM": 255,
        "targetRPM": 100,
        "targetTemp": 250,
        "pumpPWM": 200
    }
    var __dataPoint__ = null;
    let xmlhttp       = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState !=   4) return;
        if (this.status     != 200) return errorCanNotConnect();
        
        let res = JSON.parse(this.responseText);
        
        if (res['exitCode'] == 0) {
            __dataPoint__ = res['data'];
        }
    };

    xmlhttp.open("GET", `http://${localStorage['ip']}/serial.php?msg=info`, true);
    xmlhttp.send();

    return __dataPoint__;
}

function updateGraph(){
    addDataPoint(getDataPoint());
}

function addDataPoint(dataPoint) {
    if(myChart.data.labels.length > 30){
        myChart.data.labels.shift();

        myChart.data.datasets[0].data.shift();
        myChart.data.datasets[1].data.shift();
        myChart.data.datasets[2].data.shift();
        myChart.data.datasets[3].data.shift();
        myChart.data.datasets[4].data.shift();
        myChart.data.datasets[5].data.shift();
    }

    myChart.data.labels.push(parseInt(dataPoint['time'] / 100));

    myChart.data.datasets[0].data.push(dataPoint['temp'      ]);
    myChart.data.datasets[1].data.push(dataPoint['rpm'       ]);
    myChart.data.datasets[2].data.push(dataPoint['heaterPWM' ]);
    myChart.data.datasets[3].data.push(dataPoint['targetRPM' ]);
    myChart.data.datasets[4].data.push(dataPoint['targetTemp']);
    myChart.data.datasets[5].data.push(dataPoint['pumpPWM'   ]);
    
    myChart.update();
}

const graphUpdater = setInterval(updateGraph, 1000);

//clearInterval(interval);