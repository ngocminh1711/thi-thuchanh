const BaseModel = require("./base-model");

class CityModel extends BaseModel {

    async getCity() {
        const sql = `SELECT *
                     FROM city`
        return await this.querySQL(sql);
    }

    async deleteCityByID(id) {
        const sql = `DELETE
                     FROM city
                     WHERE city.cityNumber = ${id}`;
        return await this.querySQL(sql);
    }
    async updateCitybyID(data,index){
        const sql = `UPDATE city
                     SET  cityName = '${data.nameCityUpdate}', national = '${data.nationalUpdate}',area = '${data.areaUpdate}', population = '${data.populationUpdate}',gdp = '${data.gdpUpdate}', introduce ='${data.introduceUpdate}'
                     WHERE cityNumber = '${index}';`
        return await this.querySQL(sql);
    }
    async createNewCity(data){
        const sql = `INSERT INTO city VALUES ('${data.newNameCity}', '${data.newID}', '${data.newNational}', '${data.newArea}', '${data.newPopulation}', '${data.newIntroduce}' )`
        return await this.querySQL(sql);
    }
}
module.exports = CityModel;