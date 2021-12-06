import express from 'express';
import config from 'config';
const logger = require('./utils/logger').default;
const {DbConnection}  = require(<string>'./utils/connect');



const port = config.get<number>('port');
const url = config.get<string>('url');
//
console.log(require('./utils/connect'));
//
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require('./routes'));

app.listen(port, async() => {
    logger.info(`Server is running on port ${url}`);
    await DbConnection();
});