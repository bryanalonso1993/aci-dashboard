// esto es una prueba en javascript

const dataSets = [
    {
        "name":"bryan alonso",
        "age": 26
    },{
        "name":"Estephanie Ponce",
        "age":25
    }
];

let getDataId = (id, callback) => {
    if (id !== ""){
        callback(null, id);
    }else{
        callback("Error in dataSets");
    }
}

getDataId("", function (err, id) {
    if (err){
        console.log(err);
    }
    console.log(id);
})