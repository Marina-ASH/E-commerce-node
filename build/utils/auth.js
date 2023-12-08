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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.prisma.user.findUnique({ where: { email } });
        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const isSamePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isSamePassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        else {
            return jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            }, (err, token) => {
                if (err) {
                    console.error('Erreur lors de la connexion de l\'utilisateur :', err);
                    res.status(500).json({ error: err.message || 'Internal Server Error' });
                }
                else {
                    console.log('Utilisateur connecté avec succès. Jeton JWT généré :', token);
                    res.json({ token });
                }
            });
        }
    }
    catch (e) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', e);
        res.status(500).json({ error: e.message || 'Internal Server Error' });
    }
}));
exports.default = router;
