
//Ecoute des requêtes http et réponse
const http = require('http');
const app = require('./app');

//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = val =>{
    const port = parseInt(val,10);

    if (isNaN(port)){
        return val;
    }
    if (port >=0){
        return port;
    }
    return false;
};

//Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated priviliges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }    
};

//création du serveur
const server = http.createServer(app);

//lance le serveur et gère les erreurs eventuel
server.on('error', errorHandler);
server.on('listening', ()=> {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address: 'port' + port;
    console.log('Listening on' + bind);
});

server.listen(port);

