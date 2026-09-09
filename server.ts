import express from 'express';
import api from './api';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', api);

app.get('/', (req, res) => {
  console.log('Server started');
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
