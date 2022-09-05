const http = require('http');
const PORT = 8080;
const fs = require('fs');
const url = require('url');
const Controller = require("./src/controller/controller");


let controller = new Controller();





const server = http.createServer(function(req, res){

    let urlPath = url.parse(req.url).pathname;
    // console.log(urlPath);


    switch (urlPath) {
        case '/':
            controller.showCity(req, res);
            break;
        case '/deleteCities':
            controller.deleteCity(req, res);
            break;
        case '/updateCities':
            if (req.method === 'GET') {
                controller.showFormUpdate(req, res);
            }
            else {
                controller.updateCity(req, res);
            }

            break;
        case '/createCity':
            if (req.method === 'GET') {
                controller.showCreateCity(req, res);
            }
            else {
                controller.createCity(req, res);
            }

        break;
        default:
            res.end();
            break;
    }

})
server.listen(PORT, function(){
    console.log('http://localhost:' + PORT);
});