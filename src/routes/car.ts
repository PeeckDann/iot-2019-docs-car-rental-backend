import express from 'express';
import CarController from '../controllers/car';

const router = express.Router();

const carController = new CarController();

router.get('/cars/:carId', carController.getCarById.bind(carController));
router.get('/cars', carController.getCars.bind(carController));
router.post('/cars', carController.createCar.bind(carController));
router.post('/cars/fill-db/csv', carController.createCarsFromCSV.bind(carController));
router.put('/cars/:carId', carController.updateCar.bind(carController));
router.delete('/cars/:carId', carController.deleteCar.bind(carController));

export default router;
