// 导入所需的依赖库
import Reconciler from 'react-reconciler';
import { Game, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import * as IMAGE from '@eva/plugin-renderer-img'
import * as DragonBone from '@eva/plugin-renderer-dragonbone'
let game=null
const noop = () => { }

const returnNull = () => null
const returnFalse = () => false
const now = (() => {
  const initDate = Date.now()
  return () => Date.now() - initDate
})()
function handleErrorInNextTick(error) {
  setTimeout(() => {
    throw error
  }, 0)
}

function microTask(callback) {
  return Promise.resolve(null).then(callback).catch(handleErrorInNextTick)
}
const config={
  'image':IMAGE.Img,
  'dragonBone':DragonBone.DragonBone
}
// 创建渲染器

const evaRenderer = {
  /**
  * 节点实例创建
  */
  // 普通节点的创建 例如DOM的Element类型
  createInstance(type,props) {
    const node = new GameObject(type,props)
    node.addComponent(new config[type](props.compoentProps||{}))
    return node
  },
  // 文本节点的创建 例如DOM的Text类型
  createTextInstance(text) {

  },
  // 在节点未挂载的状态下，会调用这个来添加子节点
  appendInitialChild(parentInstance, child) {

  },
  // ReactDOM通过这个属性和commitMount配置实现表单元素的autofocus功能
  finalizeInitialChildren(instance, _, props) {

  },
  prepareUpdate() {

  },
  shouldSetTextContent: returnFalse,
  // 获取根容器的上下文，只在根节点调用一次
  getRootHostContext() {
    return {game}
  },
  // 获取子节点的上下文信息, 每遍历一个节点都会调用一次
  getChildHostContext() {
    return {}
  },
  // 获取可公开的节点实例，即你愿意暴露给用户的节点信息，用户通过ref可以获取到这个对象。一般自定义渲染器原样返回即可, 除非你想有选择地给用户暴露信息
  getPublicInstance(instance) {
    return instance
  },
  prepareForCommit: returnNull,
  now: now,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsMicrotask: true,
  scheduleMicrotask: microTask,
  isPrimaryRenderer: true,
  /* Mutation Methods */
  // 添加子节点，在提交阶段被执行
  appendChild(parentInstance, child) {
    console.log('appendChild')
    parentInstance.addChild(child)
  },
  // 添加子节点到容器节点(根节点)
  appendChildToContainer(container, child) {
    console.log('appendChildToContainer')
    container.addChild(child)
  },
  // 插入子节点
  insertBefore(parentInstance, child, beforeChild) {

  },
  // 插入子节点到容器节点(根节点)
  insertInContainerBefore(container, child, beforeChild) {

  },
  // 删除子节点
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  },
  // 从容器节点(根节点)中移除子节点
  removeChildFromContainer(container, child) {
    container.removeChild(child)
  },
  // 文本节点提交，
  commitTextUpdate(textInstance, _, nextText) {
    textInstance.nodeValue = nextText
  },
  commitUpdate(instance, _payload, _type, prevProps, nextProps) {

  },
  hideInstance(instance) {

  },
  unhideInstance(instance, props) {

  },
  clearContainer: noop,
  preparePortalMount: noop,
  resetAfterCommit() {

  },
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false
};

// 使用 createReconciler 方法创建 reconciler
const evaReconciler = Reconciler(evaRenderer);

// 基于reconciler实例渲染组件树
function render(Component, canvas) {
  game = new Game({
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
  const root = evaReconciler.createContainer(game.scene);


  
  evaReconciler.updateContainer(Component, root, null);
}

export { render };
