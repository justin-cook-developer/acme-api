const express = require('express');
const router = express.Router();
const { User } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    !user
      ? res.status(404).json({ msg: 'User not found. Invalid id.' })
      : res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const [user, found] = await User.makeUser(req.body);
    found ? res.status(200) : res.status(201);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [_, [user]] = await User.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ msg: `Successfully deleted the user with id: ${id}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
