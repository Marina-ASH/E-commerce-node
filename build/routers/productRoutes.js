"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    models_1.ProductModel.getAllProducts()
        .then((products) => res.status(200).json(products))
        .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    models_1.ProductModel.getProductById(productId)
        .then((product) => {
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    })
        .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        const newProduct = yield models_1.ProductModel.createProduct({ data: productData });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id, 10);
    const { name, description, price } = req.body;
    try {
        const updatedProduct = yield models_1.prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
            },
        });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id, 10);
    try {
        yield models_1.prisma.product.delete({
            where: { id: productId },
        });
        res.status(204).json({ message: 'Produit supprimé' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}));
exports.default = router;
