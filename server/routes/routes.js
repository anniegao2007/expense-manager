const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Expense = require('../../models/Expense');

router.get('/', (req, res) => {
    res.render('index');
});

router.route('/insert').post((req, res) => {
    let expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year
    });
    expense.save((err) => {
        if(err) {
            res.send(err);
        }
        res.send('Another $' + req.body.amount + ' spent.');
    });
});

router.route('/update').post((req, res) => {
    let doc = {
        description: req.body.description,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year
    };
    Expense.update({_id: req.body.id}, doc, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send('Expense successfully updated!');
    });
});

router.get('/delete', (req, res) => {
    let id = req.query.id;
    Expense.find({_id: id}).remove().exec((err, expense) => {
        if(err) {
            res.send(err);
        }
        res.send('Expense successfully deleted!');
    });
});

router.get('/getAll', (req, res) => {
    let monthRec = req.query.month;
    let yearRec = req.query.year;
    if(monthRec && monthRec != 'All') {
        Expense.find({ $and: [ {month: monthRec}, {year: yearRec} ]}, (err, expenses) => {
            if(err) {
                res.send(err);
            }
            res.json(expenses);
        });
    } else {
        Expense.find({year: yearRec}, (err, expenses) => {
            if(err) {
                res.send(err);
            }
            res.json(expenses);
        });
    }
});

module.exports = router;