const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const CONFIG = require('../config/config');

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

const CLASSMETHODS = 'classMethods';
const ASSOCIATE = 'associate';

Object.keys(db).forEach((modelName) => {
    if (CLASSMETHODS in db[modelName].options) {
        if (ASSOCIATE in db[modelName].options[CLASSMETHODS]) {
            db[modelName].options.classMethods.associate(db);
        }
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
