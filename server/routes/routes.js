const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Expense = require('../../models/Expense');

const monthDict = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

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

router.route('/delete').get((req, res) => {
    let id = req.query.id;
    Expense.remove({_id: id}, (err) => {
        if(err) {
            res.send(err);
        }
        res.send('Expense successfully deleted!');
    });
});

router.get('/getAll', (req, res) => {
    let yearRec = req.query.year;
    Expense.find({year: yearRec}, (err, expenses) => {
        if(err) {
            res.send(err);
        }
        expenses.sort((a, b) => {
            return monthDict[a.month] - monthDict[b.month];
        });
        res.json(expenses);
    });
});

module.exports = router;