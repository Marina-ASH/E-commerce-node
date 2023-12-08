import express from 'express';
import { ProductModel } from '../models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await ProductModel.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = await ProductModel.createProduct({ data: productData });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const updatedProductData = req.body;

  try {
    const updatedProduct = await ProductModel.updateProduct(productId, {
      where: { id: productId },
      data: updatedProductData,
    });

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const deletedProduct = await ProductModel.deleteProduct(productId);

    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
