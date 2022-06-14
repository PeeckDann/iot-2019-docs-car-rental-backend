import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';

class Agreement extends ExtendedModel {
  public issueingDate!: number;
  public expectedReturnDate!: number;
  public isArchived!: boolean;
}

Agreement.init(
  {
    issueingDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    expectedReturnDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'agreement'
  }
);

export default Agreement;
