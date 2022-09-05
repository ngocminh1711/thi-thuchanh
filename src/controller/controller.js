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
            html += `<td><a href="/viewDetail?index=${city.cityNumber}">${city.cityName}</a></td>`;
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

            await this.cityModel.createNewCity(city);
            res.writeHead(301, {'Location': '/'})
            res.end();
        })
    }
   async showViewDetail(req, res) {
       let id = qs.parse(url.parse(req.url).query).index;
       let dataReplace =  await this.cityModel.getCityById(id)
       let cityName = dataReplace[0].cityName;
       let national = dataReplace[0].national;
       let area = dataReplace[0].area;
       let population = dataReplace[0].population;
       let gdp = dataReplace[0].gdp;
       let introduce = dataReplace[0].introduce;
       console.log(cityName)

        fs.readFile('./viewDetail.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err.message)
            }
            data = data.replace('{national}', national)
            data = data.replace('{city-name}', cityName)
            data = data.replace('{population}', population)
            data = data.replace('{area}', area)
            data = data.replace('{introduce}',introduce)
            data = data.replace('{GDP}' ,gdp)
            res.writeHead(200, {'Location': 'text/html'});
            res.write(data);
            res.end();
        })
    }
}
module.exports = Controller;