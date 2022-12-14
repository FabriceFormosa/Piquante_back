const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/',auth,sauceCtrl.getAllSauces);
router.get('/:id',auth,sauceCtrl.getOneSauce);
router.post('/',auth,multer,sauceCtrl.addOneSauce);
router.put('/:id',auth,multer,sauceCtrl.updateOneSauce);
router.delete('/:id',auth,sauceCtrl.deleteOneSauce);
router.post('/:id/like',auth,sauceCtrl.like);

module.exports = router;