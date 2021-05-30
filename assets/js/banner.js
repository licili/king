
window.banner = (function () {
  console.log('h');
  class Banner {
    constructor(content, options) {
      this.content = content;
      this.options = options;
      this.$IMG = [];
      this.$INDICATEITEM = [];
      // 初始化组件
      return this.init();
    }
    init() {
      let element =  this.createElement();
      this.carousel();
      return element;
    }
    carousel () {
      let { duration, showArrow, showIndicate } = this.options;
      let $IMG = this.$IMG,
        $INDICATEITEM = this.$INDICATEITEM,
        index = 0;
      $IMG[0].style.opacity = 1;
      $INDICATEITEM[0].style.backgroundColor = '#4b67af';


      setInterval(() => {
        index += 1;
        if (index >= $IMG.length) {
          index = 0;
        }
        for (let i = 0; i < $IMG.length; i++) {
          $IMG[i].style.opacity = 0;
        }

        $IMG[index].style.opacity = 1;
      }, duration)
    }
    createElement () {
      this.$WRAPER = this.create('div', `width: 100%;
        height: 3.38rem;
        position: relative;
      `)
      // this.$IMG = this.create('img', `
      //   position: absolute;
      //   width: 100%;
      //   transition: all linear 0.5s;
      //   opacity: 0;
      // `)
      this.$INDICATEWRAPPER = this.create('ol', `
        position: absolute;
        bottom: 0.5rem;
        right: 0;
        margin-right: 0.3rem;
      `)
      // this.$INDICATEITEM = this.create('li', `
      //   float: left;
      //   width: 0.18rem;
      //   height: 0.18rem;
      //   margin-left: 0.2rem;
      //   border-radius: 0.03rem;
      //   background-color: #fff;
      // `)
      let content = this.content;
      let { duration, showArrow, showIndicate } = this.options;
      for (let i = 0; i < content.length; i++) {
        this.$IMG[i]= this.create('img',`position: absolute;
        width: 100%;
        transition: all linear 0.5s;
        opacity: 0;`)
        this.$INDICATEITEM[i] = this.create('li', `
        float: left;
        width: 0.18rem;
        height: 0.18rem;
        margin-left: 0.2rem;
        border-radius: 0.03rem;
        background-color: #fff;`)
        this.$IMG[i].setAttribute('src', content[i].url);
        this.$IMG[i].setAttribute('alt', content[i].alt);
        this.$WRAPER.appendChild(this.$IMG[i]);
        if (showIndicate) {
          this.$INDICATEWRAPPER.appendChild(this.$INDICATEITEM[i]);
        }
      }
      this.$WRAPER.appendChild(this.$INDICATEWRAPPER);
      console.log(this.$WRAPER);
      return this.$WRAPER;
    }
    create (type,cssText) {
      let element = document.createElement(type);
      element.style.cssText = cssText;
      return element;
    }
  }
  return function proxy (content,options={}) {
    if (typeof content === 'undefined') {
      throw new Error('你必须传递正确的参数')
    }
    if (options === null || typeof options !== 'object') {
      return new Error('options 是个对象啊！看看文档去')
    }
    options = Object.assign({
      duration: 5 * 1000,
      showArrow: true,
      showIndicate:true
    }, options)
    return new Banner(content,options)
  }
})()