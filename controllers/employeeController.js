const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, salary, date } = req.body;
    const newEmployee = new Employee({ firstName, lastName, email, salary, date });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const { sortBy, sortOrder, page, pageSize } = req.query;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const employees = await Employee.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(pageSize));

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
