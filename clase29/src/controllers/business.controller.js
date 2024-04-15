import Business from '../dao/classes/business.dao.js'

const businessService= new Business()


// export const getBusiness = async (req, res) => {
//   res.status(200).send({ status: "success", result: "getBusiness" });
// };
// export const getBusinessById = async (req, res) => {
//   res.status(200).send({ status: "success", result: "getBusinessByID" });
// };
// export const createBusiness = async (req, res) => {
//   res.status(200).send({ status: "success", result: "createBusiness" });
// };
// export const addProduct = async (req, res) => {
//   res.status(200).send({ status: "success", result: "addProduct" });
// };

export const getBusiness = async (req, res) => {
  const result = await businessService.getBusiness();
  if (!result)
    return res.status(500).send({
      status: "error",
      error: "Something went wrong, try again later",
    });
  res.status(200).send({ status: "success", result: result });
};
export const getBusinessById = async (req, res) => {
  const { bid } = req.params;
  const result = await businessService.getBusinessById(bid);
  if (!result)
    return res.status(500).send({
      status: "error",
      error: "Something went wrong, try again later",
    });
  res.status(200).send({ status: "success", result: result });
};
export const createBusiness = async (req, res) => {
  const business = req.body;
  const result = await businessService.saveBusiness(business);
  if (!result)
    return res.status(500).send({
      status: "error",
      error: "Something went wrong, try again later",
    });
  res.send({ status: "success", result: result });
};
export const addProduct = async (req, res) => {
  const product = req.body;
  const business = await businessService.getBusinessById(req.params.bid);
  //pusheamos al business.products
  business.products.push(product);
  const result = await businessService.updateBusiness(business._id, business);
  if (!result)
    return res.status(500).send({
      status: "error",
      error: "Something went wrong, try again later",
    });
  res.send({ status: "success", result: "Business updated" });
};

