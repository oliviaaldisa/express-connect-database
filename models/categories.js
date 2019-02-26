module.exports = (sequelize, type) => {
    var categories = sequelize.define('categories', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        createdAt: {
            type: type.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        updatedAt: type.DATE
    }, {
        // classMethods: {
        //     associate: (models) => {
        //         categories.hasOne(models.products);
        //     }
        // }
    });

    categories.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return categories;
};