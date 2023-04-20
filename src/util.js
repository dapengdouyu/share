import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
resource.addResource([
  {
    name: 'imageName',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:'https://gw.alicdn.com/tfs/TB15Upxqk9l0K4jSZFKXXXFjpXa-750-1624.jpg',
      },
    },
    preload: true,
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new ImgSystem(),
  ],
});

const image = new GameObject('image', {
  size: { width: 750, height: 1319 },
  origin: { x: 0, y: 0 },
  position: {
    x: 0,
    y: -319,
  },
  anchor: {
    x: 0,
    y: 0,
  },
});

image.addComponent(
  new Img({
    resource: 'imageName',
  }),
);

game.scene.addChild(image);
game.start()
