import { defineEntity, p } from '@mikro-orm/postgresql';

export const ASchema = defineEntity({
  name: 'a',
  properties: {
    id: p.integer().primary(),
    name: p.string(),
  },
});

export class A extends ASchema.class {}
ASchema.setClass(A);
