import express from 'express';
import api from './api';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => {
  console.log('Server started');
  res.send('Hello world');
});


