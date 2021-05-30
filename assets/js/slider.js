/**
 * 完成该区域的轮播功能
 * 该函数需要实现手指滑动切换、自动切换
 * @param {HTMLDocument} container 轮播容器
 * @param {Number} duration 自动切换的时间间隔，0表示不切换
 * @param {Function} callback 完成切换后需要调用的函数
 * @return {Function} 返回一个函数，调用函数，可以随意切换显示的子项
 */
function createSlider(container, duration, callback) {
  let sliderItemArr = container.children; // 子元素集合
  let sliderCount = sliderItemArr.length; // 轮播项个数
  let sliderFirstItem = sliderItemArr[0]; // 第一个子元素
  let sliderFirstItemW = sliderFirstItem.offsetWidth; // 子元素的宽度

  let curIndex = 0; // 记录当前显示的是第几个

  /**
   * 设置容器高度为当前显示板块的高度
   */
  function setHeight() {
    container.style.height = sliderItemArr[curIndex].offsetHeight + 'px';
  }
  setHeight();

  /**
   * 
   * @param {Number} index 指定下标 
   */
  function switchTo (index) {
    if (index < 0) {
      index = 0;
    }
    if (index > sliderCount - 1) {
      index = sliderCount - 1;
    }
    curIndex = index; // 改变当前显示的索引值
    sliderFirstItem.style.transition = 'all .3s'; // css 属性在.3s内完成
    // 设置第一个子元素的marginLeft为-xx容器的宽度
    sliderFirstItem.style.marginLeft = -sliderFirstItemW * index + 'px';
    setHeight();
    // 切换后，调用callback
    callback && callback(index)
  }

  let timer; // 定时器setInterval

  // 自动切换
  function startAuto() {
    if (timer || duration === 0) {
      // 已经有计时器了，说明已经正在自动切换中
      // 或
      // 不能自动切换
      return;
    }
    timer = setInterval(_ => {
      switchTo( ++curIndex % sliderCount);
    }, duration)
  }

  // 停止自动切换
  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  startAuto()

  // 手指滑动切换
  container.addEventListener('touchstart', touchstart.bind(this));
  container.addEventListener('touchmove', touchmove.bind(this));
  container.addEventListener('touchend', touchend.bind(this));

  function touchstart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    // 记录元素的当前marginLeft
    this.sliderML = parseFloat(sliderFirstItem.style.marginLeft) || 0;
    // 停止自动轮播
    stopAuto();
    // 停止过度效果
    sliderFirstItem.style.transition = 'none';
  }

  function touchmove(e) {
    this.moveX = e.touches[0].clientX;
    this.moveY = e.touches[0].clientY;
    //手指在横轴上移动了多远
    let disX = this.moveX - this.startX; 
    let disY = this.moveY - this.startY;
    // 如果横向的移动距离小于了纵向的移动距离，啥也不做
    if (Math.abs(disY) > Math.abs(disX)) {
      return;
    }

    // 计算新的marginLeft
    let computedML = this.sliderML + disX;
    // 边界判断
    let minML = -(sliderCount - 1) * sliderFirstItemW;
    let maxML = 0;
    if (computedML < minML) {
      computedML = minML;
    }
    if (computedML > maxML) {
      computedML = maxML;
    }
    // 当手指左右滑动的时候，取消浏览器的默认行为
    e.preventDefault();
    e.cancelBubble = true;
    // console.log(e);
    sliderFirstItem.style.marginLeft = computedML + 'px'
  }

  function touchend(e) {
    this.endX = e.changedTouches[0].clientX;
    this.endY = e.changedTouches[0].clientY;
    let disX = this.endX - this.startX;
    let disY = this.endY - this.startY;

    // 误差值 如果横向滑动的距离不到30px，认为是误点，不做页面切换
    if (disX < -30) {
      // 向左滑动
      switchTo(curIndex + 1)
    } else if (disX > 30) {
      // 向右滑动
      switchTo(curIndex - 1)
    }
    // 自动切换
    startAuto()
    // 移除监听事件
    container.removeEventListener('touchstart', touchstart.bind(this));
    container.removeEventListener('touchmove', touchmove.bind(this));
    // container.addEventListener('touchend', touchend.bind(this));
  }

  return switchTo;
}




/**
 * @param {HTMLDocument} blockContainer
 */

function createBlock(blockContainer) {
  let menu = blockContainer.querySelector('.block-menu');
  let menuList = menu.children;
  let sliderWrapper = blockContainer.querySelector('.slider-wrapper');
  let goTo = createSlider(sliderWrapper, 0, (i) => {
    let ac = menu.querySelector('.active');
    if (ac) {
      ac.classList.remove('active');
    }
    menuList[i].classList.add('active')
  });
  // 给菜单注册点击事件
  for (let i = 0; i < menuList.length; i++) {
    menuList[i].onclick = function (e) {
      goTo(i)
    }
  }

}