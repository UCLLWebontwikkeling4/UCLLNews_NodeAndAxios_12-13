import http from 'http'
import axios from 'axios'
import json2html from 'node-json2html'

const hostname = 'localhost'
const port = 9000

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '/hello':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('Hello world!')
            res.end();
            break
        case '/news/all':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            // call data => build html with data => write html => end response
            makeGetRequestAll().then(data => buildHtmlForOverview(data)).then(html => res.write(html)).then(() => res.end())
            break
        case '/news/add':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            // call data => build html with data => write html => end response
            makeGetRequestAll().then(data => buildHtmlForForm()).then(html => res.write(html)).then(() => res.end())
            break
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ press Ctrl-C to terminate....`)
})

async function makeGetRequestAll () {
    let res = await axios.get('http://localhost:8080/demo_war_exploded/Controller?command=AllNewsItems')
    return res.data
}

function buildHtmlForOverview(data) {
    let html = json2html.render(data,
        {"<>": "li", "html":[{"<>": "span", "text": "${title} ${author} " + "${date.year} - ${date.month} - ${date.dayOfMonth}" + " ${text} ${comments}"}]})

    return  '<!DOCTYPE html>'+
        '<html>'+
        '<head>News Items</head>'+
        '<body>' + html + '</body>'+
        '</html>'
}

function buildHtmlForForm() {
    return  '<!DOCTYPE html>'+
        '<html>'+
        '<head>News Items</head>'+
        '<body>' +
        '<form id="addForm" method="post" action="http://localhost:8080/demo_war_exploded/Controller?command=AddNewsItem" class="bg-teal-100 rounded-lg border-2 border-teal-300 shadow-md shadow-slate-400 w-1/2 mx-auto p-2 grid grid-cols-2 gap-8">' +
        '<div class="text-lg col-start-1 col-end-2">' +
        '<label class="mb-2 font-bold block" for="title">Title</label>' +
        '<input class="block p-2 rounded-md border-2 border-teal-300 w-full" type="text" name="title" id="title"/>' +
        '</div>' +
        '<div class="text-lg col-start-2 col-end-3">' +
        '<label class="mb-2 font-bold block" for="author">Author</label>' +
        '<input class="block p-2 rounded-md border-2 border-teal-300 w-full" type="text" name="author" id="author"/>' +
        '</div>' +
        '<div class="text-lg col-start-1 col-end-3">' +
        '<label class="mb-2 font-bold block" for="text">Text</label>' +
        '<input class="block p-2 rounded-md border-2 border-teal-300 w-full h-32" type="text" name="text" id="text"/>' +
        '</div>' +
        '<div>' +
        '<input type="submit" id="addNewsItemButton">AddNewsItem News Item</input>' +
        '</div>' +
        '</form>' +
        '</body>' +
        '</html>'
}