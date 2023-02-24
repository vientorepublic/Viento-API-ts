import express from 'express';
import asyncify from 'express-asyncify';
import path from 'path';
import fs from 'fs';
import consola from 'consola';

const app = asyncify(express());
const config = require(path.join(__dirname, "dist", "modules", "env.js"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port:number = Number(config.port) || 3000;
const apiVersion:number = Number(config.apiVersion);

app.use("/", require("./dist/routes/main"));
fs.readdirSync(path.join(__dirname, "dist", "routes", "api", `v${apiVersion}`)).forEach(file => {
    if (file.endsWith(".js")) {
        try {
            const route = require(path.join(__dirname, "dist", "routes", "api", `v${apiVersion}`, file));
            app.use(`/${file.split(".")[0]}`, route);
            consola.info(`Loaded Route: ./dist/routes/api/v${apiVersion}/${file}`);
        } catch (err) {
            consola.error(err);
        }
    }
});

app.get('*', function(req, res) {
    res.status(404).json({ status: 404 });
});

app.listen(port, () => {
    consola.success(`Server is running on port ${port}!`);
});