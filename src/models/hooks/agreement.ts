import { getRandomNumber } from '../../utils/helper';

export const generateDefaultAgreementData = async (agreementInstance): Promise<void> => {
  await agreementInstance.createCollateralAmount({
    hryvnias: getRandomNumber(500, 2000),
    kopiykas: getRandomNumber(0, 99)
  });
};
