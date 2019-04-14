import app from './main';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
declare const module: any;
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}

export default server;
