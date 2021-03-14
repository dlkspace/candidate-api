import Router from 'koa-router';
import { CandidateController } from '../controllers';
import { Context, DefaultState } from 'koa';

const router = new Router<DefaultState, Context>();
const ctrl = new CandidateController();

router
  .get('/', async (ctx) => await ctrl.get(ctx))
  .post('/', async (ctx) => await ctrl.create(ctx, ctx.request.body))
  .get('/:id', async (ctx) => await ctrl.getById(ctx, ctx.params.id))
  .delete('/:id', async (ctx) => await ctrl.delete(ctx, ctx.params.id))
  .put(
    '/:id',
    async (ctx) => await ctrl.update(ctx, ctx.params.id, ctx.request.body)
  );

export default router;
