import express from 'express';
import ClientController from '../controllers/client';

const router = express.Router();

const clientController = new ClientController();

router.get('/clients/:clientId', clientController.getClientById.bind(clientController));
router.get('/clients', clientController.getClients.bind(clientController));
router.post('/clients', clientController.createClient.bind(clientController));
router.post('/clients/fill-db/csv', clientController.createClientsFromCSV.bind(clientController));
router.put('/clients/:clientId', clientController.updateClient.bind(clientController));
router.delete('/clients/:clientId', clientController.deleteClient.bind(clientController));

export default router;
