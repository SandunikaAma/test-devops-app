import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.route.js';
import securityMiddleware from '#middleware/security.middleware.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined', {stream:{write:(message)=>{
  logger.info(message.trim());
}}}));
app.use(cors());
app.use(cookieParser());
app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Hello sandunika');
  res.status(200).send('Hello Sandunika');
});
app.get('/api', (req, res)=>{
  res.status(200).json({
    message:'API is working'
  });
});

app.use('/api/auth', authRoutes);
export default app;
