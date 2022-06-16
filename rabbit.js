import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updatecustom.js";

const dataRabbit = document.querySelector('[data-rabbit]')
const JUMP_SPEED = 0.35;
const GRAVITY = 0.001
const RABBIT_FRAME_COUNT = 6;
const FRAME_TIME = 100;

let isJumping;
let rabbitFrame;
let recentFrameTime;
let rabbitYAxis;

function handleRun(diffTime) {

  // 점프 시 이미지
  if(isJumping) {
    dataRabbit.src = `image/run_0.png`
    return;
  }

  // 토끼 달리는 동작
  if(recentFrameTime >= FRAME_TIME) {
    rabbitFrame = (rabbitFrame + 1) % RABBIT_FRAME_COUNT;
    dataRabbit.src = `image/run_${rabbitFrame}.png`
    recentFrameTime -= FRAME_TIME;
  }
  recentFrameTime += diffTime;

}

function handleJump(diffTime) {
  if(!isJumping) {
    return;
  }
  incrementCustomProperty(dataRabbit, '--bottom' ,rabbitYAxis * diffTime);
  
  if(getCustomProperty(dataRabbit, '--bottom') <= 16) {
    setCustomProperty(dataRabbit, '--bottom', 16)
    isJumping = false;
  }

  rabbitYAxis -= GRAVITY * diffTime;

}

function onJump(e) {
  if(e.code !== 'Space' || isJumping) {
    return
  }

  rabbitYAxis = JUMP_SPEED;
  isJumping = true;
}

export function setupRabbit() {
  isJumping = true;
  rabbitFrame = 0;
  recentFrameTime = 0;
  rabbitYAxis = 0;
  setCustomProperty(dataRabbit,'--bottom', 15);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateRabbit(diffTime) {

  handleRun(diffTime);
  handleJump(diffTime);
}

export function rabbitRange() {
  return dataRabbit.getBoundingClientRect();
}

export function rabbitGameOver() {
  dataRabbit.src = 'image/game_over.png';
}

