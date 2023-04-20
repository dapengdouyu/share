import { Game, GameObject, resource, RESOURCE_TYPE,LOAD_EVENT } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { DragonBone, DragonBoneSystem } from '@eva/plugin-renderer-dragonbone'

resource.addResource([
  {
    name: 'dragonbone',
    type: RESOURCE_TYPE.DRAGONBONE,
    src: {
      image: {
        type: 'png',
        url: 'https://static0.xesimg.com/tailor/game/homepage_girl_ancient/homepage_girl_ancient_tex.png'
      },
      tex: {
        type: 'json',
        url: 'https://static0.xesimg.com/tailor/game/homepage_girl_ancient/homepage_girl_ancient_tex.json'
      },
      ske: {
        type: 'json',
        url: 'https://static0.xesimg.com/tailor/game/homepage_girl_ancient/homepage_girl_ancient_ske.json'
      }
    },
    preload: true
  }
])
resource.on(LOAD_EVENT.COMPLETE, () => {
  const game = new Game({
    systems: [
      new RendererSystem({
        canvas: document.querySelector('#canvas'),
        width: 750,
        height: 1000
      }),
      new DragonBoneSystem()
    ],
      autoStart: true
  })

  // 此处还在考虑如何设置默认场景的宽高
  game.scene.transform.size = {
    width: 750,
    height: 1000
  }

  // dragonbone 的 origin 是失效的，将会按照 dragonbone 设计时的坐标重点定位
  const dragonBone = new GameObject('db', {
    anchor: {
      x: 0.5,
      y:1
    },
    position: {
      x: 0,
      y: 3
    },
  })

  const db=dragonBone.addComponent(
    new DragonBone({
      resource: 'dragonbone',
      armatureName: 'homepage_girl_ancient'
    })
  )
  db.play('idle')
  game.scene.addChild(dragonBone)
})
resource.preload()

