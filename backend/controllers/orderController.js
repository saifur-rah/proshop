import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//create/place a new order
const addOrderItems=asyncHandler(async (req,res) =>{
   const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   } = req.body;
   if(orderItems && orderItems.length ===0){
    res.status(400);
    throw new Error('No order items')
   }else{
    const order=new Order({
        orderItems: orderItems.map((x)=>({
         ...x,
         product:x._id,
         _id:undefined,

        }

        )),
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
   }
});

//get logged in user orders
const getMyOrders=asyncHandler(async (req,res) =>{
    const orders=await Order.find({user:req.user._id});
    res.status(200).json(orders);
})

//get order by id
const getOrderById=asyncHandler(async (req,res) =>{
    const order=await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order Not Found');
    }
})

//update order to paid
const updateOrderToPaid=asyncHandler(async (req,res) =>{
    res.send('update order to paid');
})

//update order to delivered/admin
const updateOrderToDelivered=asyncHandler(async (req,res) =>{
    res.send('update order to delivered');
})

//get all orders/admin
const getOrders=asyncHandler(async (req,res) =>{
    res.send('get all orders');
})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
}