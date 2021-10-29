const MongoClient = require('mongodb').MongoClient;
var http = require('http');
var url = require('url');

const client = new MongoClient("mongodb+srv://USER:USER12345@cluster0.cgv4a.mongodb.net/bstu?retryWrites=true&w=majority", 
		{ useNewUrlParser: true });



http_handler = (req, res) => {
    if (req.method == 'GET') {
        if (url.parse(req.url).pathname === '/api/pulpits') {
            client.connect(err => {
                if (err) console.log('Mongodb error connection')
                else {
                    console.log('Mongodb connection success');

                    const collection = client.db("bstu").collection("pulpit", (err, collection) => {
                        if (err) console.log('error', err)
                        else {
                            collection.find({}).toArray((err, docs) => {
                                if (err) console.log('collection.find error', err);
                                else {
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify(docs));
                                }
                            })
                        }
                    });
                }
            });
        }
        else if (url.parse(req.url).pathname === '/api/faculties') {
            client.connect(err => {
                if (err) console.log('Mongodb error connection')
                else {
                    console.log('Mongodb connection success');

                    const collection = client.db("bstu").collection("faculty", (err, collection) => {
                        if (err) console.log('error', err)
                        else {
                            collection.find({}).toArray((err, docs) => {
                                if (err) console.log('collection.find error', err);
                                else {
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify(docs));
                                }
                            })
                        }
                    });
                }
            });
        }
    }
    else if (req.method == 'POST') {

        if (url.parse(req.url).pathname === '/api/faculties') {

            client.connect(err => {
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', async () => {
                    let o = JSON.parse(body);

                    if (err) console.log('Mongodb error connection')
                    else {
                        console.log('Mongodb connection success');

                        const collection = client.db("bstu").collection("faculty", (err, collection) => {
                            if (err) console.log('error', err)
                            else {
                                collection.insertOne(o, function (err, result) {
                                    if (err) console.log('collection.find error', err);
                                    else {
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify(result.ops));

                                    }

                                });
                            }
                        });
                    }
                });

            });
        }
        else if (url.parse(req.url).pathname === '/api/pulpits') {

            client.connect(err => {
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', () => {
                    let o = JSON.parse(body);

                    if (err) console.log('Mongodb error connection')
                    else {
                        console.log('Mongodb connection success');

                        const collection = client.db("bstu").collection("pulpit", (err, collection) => {
                            if (err) console.log('error', err)
                            else {
                                collection.insertOne(o, function (err, result) {
                                    if (err) console.log('collection.find error', err);
                                    else {
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify(result.ops));

                                    }

                                });
                            }
                        });
                    }
                });

            });
        }
    }
    else if (req.method == 'PUT') {

        if (url.parse(req.url).pathname === '/api/faculties') {

            client.connect(err => {
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', async () => {
                    let o = JSON.parse(body);

                    if (err) console.log('Mongodb error connection')
                    else {
                        console.log('Mongodb connection success');

                        const collection = client.db("bstu").collection("faculty", (err, collection) => {
                            if (err) console.log('error', err)
                            else {
                                collection.findOneAndUpdate({ faculty: o.faculty }, { $set: { faculty_name: o.faculty_name } }, { returnOriginal: false }, function (err, result) {
                                    if (err) console.log('collection.find error', err);
                                    else {
                                        if (result.value == null) {
                                            res.end(`"error":"3","message":"Уже изменено"`);

                                        }
                                        else {
                                            res.writeHead(200, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify(result.value));
                                        }
                                    }

                                });
                            }
                        });
                    }
                });

            });
        }
        else if (url.parse(req.url).pathname === '/api/pulpits') {

            client.connect(err => {
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', async () => {
                    let o = JSON.parse(body);

                    if (err) console.log('Mongodb error connection')
                    else {
                        console.log('Mongodb connection success');

                        const collection = client.db("bstu").collection("pulpit", (err, collection) => {
                            if (err) console.log('error', err)
                            else {
                                collection.findOneAndUpdate({ pulpit: o.pulpit }, { $set: { faculty: o.faculty, pulpit_name: o.pulpit_name } }, { returnOriginal: false }, function (err, result) {
                                    if (err) console.log('collection.find error', err);
                                    else {
                                        if (result.value == null) {
                                            res.end(`"error":"3","message":"Уже изменено"`);

                                        }
                                        else {
                                            res.writeHead(200, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify(result.value));
                                        }
                                    }

                                });
                            }
                        });
                    }
                });

            });
        }
    }
    else if (req.method == 'DELETE') {

        if (url.parse(req.url).pathname.search('\/api\/faculties\/[A-z]+') != (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let o = r[3];
            client.connect(err => {


                if (err) console.log('Mongodb error connection')
                else {
                    console.log('Mongodb connection success');

                    const collection = client.db("bstu").collection("faculty", (err, collection) => {
                        if (err) console.log('error', err)
                        else {
                            collection.findOneAndDelete({ faculty: o }, function (err, result) {
                                if (err) console.log('collection.find error', err);
                                else {
                                    if (result.value == null) {
                                        res.end(`"error":"1","message":"Уже удалено"`);

                                    }
                                    else {
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify(result.value));
                                    }
                                }

                            });
                        }
                    });
                }


            });
        }
        if (url.parse(req.url).pathname.search('\/api\/pulpits\/[A-z]+') != (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let o = r[3];
            client.connect(err => {


                if (err) console.log('Mongodb error connection')
                else {
                    console.log('Mongodb connection success');

                    const collection = client.db("bstu").collection("pulpit", (err, collection) => {
                        if (err) console.log('error', err)
                        else {
                            let result2 = collection.findOneAndDelete({ pulpit: o }, function (err, result) {
                                if (err) console.log('collection.find error', err);
                                else {
                                    if (result.value == null) {
                                        res.end(`"error":"1","message":"Уже удалено"`);

                                    }
                                    else {
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify(result.value));
                                    }
                                }

                            });
                        }
                    });
                }


            });
        }
    }
}
var server=http.createServer(function (req, res){
    try{
        http_handler(req,res);
    }
    catch(e)
    {
        console.error(e);
    }

}).listen(3000);