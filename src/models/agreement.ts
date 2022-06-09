import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';
import { generateDefaultAgreementData } from './hooks/agreement';

class Agreement extends ExtendedModel {
  public issueingDate!: number;
  public expectedReturnDate!: number;
}

Agreement.init(
  {
    issueingDate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expectedReturnDate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'agreement',
    hooks: {
      async afterCreate(agreementInstance) {
        await generateDefaultAgreementData(agreementInstance);
      }
    }
  }
);

export default Agreement;
