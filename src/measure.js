import { Utils } from '@mikro-orm/postgresql';

/**
 * Wraps MikroORM's codegen entry point so we can see which cache keys are
 * requested and whether the pre-compiled map contained them.
 */
export const track = () => {
  const original = Utils.createFunction;
  const misses = [];

  Utils.createFunction = function (context, code, compiledFunctions, key) {
    if (key && !compiledFunctions?.[key]) misses.push(key);
    return original.call(this, context, code, compiledFunctions, key);
  };

  return misses;
};

export const report = (orm, misses) => {
  const metas = [...orm.getMetadata().getAll().values()];
  console.log('uniqueNames:', metas.map((meta) => meta.uniqueName).join(', '));
  console.log(
    'compiled-function misses:',
    misses.length,
    misses.length > 0 ? `-> e.g. ${misses[0]}` : '(all keys found)',
  );
};
