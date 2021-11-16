const uuidv4 = require('uuid/v4');

module.exports = app => {
    const imagesDB = app.data.images;
    const controller = {};

    const {
        images: imagesMock,
    } = imagesDB;

    controller.listByIdimages = (req, res) => {
        const {
            imageId,
        } = req.params;

        const foundImageIndex = imagesMock.data.findIndex(image => image.id === imageId);

        if (foundImageIndex === -1) {
            res.status(404).json({
                message: 'Imagem não encontrada na base.',
                success: false,
                images: imagesMock,
            });
        } else {
            //imagesMock.data.splice(foundImageIndex, 1);
            res.status(200).json(imagesMock.data[foundImageIndex]);
        }
    };
    
    controller.listimages = (req, res) => res.status(200).json(imagesDB);

    controller.saveimages = (req, res) => {
        imagesMock.data.push({
            Id: uuidv4(),
            ShortId: req.body.Config.Hostname,
            Tag: req.body.Config.tag,
            Name: req.body.Config.name,
            CreatedAt: req.body.Created
        });

        res.status(201).json(imagesMock);
    };

    controller.removeimages = (req, res) => {
        const {
            imageId,
        } = req.params;

        const foundImageIndex = imagesMock.data.findIndex(image => image.id === imageId);

        if (foundImageIndex === -1) {
            res.status(404).json({
                message: 'Imagem não encontrada na base.',
                success: false,
                images: imagesMock,
            });
        } else {
            imagesMock.data.splice(foundImageIndex, 1);
            res.status(200).json({
                message: 'Imagem encontrada e deletada com sucesso!',
                success: true,
                images: imagesMock,
            });
        }
    };

    controller.updateimages = (req, res) => {
        const {
            imageId,
        } = req.params;

        const foundImageIndex = imagesMock.data.findIndex(image => image.id === imageId);

        if (foundImageIndex === -1) {
            res.status(404).json({
                message: 'Imagem não encontrado na base.',
                success: false,
                container: imagesMock,
            });
        } else {
            const newImage = {
                Id: uuidv4(),
                ShortId: req.body.Config.Hostname,
                Tag: req.body.Config.tag,
                Name: req.body.Config.name,
                CreatedAt: req.body.Created
            };

            imagesMock.data.splice(foundImageIndex, 1, newImage);

            res.status(200).json({
                message: 'Imagem encontrado e atualizado com sucesso!',
                success: true,
                container: imagesMock,
            });
        }
    }

    controller.removeAllimages = (req, res) => {
        for (let item of imagesMock.data) {            
            const foundImageIndex = imagesMock.data.findIndex(image => image.id === item.Id);
            imagesMock.data.splice(foundImageIndex, 1);
        }
        res.status(200).json({
            message: 'Imagem encontrada e deletada com sucesso!',
            success: true,
            images: imagesMock,
        });
    };

    return controller;
}