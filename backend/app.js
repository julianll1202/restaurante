import path from 'path';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
// });

export default app;