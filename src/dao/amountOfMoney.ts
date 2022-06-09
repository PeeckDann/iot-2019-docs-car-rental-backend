import models from '../models';

export default class AmountOfMoneyDAO {
  public async updateCollateralAmount(agreementId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { agreementId } });
  }

  public async updateRentalCost(carId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { carId } });
  }

  public async updateBalance(clientId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { clientId } });
  }

  public async updateFineAmount(fineId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { fineId } });
  }
}
