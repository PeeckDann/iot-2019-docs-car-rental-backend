import express from 'express';
import AgreementController from '../controllers/agreement';

const router = express.Router();

const agreementController = new AgreementController();

router.get('/agreements/:agreementId', agreementController.getAgreementById.bind(agreementController));
router.get('/agreements', agreementController.getAgreementsForClient.bind(agreementController));
router.post('/agreements', agreementController.issueAgreement.bind(agreementController));
router.post('/agreements/fill-db/csv', agreementController.createAgreementsFromCSV.bind(agreementController));
router.put('/agreements/:agreementId', agreementController.closeAgreement.bind(agreementController));
router.delete('/agreements/:agreementId', agreementController.deleteAgreement.bind(agreementController));

export default router;
