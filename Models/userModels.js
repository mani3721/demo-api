
import { DataTypes } from 'sequelize';

export const userModel = (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
  });
};


  //   student_id: {
  //     type: DataTypes.UUID,
  //     defaultValue: DataTypes.UUIDV4,
  //     primaryKey: true,
  // },
