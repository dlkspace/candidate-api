import Router from 'koa-router';

import candidate from './candidate';

export const router = new Router({ prefix: '/api' });

router.use('/candidates', candidate.routes(), candidate.allowedMethods());
