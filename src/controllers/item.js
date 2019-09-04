const item = require('../models/item')
const resultRespon = require('../helpers/helper')
const cloudinary = require('cloudinary')


exports.listById = (req, res) => {
    const idItem = req.params.idItem;
    item.getListById(idItem)
        .then((resultitem) => {
            resultRespon.response(res, resultitem, 200);
        })
        .catch((err) => {
            console.log(err);
        });
},
    exports.additem = async (req, res) => {
        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.CLOUDNAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }

        let newitem = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: await geturl(),
        }
        item.additem(newitem)
            .then(() => {
                resultRespon.response(res, newitem, 200);
            })
            .catch((err) => {
                console.log(err);
            })
    },

    exports.updateitem = (req, res) => {
        const item_id = req.params.idItem

        const updateitem = new item(req.body)

        item.updateitem(updateitem, item_id)
            .then((resultUser) => {
                const result = resultUser[0]
                resultRespon.response(res, updateitem, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    exports.deleteitem = (req, res) => {
        const item_id = req.params.idItem

        item.deleteitem(item_id)
            .then((resultUser) => {
                const result = resultUser[0]
                resultRespon.response(res, item_id, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    exports.getitems = (req, res) => {
        var jumlah = 0
        item.getitems()
            .then((resultitem) => {
                jumlah = resultitem.length
            })
        const search = req.query.search || ''
        const page = req.query.page || ''
        item.getitems(search, page)
            .then((resultitem) => {
                const result = resultitem
                // console.log(result);
                resultRespon.response(res, result, 200, jumlah)
            })
            .catch((error) => {
                console.log(error)
            })
    }