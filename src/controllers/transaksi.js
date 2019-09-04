const transaksi = require('../models/transaksi');
const respon = require('../helpers/helper');
const sgMail = require('@sendgrid/mail');

exports.getAll = (req, res) => {
    transaksi.getList()
        .then((result) => {
            respon.response(res, result, 200);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.buy = (req, res) => {
    const newtransaksi = {
        idBuy: req.body.idBuy,
        JumlahItem: req.body.JumlahItem,
        JumlahTotal: req.body.JumlahTotal,
        transaksi_date: new Date(),
    }
    transaksi.createtransaksi(newtransaksi)
        .then(() => {
            respon.response(res, newtransaksi, 200);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.send = (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: req.body.email,
        from: 'ikiw@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg)
        .then((result) => {
            respon.response(res, result, 200);
        })
        .catch((err) => {
            console.log(err);
        });
}

