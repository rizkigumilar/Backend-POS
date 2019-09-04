const express = require('express')
const Route = express.Router()

const item = require('../controllers/item')
const transaksi = require('../controllers/transaksi')
const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })


Route
    .get('/item', item.getitems)
    .get('/item/:idItem', item.listById)
    .get('/history', transaksi.getAll)
    .post('/item', upload.single('image'), item.additem)
    .post('/send', transaksi.send)
    .post('/transaksi', transaksi.buy)
    .patch('/item/:idItem', item.updateitem)
    .delete('/item/:idItem', item.deleteitem)

module.exports = Route