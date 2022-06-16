import { updateGround,setupGround } from './ground.js';
import { updateRabbit, setupRabbit, rabbitRange, rabbitGameOver } from './rabbit.js';
import { updateWood, setupWood, getWoodRects } from './wood.js';

// HTML 태그 변수
const dataWorld = document.querySelector('[data-world]');
const dataScore = document.querySelector('[data-score]');
const dataStartScreen = document.querySelector('[data-start-screen]');

const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 70;
const SPEED_SCALE_INCREASE = 0.0001;  // 가속도

let lastTime;
let speedScale;
let score;

// 함수호출
setPixelToWorldScale();

// 이벤트
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, {once: true})

// 모든 컴퓨터가 같은 프레임과 속도를 가지고 있지 않기 때문에 
// 이를 고려하여 이 코드를 통해 일정한 반응속도를 가지게 만든다.
function updateGame(time) {

  if(lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateGame)
    return;
  }

  const diffTime = time - lastTime;

  // 빠르기
  updateGround(diffTime, speedScale);
  // 토끼 움직임
  updateRabbit(diffTime,speedScale);
  // 장애물
  updateWood(diffTime,speedScale)
  // 가속
  updateSpeedScale(diffTime);
  // 점수
  updateScore(diffTime);
  
  // 게임 패배
  if(checkLose()){
    return handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(updateGame)
}

// 게임 오버 발생
function checkLose() {
  const rabbitRect = rabbitRange()
  return getWoodRects().some(rect => isCollision(rect, rabbitRect))
}

// 충돌 발생 했는지
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top 
    )
}

// 시간 가속시 속도 증가
function updateSpeedScale(diffTime) {
  speedScale += diffTime * SPEED_SCALE_INCREASE;
}

// 점수 증가
function updateScore(diffTime) {
  score += diffTime * 0.01;
  dataScore.textContext = Math.floor(score)
}


// 게임 시작
function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupRabbit();
  setupWood();
  dataStartScreen.classList.add("hide");
  window.requestAnimationFrame(updateGame);
}

// 게임 패배
function handleLose() {
  rabbitGameOver();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, {once: true})
    dataStartScreen.classList.remove('hide')
  },100)
}

// 사이트의 크기에 따라 게임의 크기가 달라지게 만드는 코드
function setPixelToWorldScale() {
  let worldToPixelScale
  if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT){
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  }else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  dataWorld.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  dataWorld.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}