const util = require("util");
const ee = require("events");

const db_data = [
    {id:1, name: 'Иванов И.И.', bday:'2000-01-01'},
    {id:2, name: 'Петров П.П.', bday:'2000-01-02'},
    {id:3, name: 'Сидоров С.С.', bday:'2000-01-03'},
    {id:4, name: 'Павлов П.И.', bday:'2000-01-04'},
    {id:5, name: 'Семенов С.М.', bday:'2000-01-05'}
];

function DB() {
    this.select = function(id) {
        return db_data;
    }

    this.insert = function(obj) {
        db_data.push(obj);
    }

    this.delete = function(id) {
        let index = db_data.findIndex(function(item, i){
            return item.id === id;
        });
        if(index!=-1)
            return db_data.splice(index, 1);
        else
            return 'not found';
    }

    this.update = function (r) {
        let index = db_data.findIndex(function(item, i){
            return item.id == r.id;
        });
        if(index!=-1){
            db_data[index].name = r.name;
            db_data[index].dbay = r.dbay;
            return db_data[index];
        }
        else
            return 'not found';
    }
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;