import { Router } from "express";
// import { validatorPostProduct } from "../middlewares/validators/product.validator";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductId,
	updateProduct,
} from "../controller/product.controller";
import { authenticateJWT } from "../middlewares/validators/auth.middleware";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", authenticateJWT, createProduct);
productRouter.get("/:id", getProductId);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct)

export default productRouter;
