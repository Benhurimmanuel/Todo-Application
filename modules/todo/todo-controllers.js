/* eslint-disable linebreak-style */
const {
  getToDoservice,
  getSingleToDoService,
  postToDoService,
  updateToDoService,
  deleteToDoService,
} = require('./todo-service');


const addtodocontroller = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log(payload)
    const result = await postToDoService(payload);
    res.json({status:true,data:result})
  } catch (error) {
    next(error);
  }
};

const gettodocontroller = async (req, res, next) => {
  try {
    const result = await getToDoservice();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleToDoController = async (req, res, next) => {
  try {
    const id = req.params;
    const result = await getSingleToDoService(id.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const deleteToDoController = async (req, res, next) => {
  try {
    const id = req.params;
    const result = await deleteToDoService(id.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const updateToDoController = async (req, res, next) => {
  try {
    const id = { ...req.params };
    const payload = req.body;
    const result = await updateToDoService(id, payload);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addtodocontroller,
  gettodocontroller,
  getSingleToDoController,
  deleteToDoController,
  updateToDoController,
};
