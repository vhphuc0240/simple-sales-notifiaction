import Router from 'koa-router';
import {verifyWebhook} from '@avada/shopify-auth';

const router = new Router({prefix: '/webhook'});

router.use(verifyWebhook);

export default router;
