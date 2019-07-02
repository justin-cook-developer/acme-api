const express = require('express');
const router = express.Router();
const { User, Department } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    !department
      ? res.status(404).json({ msg: 'User not found. Invalid id.' })
      : res.json(department);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [department, found] = await Department.makeDepartment(req.body);
    found ? res.status(200) : res.status(201);
    res.json(department);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [_,[department]] = await Department.updateDepartment(req.params.id, req.body);
    res.json(department)
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Department.destroy({ where: { id } });
    res.json({ msg: `Successfully deleted the Department with id: ${id}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
