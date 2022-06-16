import {
  getCustomProperty, 
  incrementCustomProperty, 
  setCustomProperty
} from "./updatecustom.js";

const SPEED = 0.01;
const WOOD_INTERVAL_MIN = 100;
const WOOD_INTERVAL_MAX = 4000;
const dataWorld = document.querySelector('[data-world]');

let nextWoodTime;

export function setupWood() {

  nextWoodTime = WOOD_INTERVAL_MIN;
  document.querySelectorAll('[data-wood]').forEach((wood) => {
    wood.remove();
  })

}


// 장애물 생성
export function updateWood(delta, speedScale) {
  document.querySelectorAll('[data-wood]').forEach(wood => {
    incrementCustomProperty(wood, '--left', delta * speedScale * SPEED * -1)

    if(getCustomProperty(wood,'--left') <= -100){
      wood.remove();
    }
  })

  if(nextWoodTime <= 0) {
    createWood();
    nextWoodTime = randomTime(WOOD_INTERVAL_MIN, WOOD_INTERVAL_MAX) / speedScale
  }
  nextWoodTime -= delta
}

// 충돌 감지
export function getWoodRects() {
  return [ ...document.querySelectorAll('[data-wood')].map((wood) => {
    return wood.getBoundingClientRect();
  })
}

// 장애물 태그 추가
function createWood() {
  const wood = document.createElement('img');
  wood.dataset.wood = true;
  wood.src = 'image/wood_1.png'
  wood.classList.add('wood');
  setCustomProperty(wood, '--left', 100);
  dataWorld.append(wood)
}

// 장애물 생성 시간 랜덤
function randomTime(min, max) {

  return Math.floor(Math.random() * (max - min + 50) + min);
}