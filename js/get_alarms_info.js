// variables 

const insertData = document.getElementById('tbody');
const dataPartitions = document.getElementById('push-data-partitions');


function getAlarmsApic(){
    fetch("http://localhost/grillas_css/backend/get_alarms.php")
    .then( responseServer => {
        return responseServer.json();
    })
    .then( data => {
        let templateData = '';
        data.forEach(element => {
            switch (element.severity) {
                case 'critical':
                    templateData += `<tr><td style='background-color: #FF3941;color:white'>${element.severity}</td>`;
                    break;
                case 'warning':
                    templateData += `<tr><td style='background-color: #F9C953;color:white'>${element.severity}</td>`;
                    break;
                case 'major':
                    templateData += `<tr><td style='background-color: #BFD300;color:white'>${element.severity}</td>`;
                    break;
                case 'minor':
                    templateData += `<tr><td style='background-color: #BFD300;color:white'>${element.severity}</td>`;
                    break;
                default:
                    templateData += `<tr><td>${element.severity}</td>`;        
                    break;
                                        }
            templateData += ` <td>${element.cause}</td>
                                <td>${element.descr}</td>
                                <td>${element.domain}</td>
                                <td>${element.rule}</td>
                                <td>${element.subject}</td>
                                <td>${element.type}</td>
                            </tr>`;
        });
        insertData.innerHTML = templateData;        
    })
    .catch( error => { return error});
}

function getPartitionsApic(){
    fetch("http://localhost/grillas_css/backend/get_partitions_apic.php")
    .then( responseServer => {
        return responseServer.json();
    })
    .then( data => {
        const arrayProgress = document.querySelectorAll('.progress');
        if (arrayProgress.length !== 0 ){
            if (data.length === arrayProgress.length ) {
                data.forEach(element => {
                    let i = 0;
                    while (i < data.length){
                        for (let index = 0; index < arrayProgress.length; index++) {
                            if(arrayProgress[index].classList.contains(`${element.name}`)){
                                setAttributes(arrayProgress[index].childNodes[0],{
                                    "style": "width :"+ `${element.capUtilized}`+"%",
                                    "class": "progress-bar bg-info " + `${element.capUtilized}` + "-child",
                                    "aria-valuenow": `${element.capUtilized}`
                                });
                                arrayProgress[index].childNodes[0].textContent = `${element.capUtilized}` ;
                            }
                        }    
                        i = i + 1;
                    }
                });
                
            }else{
                for (let index = 0; index < arrayProgress.length; index++) {
                    document.querySelectorAll('.progress')[0].remove();
                }
                data.forEach( element => {
                    const boxPartitions = document.createElement('div');
                    const boxPartitionsChild = document.createElement('div');
                    boxPartitions.setAttribute('class','progress '+`${element.name}`);
                    setAttributes(boxPartitionsChild, {
                        "class":"progress-bar bg-info " + `${element.capUtilized}`+"-child",
                        "role":"progressbar",
                        "style":"width :" + `${element.capUtilized}`+"%",
                        "aria-valuemin":"0",
                        "aria-valuenow": `${element.capUtilized}`,
                        "aria-valuemax":"100"
                    });
                    boxPartitionsChild.textContent = `${element.capUtilized}`;
                    boxPartitions.appendChild(boxPartitionsChild);
                    dataPartitions.appendChild(boxPartitions);
                });
            }
        }else{
            data.forEach( element => {
                const boxPartitions = document.createElement('div');
                const boxPartitionsChild = document.createElement('div');
                boxPartitions.setAttribute('class','progress '+`${element.name}`);
                setAttributes(boxPartitionsChild, {
                    "aria-valuemin":"0",
                    "class":"progress-bar bg-info " + `${element.capUtilized}`+"-child",
                    "role":"progressbar",
                    "style":"width :" + `${element.capUtilized}`+"%",
                    "aria-valuenow": `${element.capUtilized}`,
                    "aria-valuemax":"100"
                });
                boxPartitionsChild.textContent = `${element.capUtilized}`;
                boxPartitions.appendChild(boxPartitionsChild);
                dataPartitions.appendChild(boxPartitions);
            });
        }
        
    })
    .catch(er => { 
        console.log("Error data Server ", er)
    });
}


// set attributes Doom
function setAttributes(el, attrs){
    for (let key in attrs){
        el.setAttribute(key, attrs[key]);
    }
}

// call back events
function callbackEvents(){
    getAlarmsApic();
    getPartitionsApic();
}

// content load
window.addEventListener('DOMContentLoaded', function (){
    callbackEvents();
    setInterval( callbackEvents, 30000);
}, false);