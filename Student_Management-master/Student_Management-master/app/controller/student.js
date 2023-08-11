const Student = require('../model/studentModel');

exports.getStudents = async (req, res) => {
  try {
    //--------------------- Filtering
    let queryObject = { ...req.query };

    const queryProperties = ['studentName', 'academicYear'];
    const excludFields = ['page', 'sort', 'limit', 'fields'];

    queryProperties.forEach((el) => {
      if (queryObject[el])
        queryObject[el] = queryObject[el].split('-').join(' ');
    });

    excludFields.forEach((el) => delete queryObject[el]);

    let data = Student.find(queryObject);

    //--------------------- Sorting
    if (req.query.sort) {
      data = data.sort(req.query.sort);
    } else {
      data = data.sort('-createdAt');
    }

    //--------------------- Limits
    if (req.query.fields) {
      const selectedFields = req.query.fields.split(',').join(' ');
      data = data.select(selectedFields);
    }

    //--------------------- Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;

    data = data.limit(limit).skip(skip);

    const students = await data;

    res.status(200).json({
      status: 'Success',
      results: students.length,
      data: students,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findById(id);
    if (!student) return res.status(404).send('No data found');

    res.status(200).json({
      status: 'Success',
      data: student,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const {
      studentName,
      birthDate,
      email,
      academicYear,
      teachingRoomNumber,
      modulePoints,
    } = req.body;

    if (
      !(studentName && birthDate && email && academicYear && teachingRoomNumber)
    ) {
      return res.status(400).send('All the fields are required');
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).send('Student already exist');

    const student = new Student({
      studentName: studentName
        .split(' ')
        .filter((el) => el !== '')
        .join(' '),
      birthDate,
      email,
      academicYear,
      teachingRoomNumber,
      modulePoints,
    });
    const newStudent = await student.save();

    res.status(201).json({
      status: 'Created with success',
      data: newStudent,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) return res.status(404).send('Not found');

    res.status(200).json({
      status: 'Updated with success',
      data: updatedStudent,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) return res.status(404).send('Not found');

    res.status(204).json({
      status: 'Deleted with success',
      data: null,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.studentBirthYear = async (req, res) => {
  try {
    const year = +req.params.year;

    const studentsDate = await Student.aggregate([
      {
        $match: {
          birthDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },

      {
        $sort: { birthDate: 1 },
      },
    ]);

    res.status(200).json({
      status: 'Success',
      resultes: studentsDate.length,
      data: studentsDate,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
