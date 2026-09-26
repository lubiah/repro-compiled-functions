/**
 * Entity modules evaluated in the same order as the config (a then b).
 * Expected: every compiled-function lookup hits.
 */
import './entities/a.entity.js';
import './entities/b.entity.js';
import { MikroORM } from '@mikro-orm/postgresql';
import config from './orm.config.js';
import { track, report } from './measure.js';

const misses = track();
const orm = await MikroORM.init(config);
report(orm, misses);
await orm.close(true);
