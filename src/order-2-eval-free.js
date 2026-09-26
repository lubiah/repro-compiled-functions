/**
 * order-2.js plus a simulated eval-free runtime (Cloudflare Workers forbid
 * `new Function`), so the failure is reproducible without deploying anything.
 * Expected: an EvalError thrown from MikroORM.init, exactly as on Workers.
 */
import './entities/b.entity.js';
import './entities/a.entity.js';

const RealFunction = globalThis.Function;
globalThis.Function = new Proxy(RealFunction, {
  construct() {
    throw new EvalError('Code generation from strings disallowed for this context');
  },
});

const { MikroORM } = await import('@mikro-orm/postgresql');
const { default: config } = await import('./orm.config.js');

try {
  const orm = await MikroORM.init(config);
  console.log('init succeeded (unexpected)');
  await orm.close(true);
} catch (error) {
  console.log('init threw:', error.constructor.name + ':', error.message);
}
