/**
 * Identical to order-1.js except the two entity imports are swapped — which is
 * what any bundler (or any second entry point) is free to do.
 * Expected here: every lookup misses and falls back to `new Function`
 * (allowed on Node), i.e. the pre-compiled functions are silently unused.
 */
import './entities/b.entity.js';
import './entities/a.entity.js';
import { MikroORM } from '@mikro-orm/postgresql';
import config from './orm.config.js';
import { track, report } from './measure.js';

const misses = track();
const orm = await MikroORM.init(config);
report(orm, misses);
await orm.close(true);
