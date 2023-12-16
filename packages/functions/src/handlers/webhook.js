import App from 'koa';
import * as errorService from '@functions/services/errorService';
import apiRouter from '@functions/routes/api';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

const router = apiRouter(true);
// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
