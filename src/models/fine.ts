import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';

class Fine extends ExtendedModel {
  public reason!: string;
}

Fine.init(
  {
    reason: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'fine'
  }
);

export default Fine;
