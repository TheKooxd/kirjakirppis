exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createExtension("uuid-ossp", { ifNotExists: true });
    pgm.createType('status', ['open', 'in-progress', 'done'])
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
        ean: { type: 'text' },
        writers: { type: 'text[]' },
        producer: { type: 'text' },
        marketprice: { type: 'decimal' },
      });
      pgm.createTable('sellNotice', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()")
          },
        seller: { type: 'uuid' },
        price: { type: 'decimal' },
        book: { type: 'uuid' },
        opened: { type: 'bigint' },
        closes: { type: 'bigint' },
        status: {type: 'status'}
      });
};

exports.down = (pgm) => {

};