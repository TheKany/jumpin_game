import { 
  getCustomProperty, 
  incrementCustomProperty, 
  setCustomProperty 
} from "./updatecustom.js"

const SPEED = 0.01;
const dataGround = document.querySelectorAll("[data-ground]");


export function setupGround() {
  setCustomProperty(dataGround[0], "--left",0);
  setCustomProperty(dataGround[1],"--left", 99);
}


// 배경 움직이기
export function updateGround(diffTime, speedScale) {
  Array.from(dataGround).forEach((ground) => {
    incrementCustomProperty(ground, "--left", diffTime * speedScale * SPEED * -1)

    if(getCustomProperty(ground, "--left") < -100) {
      incrementCustomProperty(ground, "--left", 198)
    }
  })
}

