const express = require('express');
const router = express.Router();
const {
  addtodocontroller,
  gettodocontroller,
  getSingleToDoController,
  deleteToDoController,
  updateToDoController,
} = require('./todo-controllers.js');

router.route('/all').get(gettodocontroller).post(addtodocontroller);
router
  .route('/:id')
  .get(getSingleToDoController)
  .put(updateToDoController)
  .delete(deleteToDoController);

module.exports = router;
