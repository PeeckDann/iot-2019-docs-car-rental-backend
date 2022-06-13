import express from 'express';
import FineController from '../controllers/fine';

const router = express.Router();

const fineController = new FineController();

router.get('/agreements/:agreementId/fines/:fineId', fineController.getFineById.bind(fineController));
router.get('/agreements/:agreementId/fines', fineController.getFines.bind(fineController));
router.post('/agreements/:agreementId/fines', fineController.createFine.bind(fineController));
router.post('/agreements/:agreementId/fines/fill-db/csv', fineController.createFinesFromCSV.bind(fineController));
router.put('/agreements/:agreementId/fines/:fineId', fineController.updateFine.bind(fineController));
router.delete('/agreements/:agreementId/fines/:fineId', fineController.closeFine.bind(fineController));

export default router;
