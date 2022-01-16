var bodyParser = require('body-parser');
var usersRoutes = require( './routes/users.js');
var mongoose = require( 'mongoose');
var config = require( 'config');

var app = express();

var express = require('express');

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

app.use('/users', usersRoutes);

app.get('/', (req, res) =>  res.send('Hello from Homepage'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
