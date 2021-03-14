import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { router } from './routes';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 8626;
const app = new Koa();

app
  .use(cors({ origin: '*', credentials: true }))
  .use(bodyParser())
  .use(router.routes());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
