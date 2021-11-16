const uuidv4 = require('uuid/v4');

module.exports = app => {
    const docker = {};
    const containersDB = app.data.containers;
    const controller = {};

    const {
        containers: containersMock,
    } = containersDB;


    controller.listByIdcontainers = (req, res) => {
        const {
            containerId,
        } = req.params;

        const foundContainerIndex = containersMock.data.find(container => container.id === containerId);

        if (foundContainerIndex === -1) {
            res.status(404).json({
                message: 'Container não encontrado na base.',
                success: false,
                containers: foundContainerIndex,
            });
        } else {
            //containersMock.data.splice(foundContainerIndex, 1);
            res.status(200).json(foundContainerIndex);
        }
    };

    controller.listcontainers = (req, res) => res.status(200).json(containersDB);


    controller.savecontainers = (req, res) => {
        containersMock.data.push({
            Id: uuidv4(),
            ShortId: req.body.Config.Hostname,
            Image: req.body.Config.Image,
            Name: req.body.Name,
            CreatedAt: req.body.Created,
            State: req.body.State,
            Ports: req.body.NetworkSettings.Ports,
            NetworkPorts: req.body.NetworkSettings.Ports
        });

        res.status(201).json(containersMock);
    };

    controller.removecontainers = (req, res) => {
        const {
            containerId,
        } = req.params;

        const foundContainerIndex = containersMock.data.findIndex(container => container.id === containerId);

        if (foundContainerIndex === -1) {
            res.status(404).json({
                message: 'Container não encontrado na base.',
                success: false,
                containers: containersMock,
            });
        } else {
            containersMock.data.splice(foundContainerIndex, 1);
            res.status(200).json({
                message: 'Container encontrado e deletado com sucesso!',
                success: true,
                containers: containersMock,
            });
        }
    };

    controller.updatecontainers = (req, res) => {
        const {
            containerId,
        } = req.params;

        const foundCustomerIndex = containersMock.data.findIndex(container => container.id === containerId);

        if (foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Container não encontrado na base.',
                success: false,
                container: containersMock,
            });
        } else {
            const newContainer = {
                Id: uuidv4(),
                ShortId: req.body.Config.Hostname,
                Image: req.body.Config.Image,
                Name: req.body.Name,
                CreatedAt: req.body.Created,
                State: req.body.State,
                Ports: req.body.NetworkSettings.Ports,
                NetworkPorts: req.body.NetworkSettings.Ports
            };

            containersMock.data.splice(foundCustomerIndex, 1, newContainer);

            res.status(200).json({
                message: 'Container encontrado e atualizado com sucesso!',
                success: true,
                container: containersMock,
            });
        }
    }

    controller.removeAllcontainers = (req, res) => {
        for (let item of imagesMock.data) {            
            const foundImageIndex = imagesMock.data.findIndex(image => image.id === item.Id);
            imagesMock.data.splice(foundImageIndex, 1);
        }
        res.status(200).json({
            message: 'Container encontrado e atualizado com sucesso!',
            success: true,
            images: imagesMock,
        });
    };

    return controller;
}