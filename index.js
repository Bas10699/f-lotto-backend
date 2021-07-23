// ตัวอย่างการดูหวยงวดวันที่ 16 กุมภาพันธ์ 2564                                       
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({

});




var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var version = '/api/v1/'
var moment = require('moment')
var logger = require('morgan')
var fs = require('fs')
var path = require('path')


var mm = moment()
var date = mm.utc(7).format('DD-MM-YYYY')
var time = mm.utc(7).format('HH: mm: ss')
console.log(date, time)



app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));



app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
});

app.use(logger('dev'))
var accessLogStream = fs.createWriteStream(path.join(__dirname, `logs`, `'${date}'.log`), { flags: 'a' })
var configlog = `[:date[iso]] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`
app.use(logger(configlog, {
    stream: accessLogStream
}))


app.get('/', (req, res) => {
    let config = {
        method: 'post',
        url: 'https://api.krupreecha.com/16022564',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '8bebfb75a931bd796d5678a93f8064bc',
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            
            res.status(200).json({
                success: true,
                result: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    // res.send('Hello World')
})




app.listen(port, function () {
    console.log('Example app listening on port ' + port)
})