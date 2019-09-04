const connection = require('../config/db')

//object constructor
var item = function item(data) {
    (this.name = data.name),
        (this.category = data.category), (this.image = data.image), (this.price = data.price), (this.idItem = data.idItem)
};

item.getitems = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT item.idItem,item.name,item.category,item.image, item.price FROM item  ORDER BY iditem ', (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })

    })
},
    item.getListById = (idItem, result) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT item.idItem,item.name,item.category,item.image, item.price FROM item  
				WHERE idItem = ?`,
                Number(idItem),
                (err, res) => {
                    if (!err) {
                        resolve(res);
                    } else {
                        reject(new Error(err));
                    }
                }
            );
        })
    },

    item.additem = (newitem, result) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO item SET ?', newitem, (err, result) => {
                if (!err) {
                    console.log(result)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    item.updateitem = (updateitem, idItem) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE item SET ? WHERE idItem = ?', [updateitem, idItem], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    item.deleteitem = (item_id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM item WHERE idItem = ?', item_id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },





    module.exports = item;