import express from 'express';
import bodyParser from 'body-parser';
import { prisma } from './models';
import orderRoutes from './routers/orderRoutes';
import userRoutes from './routers/userRoutes';
import productRoutes from './routers/productRoutes';
import passport from 'passport';
import './middleware/passport';
import auth from './middleware/auth';
import errorHandlerMiddleware from './middleware/errorHandler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandlerMiddleware);
app.use(passport.initialize());
app.use('/auth', auth);

app.use('/order', passport.authenticate('jwt', { session: false }), orderRoutes);
app.use('/user',passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/product',passport.authenticate('jwt', { session: false }), productRoutes);

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send("Vous êtes bien connecté !");
  }
);

process.on('SIGINT', () => {
    prisma.$disconnect();
    process.exit();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('beforeExit', () => {
  prisma.$disconnect();
});
