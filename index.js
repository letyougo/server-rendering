/**
 * Created by xiaoxiaosu on 17/3/20.
 */

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app =express(),
    cheerio = require('cheerio');



var aaa = function () {
    return '<div>'+
        '<p>hello i ma aaa</p>'+
        '<div>'
}

var bbb = function () {
    return '<div>'+
        '<p>hello i ma bbb</p>'+
        '<div>'
}

var route = [
    {
        path:'/aaa',
        cb:function (path) {
            console.log('hello i enter',path)
        },
        view:aaa()
    },
    {
        path:'/bbb',
        cb:function (path) {
            console.log('hello i enter',path)
        },
        view:bbb()
    }
]


var dom = '#root'
app.all('*',function (req, res) {
    var pa = path.join(__dirname,'views','index.html')
    var html = fs.readFileSync(pa,'utf-8')
    var $ = cheerio.load(html)


    var url = req.url
    console.log(url)
    for(var i=0;i<route.length;i++){
        if(url == route[i].path){
          $(dom).html(route[i].view)
        }
    }
    res.send($.html())
})

app.listen(3000,function () {
    console.log('server start')
})