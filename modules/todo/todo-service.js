/* eslint-disable linebreak-style */

const { checkIdSchema, payloadSchema } = require('./todo-helpers');
const firestoreWrapper = require('./todo-firestoreRepo');

/*
 * @param {status,data} boolean,any
 * @return{status,data} boolean,any
 */
const response = (status, data) => ({ status, data });


/*
 * @return{status,payload} boolean,any
 */
const getToDoservice = async () => {
  const getToDoList = await firestoreWrapper.getData();
  return response(true, getToDoList);
};


/*
 * @param {id} string
 * @return{status,payload} boolean,any
 */
const getSingleToDoService = async (id) => {
  // Validations
  await checkIdSchema.validateAsync({
    id,
  });
  // Business Logic

  const getToDoListByid = await firestoreWrapper.getDataById(id);
  if (getToDoListByid) return response(true, getToDoListByid);
  return response(false, 'no to do found');
};


/*
 * @param {value} object
 * @return{status,payload} boolean,any
 */
const postToDoService = async (value) => {
  // Validations
  await payloadSchema.validateAsync({
    title: value.title,
    toDoDetail: value.toDoDetail,
  });
  // business Logic
 value.updatedAt= Date.now()
 console.log(value)
  const create = await firestoreWrapper.setData(value);
  return response(true, create);
};


/*
 * @param {id,payload} string,object
 * @return{status,payload} boolean,any
 */
const updateToDoService = async (id, payload) => {
  // Validations;
  await checkIdSchema.validateAsync({
    id,
  });
  await payloadSchema.validateAsync({
    title: payload.title,
    toDoDetail: payload.toDoDetail,
  });
  // Business Logic
  payload.updatedAt= Date.now()
  const updateToDoItem = await firestoreWrapper.updateDataById(id, payload);
  if (updateToDoItem) return response(true, updateToDoItem);
  return response(false, 'cannot update');
};


/*
 * @param {id} string
 * @return{status,payload} boolean,any
 */
const deleteToDoService = async (id) => {
  // Validations;
  await checkIdSchema.validateAsync({
    id,
  });
  // Business Logic
  const deleteToDo = await firestoreWrapper.deleteDataById(id);
  if (deleteToDo) return response(true, deleteToDo);
  return response(false, 'Cannot delete');
};


module.exports = {
  getToDoservice,
  getSingleToDoService,
  postToDoService,
  updateToDoService,
  deleteToDoService,
};
