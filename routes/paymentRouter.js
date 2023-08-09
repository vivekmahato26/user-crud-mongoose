const { Router } = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const paymentRouter = Router();

// const cart = {
//     items: [{price, qty,name}],
//     totalPrice, totalQty
// }

paymentRouter.post("/checkout", async (req, res) => {
  try {
    const data = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: req.body.title,
              description: req.body.desc,
            },
            unit_amount: parseFloat(req.body.price) * 100,
          },
          quantity: "1",
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment?success=true`,
      cancel_url: `http://localhost:3000/payment?canceled=true`,
    });
    console.log(data);
    res.send(data);
  } catch (error) {
      console.log(error);
      res.send({err: error.message})
  }
  
});

module.exports = paymentRouter;
