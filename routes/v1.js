const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const CategoriesController = require('../controllers/categoriesController');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.get('/category', CategoriesController.getAll)
router.get('/category/:id', CategoriesController.get)

module.exports = router;