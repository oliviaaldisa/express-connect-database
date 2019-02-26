const {
    categories
} = require('../models');
const {
    to,
    ReE,
    ReS
} = require('../services/util.service');

const getAll = async (req, res) => {
    try {
        let err, listCategories;

        [err, listCategories] = await to(categories.findAll({
            attributes: ['id', 'name']
        }));
        if (err) return ReE(res, err);

        return ReS(res, {
            data: listCategories
        });
    } catch (e) {
        console.log(e.message)
        return TE(e.message);;
    }
}

module.exports.getAll = getAll;

const create = async function (req, res) {
    try {
        let err;
        let data = req.body;

        [err, category] = await to(categories.create(data));
        if (err) return ReE(res, "There was a problem adding the information to the database.", 422);

        return ReS(res, {
            message: "Category added successfully."
        });

    } catch (e) {
        console.log(e.message);
        return TE(e.message);
    }
}
module.exports.create = create;


const get = async function (req, res) {
    try {
        let category_id = req.params.id;
        let err, category;

        [err, category] = await to(categories.findOne({
            where: {
                id: category_id
            }
        }));
        if (err) return ReE(res, "There was a problem finding the category.", 422);

        return ReS(res, {
            data: category
        });

    } catch (e) {
        console.log(e.message);
        return TE(e.message);
    }
}
module.exports.get = get;

const update = async function (req, res) {
    try {
        let err, category, data;
        let category_id = req.params.id;
        data = req.body;

        [err, category] = await to(categories.findOne({
            where: {
                id: category_id
            }
        }));
        if (err) return ReE(res, "There was a problem finding the category.", 422);

        category.set(data);

        [err, category] = await to(category.save());
        if (err) return ReE(res, "There was a problem updating the category.", 500);

        return ReS(res, {
            message: "Update successful."
        });
    } catch (e) {
        console.log(e.message);
        return TE(e.message);
    }
}
module.exports.update = update;

const remove = async function (req, res) {
    try {
        let category, err;
        let category_id = req.params.id;

        [err, category] = await to(categories.findOne({
            where: {
                id: category_id
            }
        }));
        if (err) return ReE(res, "There was a problem finding the category.", 422);

        if (category) {
            [err, category] = await to(category.destroy());
            if (err) return ReE(res, "There was a problem deleting the category.", 500);
        }

        return ReS(res, {
            message: 'Deleted categories'
        }, 200);
    } catch (e) {
        console.log(e.message);
        return TE(e.message);
    }
}
module.exports.remove = remove;