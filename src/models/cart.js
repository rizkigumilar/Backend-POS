const connection = require('../config/db');

var cart = function cart(data) {
    (this.idCart = data.idCart), (this.idItem = data.idItem), (this.qty = data.qty), (this.Tanggal_Beli = data.Tanggal_Beli)
}

cart.postCart = (data) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT into Cart set ? ', data, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
    })
},

    cart.getAllCart = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT item.name,item.price, item.image, Cart.qty FROM item INNER JOIN Cart ON item.idItem = Cart.idItem', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }

module.exports = cart;