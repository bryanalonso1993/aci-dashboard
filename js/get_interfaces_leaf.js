// constant
const totalInterfacesLeaf = document.getElementsByTagName('li');

// functions
// this function update interfaces in switches Leaf
function updateInterfacesLeaf(){
    fetch('http://localhost/grillas_css/backend/get_status_interfaces.php')
        .then( responseData => {
            return responseData.json();
        })
        .then( data => {
            data.forEach( idData => {
                let idParentLeaf = idData.idParent.replace('\r',''),
                    idLeaf = idData.id,
                    operStLeaf = idData.operSt;
                // condition status interfaces leafs
                if (operStLeaf === "down"){
                    document.getElementById(idLeaf+"-"+idParentLeaf).style.color="red";
                }else if (operStLeaf === "up"){
                    document.getElementById(idLeaf+"-"+idParentLeaf).style.color="green";
                }else{
                    console.log("Not foun coincidences");
                }  
            })
        })
        .catch( err => {
            console.log("Error backend Datasets ",err);
        });
}

// view traffic in interfaces leafs
function TrafficInterfacesLeaf(){
    let interfacesUpLeaf = [];
    for (let index = 0 ; index<totalInterfacesLeaf.length; index++){
        if (totalInterfacesLeaf[index].style.color === "green"){
            interfacesUpLeaf.push(totalInterfacesLeaf[index]);
        }else{
            console.log("Not found ...",totalInterfacesLeaf[index].style.color);
        }
    }
}

function callbackEvents(){
    updateInterfacesLeaf();
}

// events
window.addEventListener('load',function (){
    callbackEvents();
    TrafficInterfacesLeaf();
});
