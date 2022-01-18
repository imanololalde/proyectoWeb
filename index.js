var bodyParser = require('body-parser');
const usersRoutes = require( './controllers/users.js');
const gamesRoutes = require( './controllers/game.js');
var mongoose = require( 'mongoose');
var config = require( 'config');
var express = require('express');
var app = express();


YAML = require('yamljs');

const swaggerUi = require('swagger-ui-express');
swaggerDocument = YAML.load('./docs/openAPI.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = 5000;
const dbConfig = config.get('AppDB.dbConfig.dbName');


mongoose.connect(dbConfig).then(()=>{
    console.log('Database Connected');
}).catch(err=>{
    console.log('Database not Connected'+err )
});

app.use(bodyParser.json());

app.use(usersRoutes);
app.use(gamesRoutes);

app.get('/', (req, res) =>  res.send('Hello from Homepage'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
