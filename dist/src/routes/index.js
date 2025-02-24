"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// importamos los routers
const pets_router_1 = __importDefault(require("./pets.router"));
const user_router_1 = __importDefault(require("./user.router"));
const product_router_1 = __importDefault(require("./product.router"));
const veterinay_router_1 = __importDefault(require("./veterinay.router"));
const donation_route_1 = __importDefault(require("./donation.route"));
const login_1 = __importDefault(require("./login"));
const loginAuth0_1 = __importDefault(require("./loginAuth0"));
//Usé el middleware Router() para crear manejadores de rutas montables y modularizados.
const router = (0, express_1.Router)();
//Paths
router.use("/pets", pets_router_1.default);
router.use("/users", user_router_1.default);
router.use("/products", product_router_1.default);
router.use("/veterinary", veterinay_router_1.default);
router.use("/login", login_1.default);
router.use("/loginAuth0", loginAuth0_1.default);
router.use("/donation", donation_route_1.default);
exports.default = router;
