// 自定义指令文件
export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // dom表示当前指令作用的dom对象
    // dom认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个时间'onerror'
    dom.onerror = function() {
      // dom 可以注册error事件
      dom.src = options.value
    }
  }
}