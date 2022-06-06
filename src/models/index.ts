import Client from './client';
import FullName from './fullName';
import Address from './address';
import Agreement from './agreement';
import Car from './car';
import Fine from './fine';
import AmountOfMoney from './amountOfMoney';

Client.hasOne(FullName, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Client.hasOne(Address, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Client.hasMany(Agreement, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Car.hasMany(Agreement, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Agreement.hasMany(Fine, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

AmountOfMoney.belongsTo(Client, {
  as: 'balance',
  foreignKey: {
    name: 'clientId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
AmountOfMoney.belongsTo(Agreement, {
  as: 'collateralAmount',
  foreignKey: {
    name: 'agreementId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
AmountOfMoney.belongsTo(Fine, {
  as: 'fineAmount',
  foreignKey: {
    name: 'fineId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
AmountOfMoney.belongsTo(Car, {
  as: 'rentalCost',
  foreignKey: {
    name: 'carId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default {
  Client,
  FullName,
  Address,
  Agreement,
  Car,
  Fine,
  AmountOfMoney
};
