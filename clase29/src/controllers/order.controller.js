// export const getOrder = async (req, res) => {
//   res.status(200).send({ status: "success", result: "getOrder" });
// };
// export const getOrderById = async (req, res) => {
//   res.status(200).send({ status: "success", result: "getOrderByID" });
// };
// export const createOrder = async (req, res) => {
//   res.status(200).send({ status: "success", result: "createOrder" });
// };
// export const resolveOrder = async (req, res) => {
//   res.status(200).send({ status: "success", result: "resolveOrder" });
// };
//Parte 1
// export const getOrders = async (req, res) => {
//   res.send({ status: "success", result: "getOrders" });
// };
// export const getOrderById = async (req, res) => {
//   res.send({ status: "success", result: "getOrderById" });
// };
// export const createOrder = async (req, res) => {
//   res.send({ status: "success", result: "createOrder" });
// };
// export const resolveOrder = async (req, res) => {
//   res.send({ status: "success", result: "resolveOrder" });
// };

import User from "../dao/classes/user.dao.js";
import Business from "../dao/classes/business.dao.js";
import Order from "../dao/classes/order.dao.js";
//instanciamos las clases

const userService = new User();
const businessService = new Business();
const orderService = new Order();

export const getOrders = async (req, res) => {
  const result = await orderService.getOrders();
  res.send({ status: "success", result });
};

export const getOrderById = async (req, res) => {
  const { oid } = req.params;
  const order = await orderService.getOrderById(oid);
  res.send({ status: "success", result: order });
};

export const createOrder = async (req, res) => {
  //traemos el usuario el negocio, y los productos
  const { user, business, products } = req.body;

  //buscamos el usuario, y el negocio
  const resultUser = await userService.getUserById(user);
  const resultBusiness = await businessService.getBusinessById(business);
  //filtramos los productos que tienen el negocio
  const actualOrders = resultBusiness.products.filter((product) =>
    products.includes(product.id)
    );
  //calcular precio total
  const sum = actualOrders.reduce((acc, prev) => (acc += prev.price), 0);
  //construimos la orden
  const orderNumber = Math.floor(Math.random() * 10000 + 1); //revisar
  
  const order = {
    number: orderNumber,
    business,
    user,
    status: "pending",
    products: actualOrders.map((product) => product.id),
    totalPrice: sum,
  };
  //guardar la orden
  const orderResult = await orderService.createOrder(order);
  //console.log(orderResult._id);
  //le asiganmos la orden al usuario
  resultUser.orders.push(orderResult._id);
  // //actualizamos el usuario
   await userService.updateUser(user, resultUser);
  //mostramos la orden
  res.send({ status: "success", result: orderResult });
};

export const resolveOrder = async (req, res) => {
  const { resolve } = req.body;
  //buscamos la orden
  const order = await orderService.getOrderById(req.params.oid);
  //asignamos el status a la order
  order.status = resolve;
  //actualizamos la orden
  await orderService.resolveOrder(order._id, order);
  res.send({ status: "success", result: "Order resolved" });
};
