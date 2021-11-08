const express = require('express');
const app = express();

const port = 3000;

app.use(express.json())

const authorsRouter = require('./routes/authors')

app.use('/authors', authorsRouter)

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hi'})
})

app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
})