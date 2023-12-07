import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
  static getAllUsers() {
    return prisma.user.findMany();
  }

  static getUserById(userId: number) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  static createUser(user: { data: any }) {
    return prisma.user.create(user);
  }

  static updateUser(userId: number, updatedUser: { where: any, data: any }) {
    return prisma.user.update(updatedUser);
  }

  static deleteUser(userId: number) {
    return prisma.user.delete({ where: { id: userId } });
  }
}

class ProductModel {
  static getAllProducts() {
    return prisma.product.findMany();
  }

  static getProductById(productId: number) {
    return prisma.product.findUnique({ where: { id: productId } });
  }

  static createProduct(product: { data: any }) {
    return prisma.product.create(product);
  }

  static updateProduct(productId: number, updatedProduct: { where: any, data: any }) {
    return prisma.product.update(updatedProduct);
  }

  static deleteProduct(productId: number) {
    return prisma.product.delete({ where: { id: productId } });
  }
}

class OrderModel {
  static getAllOrders() {
    return prisma.order.findMany();
  }

  static getOrderById(orderId: number) {
    return prisma.order.findUnique({ where: { id: orderId } });
  }

  static createOrder(order: { data: any }) {
    return prisma.order.create(order);
  }

  static updateOrder(orderId: number, updatedOrder: { where: any, data: any }) {
    return prisma.order.update(updatedOrder);
  }

  static deleteOrder(orderId: number) {
    return prisma.order.delete({ where: { id: orderId } });
  }
}

export { prisma, UserModel, ProductModel, OrderModel };
