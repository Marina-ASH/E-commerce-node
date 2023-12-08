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
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    models_1.UserModel.getAllUsers()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    models_1.UserModel.getUserById(userId)
        .then((user) => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    })
        .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});
router.post('/', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield models_1.UserModel.createUser({
            data: {
                email,
                password: encryptedPassword,
            },
        });
        res.status(201).json(newUser);
    }
    catch (e) {
        res.status(500).json({ error: e.message || 'Erreur interne du serveur' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const updatedUserData = req.body;
    try {
        const updatedUser = yield database_1.default.user.update({
            where: { id: userId },
            data: updatedUserData,
        });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    yield database_1.default.user.delete({
        where: {
            id: userId,
        },
    });
    return res.status(204).json({ message: 'User deleted' });
}));
exports.default = router;
