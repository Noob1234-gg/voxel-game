'use strict';

class Player {
    constructor(name, position, camera) {
        this.name = name;
        this.position = position;
        this.camera = camera;
    }

    move(direction) {
        switch (direction) {
            case 'forwards':
                this.position.z += 1;
                break;
            case 'backwards':
                this.position.z -= 1;
                break;
            case 'left':
                this.position.x -= 1;
                break;
            case 'right':
                this.position.x += 1;
                break;
        }
    }

    lookAround(rotation) {
        this.camera.rotation.y += rotation;
    }

    placeBlock(world, blockType) {
        const blockPosition = { ...this.position };
        world.placeBlock(blockPosition, blockType);
    }

    destroyBlock(world) {
        const blockPosition = { ...this.position };
        world.destroyBlock(blockPosition);
    }
}

module.exports = Player;