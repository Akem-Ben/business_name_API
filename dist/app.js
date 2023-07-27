"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const companyRoute_1 = __importDefault(require("./routes/companyRoute"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const syncDatabase = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Connected to the database.');
        await database_1.default.sync({ force: false }).then(() => {
            console.log('Database synced successfully');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
syncDatabase();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use('/company', companyRoute_1.default);
// async function startApp() {
//   try {
//     await db.sync({});
//     console.log('Database synchronized');
//   } catch (error) {
//     console.error('Error synchronizing database:', error);
//   }
// }
// startApp();
app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on Port ${process.env.PORT || 3000}`);
});
