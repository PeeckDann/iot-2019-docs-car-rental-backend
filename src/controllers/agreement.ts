import { Request, Response } from 'express';
import { CustomError, handleEndpointError } from '../utils/errorHandler';
import AgreementDAO from '../dao/agreement';
import AmountOfMoneyDAO from '../dao/amountOfMoney';
import AmountOfMoney from '../models/amountOfMoney';

export default class AgreementController {
  private agreementDAO: AgreementDAO;
  private amountOfMoneyDAO: AmountOfMoneyDAO;

  constructor() {
    this.agreementDAO = new AgreementDAO();
    this.amountOfMoneyDAO = new AmountOfMoneyDAO();
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

  public async issueAgreement(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { carId, newAgreement, newCollateralAmount } = req.body;

      const clientBalance = await this.amountOfMoneyDAO.getBalance(clientId);
      const carRentalCost = await this.amountOfMoneyDAO.getRentalCost(carId);

      //@ts-ignore
      const totalCost = AmountOfMoney.addAmounts(carRentalCost, newCollateralAmount);
      //@ts-ignore
      const newClientBalance = AmountOfMoney.subtractAmounts(clientBalance, totalCost);
      if (!newClientBalance) {
        throw new CustomError('Balance is not sufficient!');
      }

      const agreement = await this.agreementDAO.createAndGetAgreement(clientId, carId, newAgreement);
      await this.amountOfMoneyDAO.createCollateralAmount(agreement.id, newCollateralAmount);
      await this.amountOfMoneyDAO.updateBalance(clientId, newClientBalance);
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

  public async closeAgreement(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { agreementId } = req.params;

      const clientBalance = await this.amountOfMoneyDAO.getBalance(clientId);
      const collateralAmount = await this.amountOfMoneyDAO.getCollateralAmount(agreementId);

      //@ts-ignore
      const newClientBalance = AmountOfMoney.addAmounts(clientBalance, collateralAmount);

      await this.amountOfMoneyDAO.updateBalance(clientId, newClientBalance);
      await this.agreementDAO.updateAgreementArchievedStatus(agreementId);
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
