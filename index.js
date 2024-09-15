const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({
	path: './.env',
});
const { consola } = require('consola');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		consola.success('Connected to MongoDB');
	})
	.catch((error) => {
		consola.error('Error connecting to MongoDB', error);
	});

for (let route of fs.readdirSync('./routes')) {
	consola.info(`/api/${route.split('.')[0]}`);
	app.use(`/api/${route.split('.')[0]}`, require(`./routes/${route}`));
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	consola.success(`Server started on port ${PORT}`);
});
