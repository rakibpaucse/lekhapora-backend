const db = require('../database')

exports.postOrderHandler = async(req, res) => {
  const orderInfo = req.body;
  console.log(orderInfo)
  const orders = await db.query(`INSERT INTO orders (OrderId, CustomerId, ProductId, PaymentId, ShipperId, SupplierID, OrderDate, OrderStatus, QCService, NFC, RequestForDemo, Size, Color, Quantity, NetPrice, TotalPrice) VALUES ('PAIK-875965', 'PAIK-C-0001', 'PAIK-P-1589', 'Payoneer', 'PAIK-SH-0169', 'PAIK-SU-0872', '24-05-2021', 'Pending', '${orderInfo.takenQC ? 1 : 0}', '${orderInfo.selectedcNf}', '0', '${orderInfo.size}', '${orderInfo.color}', '99', '${orderInfo.selectedQuantity}', '${orderInfo.selectedQuantity*1.15}')`);
  res.json({ msg: ' succesfull'})
}
// exports.orderController = (req , res , next ) => {
    
//   req.session.destroy((err) => {
//       if(err){
//           console.log(err);
//           return next(err)
//       }

//      return res.redirect('')
//   })
// }