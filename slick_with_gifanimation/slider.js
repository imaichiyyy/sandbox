export default class {
  constructor(element,config){
    this.element = element
    this.slider = undefined
    this.currentNumber = 0
    this.reserveNumber = null
    this.query = 0
    this.el = {
      animation: this.element.querySelector('[data-dom="animation"]'),
      preload: undefined,
      preloaditem: []
    }
    this.init()
    this.bindEvents()
  }
  init(){
    this.preloadImageInit()

    //initのタイミングでGifアニメをプリロードするか、スライド切替時にLazyロードした方がよいです
    this.slider = $('[data-dom="slider"]').slick()

    //下記関数発火で1枚目のGifアニメが動き出すので、スクロールイベントと組み合わせる
    this.startAnimation()
  }
  bindEvents(){
    this.slider.on('beforeChange', (event, slick, currentSlide)=>{
      this.reserveNumber = (slick.slideCount-1 === currentSlide) ? 0 : parseInt(currentSlide+1)
      if(this.reserveNumber !== currentSlide) {
        this.preloadImage()
      }
    })
    this.slider.on('afterChange', (event, slick, currentSlide)=>{
      if(this.currentNumber !== currentSlide) {
        this.currentNumber = currentSlide
        this.startAnimation()
      }
    })
  }
  preloadImageInit(){
    let preload = document.createElement('div')
    preload.setAttribute('data-dom', 'preload')
    document.body.appendChild(preload)
    this.el.preload = document.querySelector('[data-dom="preload"]')
    for(let i = 0; i < this.element.querySelectorAll('[data-role="slideritem"]').length; i=i+1){
      let img = document.createElement('img')
      img.setAttribute('data-role', 'preloaditem')
      img.setAttribute('src', this.el.animation.getAttribute('src'))
      this.el.preload.appendChild(img)
      this.el.preloaditem.push(img)
    }
  }
  preloadImage(){
    this.query = this.ramdomQuery()
    this.el.preloaditem[this.reserveNumber].setAttribute('src', 'anime' + this.reserveNumber + '.gif?r=' + this.query)
  }
  startAnimation(){
    this.el.animation.setAttribute('src', 'anime' + this.currentNumber + '.gif?r=' + this.query)
  }
  ramdomQuery(){
    return Math.floor(Math.random() * 1000000000)
  }
}
