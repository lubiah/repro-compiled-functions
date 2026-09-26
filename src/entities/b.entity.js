import { defineEntity, p } from '@mikro-orm/postgresql';

export const BSchema = defineEntity({
  name: 'b',
  properties: {
    id: p.integer().primary(),
    label: p.string(),
  },
});

export class B extends BSchema.class {}
BSchema.setClass(B);
