import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';

class AmountOfMoney extends ExtendedModel {
  public hryvnias!: number;
  public kopiykas!: number;
}

AmountOfMoney.init(
  {
    hryvnias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kopiykas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'amountOfMoney'
  }
);

export default AmountOfMoney;
