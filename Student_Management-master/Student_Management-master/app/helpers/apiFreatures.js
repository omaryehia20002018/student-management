const Student = require('../model/studentModel');

class APIFeatures {
  constructor(query) {
    this.query = query;
  }

  async filter() {
    const queryObject = { ...this.query };

    const excludFields = ['page', 'sort', 'limit', 'fields'];
    excludFields.forEach((ele) => delete queryObject[ele]);

    this.modelDocument = await Student.find(queryObject);

    return this;
  }

  async sort() {
    return (this.modelDocument = this.modelDocument.sort('studentName'));
    // return this.modelDocument;
  }
}

module.exports = APIFeatures;
