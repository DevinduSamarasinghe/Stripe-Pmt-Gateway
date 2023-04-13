import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPESECRET);

export const paymentIntent = async (req, res,next) => {
  const { product, token } = req.body;
  try {
    const pmtInvoice = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "sgd",
      payment_method_types: ["card"],
      receipt_email: "devindu990@gmail.com",
      description: "3% of your purchase goes toward our ocean cleanup effort!",
    });
    console.log("Payment Intent Successful");
    res.status(201).json({ pmtInvoice });
    next();
  } catch (error) {
    console.log("Error in Payment Intent");
    res.status(400).json({
      message: error,
    });
  }
};

export const charge = async(req,res)=>{
    const {product,token} = req.body;
    try{
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const trnNo = uuidv4();
        const charges = await stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
        },
        {
            idempotencyKey: trnNo,
        });
        console.log("Charge Successful");
        res.status(200).json({charges});
    }catch(error){
        res.status(404).json({
            message:error
        })
        console.log("Charge Unsuccessful!");
    }
}
  
