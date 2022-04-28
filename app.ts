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
        case '/lectors':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            // call data => build html with data => write html => end response
            makeGetRequest().then(data => buildHtml(data)).then(html => res.write(html)).then(() => res.end())
            break
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ press Ctrl-C to terminate....`)
})

async function makeGetRequest () {
    let res = await axios.get('http://localhost:8080/Controller?command=Overview')
    return res.data
}

function buildHtml(data) {
    let html = json2html.render(data,
        {"<>": "li", "html":[{"<>": "span", "text": "${firstname} ${name}"}]})

    return  '<!DOCTYPE html>'+
        '<html>'+
        '<head>LECTORS</head>'+
        '<body>' + html + '</body>'+
        '</html>'
}