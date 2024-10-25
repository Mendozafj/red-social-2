var express = require('express');
var router = express.Router();
var friendRequestController = require("../controllers/friend_request.c");

/* POST crear solicitudes de amistad */
router.post('/', async (req, res) => {
  try {
    const result = await friendRequestController.create(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Solicitud de amistad creada");
  } catch (error) {
    res.status(500).send("Error al crear la solicitud de amistad");
  }
});

/* GET mostrar solicitud de amistad */
router.get('/', async (req, res) => {
  try {
    const friendRequest = await friendRequestController.show();
    res.status(200).send(friendRequest);
  } catch (err) {
    res.status(500).send(`Error al listar solicitudes de amistad: ${err}`);
  }
});

/* GET mostrar solicitud de amistad por id */
router.get('/:id', async (req, res) => {
  try {
    const friendRequest = await friendRequestController.showByID(req.params.id);
    if (!friendRequest[0]) {
      return res.status(404).send(`No se encontró la solicitud de amistad con id: ${req.params.id}`);
    }
    res.status(200).send(friendRequest);
  } catch (err) {
    res.status(500).send(`Error al buscar solicitud de amistad: ${err}`);
  }
});

/* PUT editar solicitud de amistad */
router.put('/:id', async (req, res) => {
  try {
    const result = await friendRequestController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(`Error al editar la solicitud de amistad: ${err}`);
  }
});

/* DELETE eliminar solicitud de amistad */
router.delete('/:id', async (req, res) => {
  try {
    const result = await friendRequestController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Solicitud de amistad eliminada")
  } catch (err) {
    res.status(500).send(`Error al eliminar la solicitud de amistad: ${err}`);
  }
});

module.exports = router;