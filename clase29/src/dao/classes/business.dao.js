import businessModel from "../models/business.model.js";

export default class business {
  getBusiness = async () => {
    try {
      const business = await businessModel.find();
      return business;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getBusinessById = async (id) => {
    try {
      const business = await businessModel.findOne({ _id: id });
      return business;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  saveBusiness = async (business) => {
    try {
      const result = await businessModel.create(business);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateBusiness = async (id, business) => {
    try {
      const business = await businessModel.updateOne({ _id: id }, { $set: business });
      return business;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
