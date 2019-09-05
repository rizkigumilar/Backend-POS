const cart = require('../models/cart');
const respon = require('../helpers/helper');

exports.cart = (req, res) => {
    const data = {
        idItem: Number(req.body.idItem),
        qty: Number(req.body.qty),
        Tanggal_Beli: new Date()
    }
    cart.postCart(data)
        .then((result) => {
            respon.response(res, data, 200)
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.getCart = (req, res) => {
    cart.getAllCart()
        .then((result) => {
            let data = result
            let total = 0
            result.map((item, key) => {
                total = (item.price * item.qty) + total
            })
            console.log(total)
            respon.response(res, data, 200, null, total)
        })
        .catch((error) => {
            console.log(error)
        })
}
