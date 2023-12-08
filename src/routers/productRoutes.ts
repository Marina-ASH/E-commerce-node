import { Request, Response } from 'express';
import express from 'express';
import { validationResult, body } from 'express-validator';
import { ProductModel, prisma } from '../models';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  ProductModel.getAllProducts()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});

router.get('/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  ProductModel.getProductById(productId)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Produit non trouvé' });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
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
  const { name, description, price }: { name: string; description: string; price: number } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
      },
    });

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(204).json({ message: 'Produit supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
