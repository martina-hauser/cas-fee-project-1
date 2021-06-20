import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

import {noteRoutes} from './routes/noteRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile('/html/index.html', {root: `${__dirname}/public/`});
});
// app.get('/notes', (req, res) => {
//   res.type('application/json');
// });
app.use('/', noteRoutes);
