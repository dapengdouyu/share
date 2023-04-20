import { Game, GameObject, resource, RESOURCE_TYPE,LOAD_EVENT } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { DragonBone, DragonBoneSystem } from '@eva/plugin-renderer-dragonbone'
import { EventSystem,Event } from '@eva/plugin-renderer-event'
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
        // transparent: true,
        canvas: document.querySelector('#canvas'),
        width: 750,
        height: 1000
      }),
      new DragonBoneSystem(),
      new EventSystem()
    ],
      autoStart: true
  })

  // 此处还在考虑如何设置默认场景的宽高
  game.scene.transform.size = {
    width: 750,
    height: 1000
  }
  // game.scene.background.transparent = true

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
  const evt=dragonBone.addComponent(
    new Event({

    })
  )
  let isComplete=true,index=0;
  db.on('complete', () => {
    isComplete = true
    db.play('idle')
  })
  evt.on('touchstart', () => {
    if (isComplete) {
      isComplete = false
      db.play(['hello', 'heart'][index++ % 2], 1)
    }
  })
  db.play('idle',1)
  game.scene.addChild(dragonBone)
})
resource.preload()

