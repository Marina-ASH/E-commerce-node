"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.ProductModel = exports.UserModel = exports.prisma = void 0;
//import { prisma } from "./utils/database";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
class UserModel {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findMany();
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findUnique({ where: { id: userId } });
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.create({ data: user });
        });
    }
    static updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({ where: { id: userId }, data: updatedUser });
            return prisma.user.findUnique({ where: { id: userId } });
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield prisma.user.delete({ where: { id: userId } });
            return deletedUser;
        });
    }
}
exports.UserModel = UserModel;
class ProductModel {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.findMany();
        });
    }
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.findUnique({ where: { id: productId } });
        });
    }
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.create({ data: product });
        });
    }
    static updateProduct(productId, updatedProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.product.update({ where: { id: productId }, data: updatedProduct });
            return prisma.product.findUnique({ where: { id: productId } });
        });
    }
    static deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield prisma.product.delete({ where: { id: productId } });
            return deletedProduct;
        });
    }
}
exports.ProductModel = ProductModel;
class OrderModel {
    static getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.order.findMany();
        });
    }
    static getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.order.findUnique({ where: { id: orderId } });
        });
    }
    static createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.order.create({ data: order });
        });
    }
    static updateOrder(orderId, updatedOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.order.update({ where: { id: orderId }, data: updatedOrder });
            return prisma.order.findUnique({ where: { id: orderId } });
        });
    }
    static deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedOrder = yield prisma.order.delete({ where: { id: orderId } });
            return deletedOrder;
        });
    }
}
exports.OrderModel = OrderModel;
