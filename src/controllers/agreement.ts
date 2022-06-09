import { Request, Response } from 'express';
import { handleEndpointError } from '../utils/errorHandler';
import AgreementDAO from '../dao/agreement';

export default class AgreementController {
  private agreementDAO: AgreementDAO;

  constructor() {
    this.agreementDAO = new AgreementDAO();
  }

  public async getAgreementById(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const agreement = await this.agreementDAO.getAgreementById(agreementId);
      res.send(agreement);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getAgreementsForClient(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const agreements = await this.agreementDAO.getAgreementsForClient(clientId);
      res.send(agreements);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createAgreement(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { carId, newAgreement } = req.body;
      await this.agreementDAO.createAgreement(clientId, carId, newAgreement);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createAgreementsFromCSV(req: Request, res: Response) {
    try {
      await this.agreementDAO.createAgreementsFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async updateAgreement(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const updatedAgreement = req.body;
      await this.agreementDAO.updateAgreement(agreementId, updatedAgreement);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async deleteAgreement(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      await this.agreementDAO.deleteAgreement(agreementId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }
}
