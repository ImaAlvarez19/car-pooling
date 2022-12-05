import express, {Request, Response} from 'express';
import {addCarsToTheService} from './endpoints/addCarsToTheService';
import {createJourney} from './endpoints/createJourney';
import {dropOff} from './endpoints/dropOff';
import {locateGroup} from './endpoints/locateGroup';
import {CarPoolingService} from './services/CarPoolingService';
import {allowOnlyPost, allowOnlyPut} from './utils/httpRequestsControl';

const service = new CarPoolingService();
const PORT = 9091;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {

  console.log(`server running on port ${PORT}`);

});

app.get('/status', (request: Request, response: Response) => {

  response.status(200).send('OK');

});


app.use('/cars', allowOnlyPut, (request: Request, response: Response) => {

  addCarsToTheService(request, response, service);

});

app.use('/journey', allowOnlyPost, (request: Request, response: Response) => {


  createJourney(request, response, service);

});

app.use('/dropoff', allowOnlyPost, urlencodedParser, (request: Request, response: Response) => {

  dropOff(request, response, service);

});

app.use('/locate', allowOnlyPost, urlencodedParser, (request: Request, response: Response) => {

  locateGroup(request, response, service);

});

