import xin from 'xin';
import Middleware from 'xin/components/middleware';

class LogMiddleware extends Middleware {
  callback () {
    return async (ctx, next) => {
      console.info(`Navigate to ${ctx.uri}`);
      await next();
    };
  }
}

xin.define('log-middleware', LogMiddleware);

export default LogMiddleware;
