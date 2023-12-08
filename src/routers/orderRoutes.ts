import express from 'express';
import { OrderModel } from '../models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const order = await OrderModel.getOrderById(orderId);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const orderData = req.body;

  try {
    const newOrder = await OrderModel.createOrder({ data: orderData });
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const updatedOrderData = req.body;

  try {
    const updatedOrder = await OrderModel.updateOrder(orderId, {
      where: { id: orderId },
      data: updatedOrderData,
    });

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const deletedOrder = await OrderModel.deleteOrder(orderId);

    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
