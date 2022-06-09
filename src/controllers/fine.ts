import { Request, Response } from 'express';
import { handleEndpointError } from '../utils/errorHandler';
import FineDAO from '../dao/fine';

export default class FineController {
  private fineDAO: FineDAO;

  constructor() {
    this.fineDAO = new FineDAO();
  }

  public async getFineById(req: Request, res: Response) {
    try {
      const { fineId } = req.params;
      const fine = await this.fineDAO.getFineById(fineId);
      res.send(fine);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getFines(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const fines = await this.fineDAO.getFines(agreementId);
      res.send(fines);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createFine(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const newFine = req.body;
      await this.fineDAO.createFine(agreementId, newFine);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createFinesFromCSV(req: Request, res: Response) {
    try {
      await this.fineDAO.createFinesFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async updateFine(req: Request, res: Response) {
    try {
      const { fineId } = req.params;
      const updatedFine = req.body;
      await this.fineDAO.updateFine(fineId, updatedFine);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async deleteFine(req: Request, res: Response) {
    try {
      const { fineId } = req.params;
      await this.fineDAO.deleteFine(fineId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }
}
