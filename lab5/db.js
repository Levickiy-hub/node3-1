const util = require('util');
const ee = require('events');
exports.commit = 0;
let db_data = [
    {
        id: 1, name: 'Ivanov I.I.', bday: '27.06.2001'
    },
    {
        id: 2, name: 'Levickiy V.S.', bday: '27.08.2000',
    },
    {
        id: 3, name: 'Kachenya D.V.', bday: '29.06.2000'
    }
]
function DB() {
    this.get = () => {return db_data;}
    this.post = (data) => {
        db_data.push(data);
    }
    this.put = (data) => {
        db_data.forEach((el) =>{
            if (el.id === Number.parseInt(data.id)){
                el.name = data.name;
                el.bday = data.bday;
            }
        })
    }
    this.delete = (id) => {
        const temp = db_data.filter((item) => {
            return item.id != id;
        })
        db_data = temp;
    }
    this.commit = () => {
        console.log('commit');
        exports.commit++;
    }
}
util.inherits(DB, ee.EventEmitter);

exports.DB = DB;
