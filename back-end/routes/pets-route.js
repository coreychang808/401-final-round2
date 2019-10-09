'use strict';

const express = require('express');
const petRouter = express.Router();
const uuid = require ('uuid/v1');

const pet1 = {
  _id: uuid(),
  name: 'dog',
  favoriteToy: 'ball',
}
const pet2 = {
  _id: uuid(),
  name: 'cat',
  favoriteToy: 'mouse',
}
const pet3 = {
  _id: uuid(),
  name: 'bird',
  favoriteToy: 'flower',
}

let pets = [
  pet1,
  pet2,
  pet3
]


petRouter.get('/toys', (request, response) => {
  response.status(200).json(pets);
});

petRouter.post('/toys', (request, response) => {
  const newPets = {_id: uuid(), name: request.body.name, favoriteToy: request.body.favoriteToy};
  pets.push(newPets);
  response.send(newPets);
});

petRouter.delete('/toys', (request, response) => {
  const deleteId = request.body._id;
  pets.forEach((pet, idx) => {
    if (pet._id === deleteId) {
      pets.splice(idx, 1);
    }
  })
  response.send(pets);
});


module.exports = petRouter;