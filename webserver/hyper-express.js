const HyperExpress = require('hyper-express');
const app = new HyperExpress.Server();

app.get('/', (request, response) => {
    response.send('Hello World');
})

// Activate webserver by calling .listen(port, callback);
app.listen(8000)
.then((socket) => console.log('Webserver started on port 80'))
.catch((error) => console.log('Failed to start webserver on port 80'));