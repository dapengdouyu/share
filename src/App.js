import { useEffect } from 'react';
import './App.css';
import { render } from './react-eva/two'
import { resource, RESOURCE_TYPE, LOAD_EVENT } from '@eva/eva.js'
import { useRef } from 'react';
// 添加图片资源
resource.addResource([
  {
    name: 'imageName',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/imgextra/i1/O1CN01376pu91tylcmKqXIt_!!6000000005971-2-tps-658-1152.png'
      }
    },
    preload: true
  },
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
function CanvasRender() {
  const props = {
    size: { width: 750, height: 1000 },
    position: {
      x: 0,
      y: 0
    },
    anchor: {
      x: 0,
      y: 0
    },
    compoentProps: {
      resource: 'imageName'
    }
  }
  return <>
    <image {...props} />
    <dragonBone {
      ...{
        anchor: {
          x: 0.5,
          y: 1
        },
        position: {
          x: 0,
          y: 3
        },
        compoentProps: {
          resource: 'dragonbone',
          armatureName: 'homepage_girl_ancient',
          animationName: 'idle'
        }
      }
    } />

  </>
}

function App() {
  const ref = useRef({})
  useEffect(() => {
    resource.on(LOAD_EVENT.COMPLETE, () => {
      render(<CanvasRender />, ref.current)
    })
    resource.preload()
  }, [])

  return (
    <div className="App">
      <div className='dom'>我是dom元素</div>
      <canvas id="canvas" width="750" height="1000" ref={ref} />
    </div>
  );
}

export default App;
