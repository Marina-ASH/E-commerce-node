import express from 'express';
import bodyParser from 'body-parser';
import { prisma } from './models';
import orderRoutes from './routers/orderRoutes';
import userRoutes from './routers/userRoutes';
import productRoutes from './routers/productRoutes';
import passport from 'passport';
import './utils/passport';
import auth from './utils/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/order', orderRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/auth', auth);
app.use(passport.initialize());

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
