import { Model, DataTypes } from "sequelize";
import sequelize from '../config/database'
// import db from '../config/database';

export interface CompaniesAttributes {
    id: string;
    reg_no: string;
    company_name: string;
    date_registered: Date;
    address: string;
}

class Companies extends Model<CompaniesAttributes> {
    // id!: string;
    // reg_no!: string;
    // company_name!: string;
    // date_registered!: Date;
    // address!: string;
}

Companies.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: false,
      },
      reg_no: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      date_registered: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
        sequelize,
        modelName: "Company",
        timestamps: true
    }
);

export default Companies;