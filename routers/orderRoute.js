const router = require('express').Router()


const {postOrderHandler} = require('../controllers/orderController')


router.post('/list', postOrderHandler)



module.exports = router