"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const agency_routes_1 = __importDefault(require("./routes/agency.routes"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const bodyParser = require('body-parser');
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekatDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/agency', agency_routes_1.default);
router.use('/image', image_routes_1.default);
router.use('/properties', property_routes_1.default);
const path = require('path');
router.use('/uploads', express_1.default.static(path.join('./src/uploads')));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map