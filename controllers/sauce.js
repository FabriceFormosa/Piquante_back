const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    console.log(' getAllSauces Requête reçue !');
    Sauce.find()
    .then(sauces =>
        {
            if( !sauces)
            {
                console.log(' Aucune sauce !');
                res.status(200).json({ error: 'Aucune sauce !' });
            }
            
            else{
                console.log(' sauce(s) trouvée(s) !');
                res.status(200).json(sauces);
            }
            
        } )
        .catch(error => res.status(400).json({ error }));
    };
    
    exports.addOneSauce = (req, res, next) => {
        const sauceObject = JSON.parse(req.body.sauce)
        delete sauceObject._id;
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
    };
    
    exports.getOneSauce = (req, res, next) => {
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
    };
    
    exports.deleteOneSauce = (req, res, next) => {
        console.log(' deleteOneSauce Requête reçue !');
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée!'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
    };
    
    exports.updateOneSauce = (req, res, next) => {
        console.log(' updateOneSauce Requête reçue !');
        const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    };

    exports.like = (req, res, next) => {
        // const sauceObject = JSON.parse(req.body.sauce)
        // delete sauceObject._id;
        // const sauce = new Sauce({
        //     ...sauceObject,
        //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // });
        // sauce.save()
        // .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        // .catch(error => res.status(400).json({ error }));
    };

    
    
    