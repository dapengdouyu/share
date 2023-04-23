
import ReactReconciler from 'react-reconciler';
import { Game, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import * as IMAGE from '@eva/plugin-renderer-img'
import * as DragonBone from '@eva/plugin-renderer-dragonbone'
const config={
  'image':IMAGE.Img,
  'dragonBone':DragonBone.DragonBone
}
const rootHostContext={}
const childHostContext={}
const noop=()=>{}
const hostConfig = {
  now: Date.now,
  getRootHostContext:noop,
  removeChildFromContainer(){},
  detachDeletedInstance(){},
  clearContainer(){},
  degetRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, props, rootContainerInstance, _currentHostContext, workInProgress) => {
    const node = new GameObject(type,props)
    node.addComponent(new config[type](props.compoentProps||{}))
    return node
  },
  createTextInstance: text => {
  },
  appendInitialChild: (parent, child) => {
    parent.addChild(child);
  },
  appendChild(parent, child) {
    parent.addChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.addChild(child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {

  },
  commitTextUpdate(textInstance, oldText, newText) {
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  }
};
const ReactReconcilerInst = ReactReconciler(hostConfig);
import('react-devtools-core').then(({ connectToDevTools }) => {
  connectToDevTools()
  ReactReconcilerInst.injectIntoDevTools({
    version: '17.0.2',
    bundleType: 0,
    rendererPackageName: 'react-reconciler'
  })
})
export  function render(reactElement, canvas, callback){
    // 创建一个根容器
    if (!canvas._rootContainer) {
      // hostConfig: 是一个对象，它具有多个方法。这些方法描述了容器如何在底层进行渲染
      // rootHostContext: 是一个对象，它描述了与根节点相关的环境和配置信息。该对象包含以下方法：
      const game = new Game({
        systems: [
          new RendererSystem({
            // transparent: true,
            canvas,
            width: 750,
            height: 1000
          }),
          new IMAGE.ImgSystem(),
          new DragonBone.DragonBoneSystem()
        ],
        autoStart: true
      })
      // 此处还在考虑如何设置默认场景的宽高
      game.scene.transform.size = {
        width: 750,
        height: 1000
      }
      window.game=game
      canvas._rootContainer = ReactReconcilerInst.createContainer(game.scene,false);
    }
    /**
     * @description 更新根容器
     * element：需要被渲染的顶层 React 元素，可以是一个组件也可以是 DOM 元素。
     * container：目标容器。
     * parentComponent：可选参数，表示在哪个组件上下文中进行渲染。如果没有提供，则默认为 null。
     *  callback：可选的回调函数，用于通知更新完成。
     */
    return ReactReconcilerInst.updateContainer(reactElement, canvas._rootContainer);
  }


