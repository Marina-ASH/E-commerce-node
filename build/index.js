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
require("./middleware/passport");
const auth_1 = __importDefault(require("./middleware/auth"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(errorHandler_1.default);
app.use(passport_1.default.initialize());
app.use('/auth', auth_1.default);
app.use('/order', passport_1.default.authenticate('jwt', { session: false }), orderRoutes_1.default);
app.use('/user', passport_1.default.authenticate('jwt', { session: false }), userRoutes_1.default);
app.use('/product', passport_1.default.authenticate('jwt', { session: false }), productRoutes_1.default);
app.get("/protected", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.user);
    res.send("Vous êtes bien connecté !");
    return res.end();
});
process.on('SIGINT', () => {
    models_1.prisma.$disconnect();
    process.exit();
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
process.on('beforeExit', () => {
    models_1.prisma.$disconnect();
});
