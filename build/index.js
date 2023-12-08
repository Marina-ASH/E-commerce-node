"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const models_1 = require("./models");
const orderRoutes_1 = __importDefault(require("./routers/orderRoutes"));
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
const productRoutes_1 = __importDefault(require("./routers/productRoutes"));
const passport_1 = __importDefault(require("passport"));
require("./utils/passport");
const auth_1 = __importDefault(require("./utils/auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/order', orderRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/product', productRoutes_1.default);
app.use('/auth', auth_1.default);
app.use(passport_1.default.initialize());
app.get("/protected", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.user);
    res.send("Vous êtes bien connecté !");
});
process.on('SIGINT', () => {
    models_1.prisma.$disconnect();
    process.exit();
});
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
process.on('beforeExit', () => {
    models_1.prisma.$disconnect();
});
