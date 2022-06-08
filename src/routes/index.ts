import express from 'express';

import authRoutes from './auth';
import { checkAuth } from '../middleware/auth';
import clientRoutes from './client';
// import fullNameRoutes from './fullName';
// import addressRoutes from './address';
// import agreementRoutes from './agreement';
// import carRoutes from './car';
// import fineRoutes from './fine';
// import amountOfMoneyRoutes from './amountOfMoney';

const router = express.Router();

router.use(authRoutes);
router.use(checkAuth);
router.use(clientRoutes);
// router.use(fullNameRoutes);
// router.use(addressRoutes);
// router.use(agreementRoutes);
// router.use(carRoutes);
// router.use(fineRoutes);
// router.use(amountOfMoneyRoutes);

export default router;
