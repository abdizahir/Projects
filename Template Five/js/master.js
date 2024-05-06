// check lockal storge color
let mainColor = localStorage.getItem("color-option");
if(mainColor !== null) {
    // console.log('local storge is not empty');
    // console.log(localStorage.getItem("color-option"));

    document.documentElement.style.setProperty("--main--color", mainColor);
    // remove active class from all colrs list
    document.querySelectorAll(".colors-list li").forEach(el => {
        el.classList.remove("active");

        if(el.dataset.color === mainColor) {
            el.classList.add("active");
        }
    });

}

// random background option
let backgorundOption = true;
// variable to control the interval
let backgorundInterval;

// check lockal storge for random background 
let randomBackgroundLockalstorge = localStorage.getItem("random-option");
if(randomBackgroundLockalstorge !== null) {
    if(randomBackgroundLockalstorge === 'true') {
        backgorundOption = true;
    }else {
        backgorundOption = false;
    }
    // remove active from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(el => {
        el.classList.remove("active");
        if(backgorundOption === true) {
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        }else {
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }
    })
}

// toggle spin class 
document.querySelector(".gear").onclick = function() {
    this.classList.toggle("fa-spin");
    
    document.querySelector(".setting-box").classList.toggle("open");
}

// switch colors 
const colrsLi = document.querySelectorAll(".colors-list li");
colrsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        // set color on root
       localStorage.setItem("color-option", e.target.dataset.color);
        // remove active class
        e.target.parentElement.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active");
        });
        // add active
       e.target.classList.add("active");
    });
});

// switch random backgorund
let randBack = document.querySelectorAll(".random-backgrounds span");
randBack.forEach(spn => {
    spn.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active");
        })
        e.target.classList.add("active");

        if(e.target.dataset.background === 'yes') {
            backgorundOption === true;
            randomizeImg();
            localStorage.setItem("random-option", true);
        }else {
            backgorundOption === false;
            clearInterval(backgorundInterval);
            localStorage.setItem("random-option", false);
        }
    })
})

// select landing page
let landPage = document.querySelector(".landing-page");

// get array of img
let imgArry = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImg() {
    if(backgorundOption === true) {
        backgorundInterval = setInterval(() => {
            // get random number
            let randomNum = Math.floor(Math.random() * imgArry.length);
        
            // change background 
            landPage.style.backgroundImage = 'url("img/' +imgArry[randomNum] + '")'
        }, 1000);
    }
}

randomizeImg();