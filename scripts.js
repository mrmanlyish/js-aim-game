const targets = document.querySelectorAll(".target");
const targetsArr = Array.from(targets);
const startButton = document.querySelector('button');
const playableArea = document.querySelector('.grid');
const accuracy = document.querySelector('.accuracy');
const score = document.querySelector('.score');
const resett = document.querySelector(`.resett`);
const timer = document.querySelector('.timer');
const mobileTargets = document.querySelectorAll(".mobile");
const mobileTargetsArr = Array.from(mobileTargets);
const desktopTargets = document.querySelectorAll(".desktop");
const desktopTargetsArr = Array.from(desktopTargets);
const clickSound = new Audio("./soundfx/loweredtrimmedallshots.mp3");
const resetClickSound = new Audio ("./soundfx/loweredtrimmedresetclick.mp3");
const startClickSound = new Audio("./soundfx/loweredtrimmedstartsound.mp3");
const targetHitSound = new Audio("./soundfx/loweredtrimmedtargethit.mp3");

// audio play functions on click
const playClickSound =() => {
    clickSound.currentTime = 0; // resets audio to allow for consecutive clicks
    clickSound.play();
}
const playResetClickSound =() => {
    resetClickSound.play();
}

const playStartClickSound =() => {
    startClickSound.play();
}

const playTargetHitSound =() => {
    targetHitSound.currentTime = 0; // resets audio to allow for consecutive clicks
    targetHitSound.play();
}

// media query for js, senses if screen is wider than 1080px or taller than 550px
const screenWidth = window.matchMedia('(orientation: landscape) and (min-width: 1080px)');
const screenHeight = window.matchMedia('(orientation: landscape) and (min-height: 550px)');
const portraitScreenWidth = window.matchMedia('(orientation: portrait) and (min-width: 540px)');

const screenHeightChange = () => {
    screenHeight.addEventListener("change", () => {
    });
}

const screenWidthChange = () => {
    screenWidth.addEventListener("change", () => {
    });
}

const portraitScreenWidthChange = () => {
    portraitScreenWidth.addEventListener("change", () => {
    });
} 

// timer starts at 30
let time = 30;

//hides all spheres
const hideAll = () => {
    screenWidthChange();
    screenHeightChange();
    portraitScreenWidthChange();
    // if screen is 1080px wide, adds hidden to and removes visible class from all targets
    if (screenWidth.matches || screenHeight.matches || portraitScreenWidth.matches) {
        targetsArr.forEach((target) => {
            target.classList.add("hidden");
            target.classList.remove("visible")
        })
    } else {
        // adds hidden to and removes visible class from only mobile targets
        mobileTargetsArr.forEach((mobileTarget) => {
            mobileTarget.classList.add("hidden");
            mobileTarget.classList.remove("visible");
        });
        // might be unnecessary
        desktopTargetsArr.forEach((desktopTarget) => {
            desktopTarget.classList.remove("hidden");
        })
    }
}
// hideAll();

// selects 3 random spheres to be visible on start click
const showRandomSpheres = () => {
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    });
    let ranNumArr = [];
    while (ranNumArr.length < 3) {
        let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        if(ranNumArr.indexOf(ranNum) === -1) {
            ranNumArr.push(ranNum);
        }
    }
    hiddenTargetsArr[ranNumArr[0]].classList.add("visible"), hiddenTargetsArr[ranNumArr[0]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[1]].classList.add("visible"), hiddenTargetsArr[ranNumArr[1]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[2]].classList.add("visible"), hiddenTargetsArr[ranNumArr[2]].classList.remove("hidden");
}

// starts game, resets score, accuracy, hides all spheres, shows 3 random spheres
const startGame = () => {
    startButton.addEventListener("click", () => {
        time = 30;
        playStartClickSound()
        hardReset();
        hideAll();
        showRandomSpheres();
        const timeStart = setInterval(() => { // starts timer
            if (time >= 1 && time <= 30) {
                timer.innerHTML = `${time} secs`;
                time --;
            } else if (time = 1) { // resets timer 
                clearInterval(timeStart);
                time = 30;
                timer.innerHTML = `${time} secs`
                hideAll();
            }
        }, 1000);
        startButton.disabled = true;
    });
}
startGame();

// random target appear on click
const targetAppear = () => {
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    })
    let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        hiddenTargetsArr[ranNum].classList.add("visible");
        hiddenTargetsArr[ranNum].classList.remove("hidden");
}

// target disappear on click
const targetVanish = (target) => {
    target.classList.add("hidden");
    target.classList.remove("visible");
}

let targetClickCounter = 0
let clickCounter = 0

// updates score and accuracy, logs total clicks on playable area
const totalClicks = () => {
    playableArea.addEventListener("click", () => {
        if (time < 30) {
            clickCounter ++;
        }
        accuracyUpdater();
        scoreUpdater();
        playClickSound();
    });
}
totalClicks();

// disappears the target clicked, appears another random target, +1 to targetclickCounter
const targetClick = () => {
        targetsArr.forEach((target) => {
            target.addEventListener("click", () => {
                playTargetHitSound();
                targetAppear();
                targetVanish(target);
                targetClickCounter ++;
            })
        });
}
targetClick();

// updates accuracy with each click
const accuracyUpdater = () => {
    if ((targetClickCounter/clickCounter * 100).toFixed(0) > 100) {
        accuracy.innerHTML = `accuracy: 100%`
    } else if ((targetClickCounter/clickCounter * 100).toFixed(0) <= 100) {
        accuracy.innerHTML = `accuracy: ${(targetClickCounter/clickCounter * 100).toFixed(0)}%`;
    }       
}

// updates score with each click
const scoreUpdater = () => {
    score.innerHTML = `score: ${targetClickCounter*120 - clickCounter*20}`;
}

// clears score, accuracy, clickCounter, and targetClickCounter
const hardReset = () => {
        clickCounter = 0;
        targetClickCounter = 0;
        accuracy.innerHTML = `accuracy:`;
        score.innerHTML = `score:`
}

// button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres
const resetClick = () => {
    resett.addEventListener("click", () => {
        playResetClickSound();
        hardReset();
        hideAll();
        startButton.disabled = false;
        time = 31;
    });
}
resetClick();

// look up how to make js more efficient

// add multitouch??