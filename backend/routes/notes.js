const express = require('express');
const {body, validationResult} = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Payment = require('../models/Payment')
const router = express.Router();


   router.post('/transaction', fetchuser, [
     body('text', "Enter a valid text ").isLength({min: 3}),
     body('amount', "Enter a valid amount ").isLength({min: 1})
   ], async (req, res) => {
try{
const {text, amount} = req.body;

const payment = new Payment({
   text, amount, user: req.user.id
})
const savedPayment = await payment.save()
res.json(savedPayment)

}catch(error){
console.error(error.message);
res.status(500).send("internal server Error");
}
   })
////////////////////////////////////////////////////////////
router.get('/fetchalltransactions', fetchuser, async (req, res) => {
   try{
      const transactions = await Payment.find({user : req.user.id});
      res.json(transactions)
   }catch(error){
      console.error(error.message);
      res.status(400).send("INTERNAL SERVER ERROR")
   }
})

////////////////////////////////////////////////////////////

router.delete('/deltepayment/:id', fetchuser, async(req, res) =>{
   
   try{
      let payment = await Payment.findById(req.params.id);
      if(!payment){return res.status(404).send("NOT FOUND")}
      if(payment.user.toString() !== req.user.id){
         return res.stauts(401).send("NOT ALLOWED")
      }
      payment = await Payment.findByIdAndDelete(req.params.id)
      res.json({"Success": "Payment IS DELETED", payment: payment})
   }catch(error){
    console.error(error.message);
    res.status(400).send("INTERNAL SERVER ERROR")
    }
   
      })
  

module.exports = router