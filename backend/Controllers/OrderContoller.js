import orderModel from "../Models/OrderModel.js";
import userModel from "../Models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// Placing a user order from frontend

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{carData: {}});
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100*80 // Convert to cents
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 2*100*80 // Delivery charge in cents
            },
            quantity: 1,
        });
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url });
} catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if(success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({ success: true, message: "Paid" });
        } else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not Paid" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

// user orders for frontend

const usersOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({ success: true, data:orders });
    } catch (error) {
        res.json({ success: false, message: "Error" });
        console.error(error);
    }
}
export {placeOrder, verifyOrder, usersOrder};