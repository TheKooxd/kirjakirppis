exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createExtension("uuid-ossp", { ifNotExists: true });
    pgm.createType('status', ['open', 'in-progress', 'done'])
    pgm.createType('condition', ['FN', 'MW', 'FT', 'WW', "BS"])
    pgm.createTable('users', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()")
          },
        name: { type: 'text' },
        email: { type: 'text' },
        phone: { type: 'text' },
        snapchat: { type: 'text' }
      });
      pgm.createTable('books', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()")
          },
        name: { type: 'text' },
        subject: { type: 'text' },
        courceNum: { type: 'int' },
        ean: { type: 'text' },
        writers: { type: 'text[]' },
        producer: { type: 'text' },
        marketprice: { type: 'decimal' },
      });
      pgm.createTable('sellnotice', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()")
          },
        seller: { type: 'uuid', notNull: true },
        allowoffers: { type: 'bool', notNull: true},
        price: { type: 'decimal', notNull: true },
        book: { type: 'uuid', notNull: true },
        opened: { type: 'bigint', notNull: true },
        closes: { type: 'bigint' },
        status: {type: 'status', notNull: true},
        buyer: { type: 'uuid' },
        finalprice: {type: 'decimal'},
        condition: { type: 'condition', notNull: true },
        markings: { type: 'boolean', notNull: true }
      });
      pgm.createTable('offers', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()")
          },
        sellnotice: { type: 'uuid' },
        offer: { type: 'decimal' },
        created: { type: 'bigint' },
        offerer: { type: 'uuid' },
      });
};

exports.down = (pgm) => {

};