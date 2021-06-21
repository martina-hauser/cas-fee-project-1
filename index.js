const app = (await import('./app.js')).app;
const port = 3000;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
