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

exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
