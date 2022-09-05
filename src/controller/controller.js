const fs = require('fs');
const CityModel = require("../model/city-model");
const url = require("url");
const qs = require('qs');

class Controller {
    cityModel;

    constructor() {
        this.cityModel = new CityModel();
    }
    async showCity(req, res) {
        let html ='';
        let cityDB = await this.cityModel.getCity();
        cityDB.forEach((city,index) => {
            html += `<tr>`
            html += `<td>${index + 1}</td>`;
            html += `<td>${city.cityName}</td>`;
            html += `<td>${city.national}</td>`;
            html += `<td><a href="/deleteCities?index=${city.cityNumber}" class="btn btn-danger">Delete</a></td>`;
            html += `<td><a href="/updateCities?index=${city.cityNumber}" class="btn btn-primary">Update</a></td>`;
            html += `<tr>`
        })
        fs.readFile('./views.html','utf8',function(err, data){
            if(err) {
                console.log(err);
            }
            data = data.replace('{list-city}',html)
            res.writeHead(200,'{Content-Type: text/html}');
            res.write(data);
            res.end();
    })
}
    async deleteCity(req, res){
        let index = qs.parse(url.parse(req.url).query).index;
        await this.cityModel.deleteCityByID(index);
        res.writeHead(301, {'location': '/'});
        res.end();
    }
    async updateCity(req, res){
        let index = qs.parse(url.parse(req.url).query).index;

        let data = '';
        req.on('data', chunk => data += chunk)
        req.on('end', async () => {
            let city = qs.parse(data)
            console.log(city);
            await this.cityModel.updateCitybyID(city, index);
            res.writeHead(301, {'Location': '/'});
            res.end();
        })
    }
    showFormUpdate(req, res) {
        fs.readFile('./updateForm.html', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    showCreateCity(req, res){
        fs.readFile('./createCity.html', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    createCity(req, res){
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', async () => {
            let city = qs.parse(data);
            console.log(city)
            await this.cityModel.createNewCity(city);
            res.writeHead(301, {'Location': '/'})
            res.end();
        })
    }

}
module.exports = Controller;