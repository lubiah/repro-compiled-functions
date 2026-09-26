import { defineConfig } from '@mikro-orm/postgresql';
import { A } from './entities/a.entity.js';
import { B } from './entities/b.entity.js';

// Imported optionally so the very first `mikro-orm compile` works before the
// file exists. This a-then-b import order is the order the generated keys
// encode; the entry points below import them the other way round on purpose.
const compiledFunctions = await import('./compiled-functions.js')
  .then((mod) => mod.default)
  .catch(() => undefined);

export default defineConfig({
  connect: false, // metadata discovery only — no database needed for this repro
  dbName: 'unused',
  entities: [A, B],
  compiledFunctions,
});
