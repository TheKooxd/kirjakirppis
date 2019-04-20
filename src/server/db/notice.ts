export const getById = (id: string, client: any) =>
  client.query(`select json_build_object(
    'id', s.id,
    'allowoffers', s.allowoffers,
    'price', s.price,
    'opened', s.opened,
    'closes', s.closes,
    'finalprice', s.finalprice,
    'status', s.status,
    'buyer', row_to_json(bu.*),
    'seller', row_to_json(se.*),
    'book', row_to_json(b.*),
    'offers', (
        select json_agg(json_build_object (
            'id', offe.id,
            'sellnotice', offe.sellnotice,
            'offer', offe.offer,
            'created', offe.created,
            'offerer', row_to_json(ur.*)
        ))
        from offers offe
        LEFT JOIN users ur ON (ur.id = offe.offerer)
        where offe.sellnotice = s.id
    )
) as sellnotice
from sellnotice s
LEFT JOIN users se ON (se.id = s.seller)
LEFT JOIN users bu ON (bu.id = s.buyer)
LEFT JOIN books b ON (b.id = s.book)
WHERE s.id = '${id}'`);

export const getAll = (client: any) =>
  client.query(`select json_build_object(
    'id', s.id,
    'allowoffers', s.allowoffers,
    'price', s.price,
    'opened', s.opened,
    'closes', s.closes,
    'finalprice', s.finalprice,
    'status', s.status,
    'buyer', row_to_json(bu.*),
    'seller', row_to_json(se.*),
    'book', row_to_json(b.*),
    'offers', (
        select json_agg(json_build_object (
            'id', offe.id,
            'sellnotice', offe.sellnotice,
            'offer', offe.offer,
            'created', offe.created,
            'offerer', row_to_json(ur.*)
        ))
        from offers offe
        LEFT JOIN users ur ON (ur.id = offe.offerer)
        where offe.sellnotice = s.id
    )
) as sellnotice
from sellnotice s
LEFT JOIN users se ON (se.id = s.seller)
LEFT JOIN users bu ON (bu.id = s.buyer)
LEFT JOIN books b ON (b.id = s.book)
where status = 'open' AND closes > ${Math.floor(Date.now() / 1000)}
`);

export const getWhereSeller = (client: any, id: string) => 
client.query(`
select json_build_object(
    'id', s.id,
    'allowoffers', s.allowoffers,
    'price', s.price,
    'opened', s.opened,
    'closes', s.closes,
    'finalprice', s.finalprice,
    'status', s.status,
    'buyer', row_to_json(bu.*),
    'seller', row_to_json(se.*),
    'book', row_to_json(b.*),
    'offers', (
        select json_agg(json_build_object (
            'id', offe.id,
            'sellnotice', offe.sellnotice,
            'offer', offe.offer,
            'created', offe.created,
            'offerer', row_to_json(ur.*)
        ))
        from offers offe
        LEFT JOIN users ur ON (ur.id = offe.offerer)
        where offe.sellnotice = s.id
    )
) as sellnotice
from sellnotice s
LEFT JOIN users se ON (se.id = s.seller)
LEFT JOIN users bu ON (bu.id = s.buyer)
LEFT JOIN books b ON (b.id = s.book)
where seller = '${id}'
`);

export const getWhereBuyer = (client: any, id: string) => 
client.query(`
select json_build_object(
    'id', s.id,
    'allowoffers', s.allowoffers,
    'price', s.price,
    'opened', s.opened,
    'closes', s.closes,
    'finalprice', s.finalprice,
    'status', s.status,
    'buyer', row_to_json(bu.*),
    'seller', row_to_json(se.*),
    'book', row_to_json(b.*),
    'offers', (
        select json_agg(json_build_object (
            'id', offe.id,
            'sellnotice', offe.sellnotice,
            'offer', offe.offer,
            'created', offe.created,
            'offerer', row_to_json(ur.*)
        ))
        from offers offe
        LEFT JOIN users ur ON (ur.id = offe.offerer)
        where offe.sellnotice = s.id
    )
) as sellnotice
from sellnotice s
LEFT JOIN users se ON (se.id = s.seller)
LEFT JOIN users bu ON (bu.id = s.buyer)
LEFT JOIN books b ON (b.id = s.book)
where buyer = '${id}'
`);

export const set = (data: any, client: any) =>
  client.query(setSellNotice, [
    data.seller,
    data.price,
    data.book,
    data.opened,
    data.closes,
    data.status,
    data.allowOffers,
    data.condition,
    data.markings
  ]);

export const buy = (noticeId: string, buyerId: string, price: string, client: any) =>
  client.query(buySellNotice, [
    buyerId, 
    noticeId,
    price
  ]);

export const bid = (noticeId: string, buyerId: string, price: any, client: any) =>
  client.query(bidSellNotice, [
    noticeId,
    price,
    Math.round((new Date()).getTime() / 1000),
    buyerId,
  ]);

const bidSellNotice = `
INSERT INTO offers (sellnotice, offer, created, offerer)
VALUES (
    $1,
    $2,
    $3,
    $4
) 
`;

const buySellNotice = `
  UPDATE sellnotice
  SET buyer = $1,
      status = 'in-progress',
      finalprice = $3
  WHERE id::text = $2
`;

const setSellNotice = `
  INSERT INTO sellnotice (seller, price, book, opened, closes, status, allowOffers, condition, markings)
  VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
  )
`;
