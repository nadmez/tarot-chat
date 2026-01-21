import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { initI18n } from './utils/i18n';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;

const start = async () => {
   await initI18n();
   app.listen(port, () => {
      console.log(`Sunucu dinleme durumunda: http://localhost:${port}`);
   });
};

start();
