const connection = require('../config/db');

var transaksi = function transaksi(data) {
    (this.idBuy = data.idBuy), (this.JumlahItem = data.JumlahItem), (this.tanggalBeli = data.tanggalBeli), (this.JumlahTotal = data.JumlahTotal)
};


transaksi.getList = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT transaksi.idBuy,transaksi.JumlahTotal,transaksi.JumlahItem, transaksi.transaksi_date as tanggalBeli FROM transaksi ORDER BY idBuy desc`,
            (err, res) => {
                if (!err) {
                    resolve(res);
                } else {
                    reject(new Error(err));
                }
            }
        );
    });
};

transaksi.createtransaksi = (newtransaksi, result) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO transaksi SET ?', newtransaksi, (err, res) => {
            if (!err) {
                resolve(newtransaksi)
            } else {
                reject(new Error(err))
            }
        });

    })
};


module.exports = transaksi;