import Slider from './slider.js'

document.addEventListener('DOMContentLoaded', ()=>{
  //エレメントを仮で設定（izapackのdata-moduleっぽくしてます）
  let element = document.querySelector('[data-dom="mock"]')
  new Slider(element)
})