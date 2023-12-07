"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.ProductModel = exports.UserModel = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
class UserModel {
    static getAllUsers() {
        return prisma.user.findMany();
    }
    static getUserById(userId) {
        return prisma.user.findUnique({ where: { id: userId } });
    }
    static createUser(user) {
        return prisma.user.create(user);
    }
    static updateUser(userId, updatedUser) {
        return prisma.user.update(updatedUser);
    }
    static deleteUser(userId) {
        return prisma.user.delete({ where: { id: userId } });
    }
}
exports.UserModel = UserModel;
class ProductModel {
    static getAllProducts() {
        return prisma.product.findMany();
    }
    static getProductById(productId) {
        return prisma.product.findUnique({ where: { id: productId } });
    }
    static createProduct(product) {
        return prisma.product.create(product);
    }
    static updateProduct(productId, updatedProduct) {
        return prisma.product.update(updatedProduct);
    }
    static deleteProduct(productId) {
        return prisma.product.delete({ where: { id: productId } });
    }
}
exports.ProductModel = ProductModel;
class OrderModel {
    static getAllOrders() {
        return prisma.order.findMany();
    }
    static getOrderById(orderId) {
        return prisma.order.findUnique({ where: { id: orderId } });
    }
    static createOrder(order) {
        return prisma.order.create(order);
    }
    static updateOrder(orderId, updatedOrder) {
        return prisma.order.update(updatedOrder);
    }
    static deleteOrder(orderId) {
        return prisma.order.delete({ where: { id: orderId } });
    }
}
exports.OrderModel = OrderModel;
