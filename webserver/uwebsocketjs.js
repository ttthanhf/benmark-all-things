const UWS = require('uWebSockets.js')
const app = UWS.App()

app.get('/*', (res, req) => {
    res.end('Hello there!');
})

app

app.listen(9001, (listenSocket) => console.log('Listening to port 9001'));