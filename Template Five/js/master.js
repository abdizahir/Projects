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
    document.querySelectorAll(".random-backgrounds span").forEach(el => {
        el.classList.remove("active");
    });
    if(randomBackgroundLockalstorge === 'true') {
        backgorundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else {
        backgorundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
    // remove active from all spans
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
        handleActive(e);
    });
});

// switch random backgorund
let randBack = document.querySelectorAll(".random-backgrounds span");
randBack.forEach(spn => {
    spn.addEventListener("click", (e) => {
        handleActive(e);

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

// slect skils slector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    let skiilOfsetTop = ourSkills.offsetTop;

    let skillOuterHight = ourSkills.offsetHight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.scrollY;

    if(windowScrollTop > (skiilOfsetTop + skillOuterHight - windowHeight)); {
        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// create popup
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (el) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popBox = document.createElement("div");
        popBox.className = "popup-box";
        // CREATE TEXTNode
        if(img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgTxt = document.createTextNode(img.alt);
            imgHeading.appendChild(imgTxt);
            popBox.appendChild(imgHeading);
        }else {
            
        }

        let popImg = document.createElement("img");
        popImg.src = img.src;
        popBox.appendChild(popImg);
        document.body.appendChild(popBox);

        // creat close span
        let closeSpan = document.createElement("span");
        let closeTxt = document.createTextNode("X");
        closeSpan.appendChild(closeTxt);
        closeSpan.className = "close-span";
        popBox.appendChild(closeSpan);
    });
});

// close popUp

document.addEventListener("click", function(e) {

    if(e.target.className === 'close-span') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

// select all buletts 

const allBuletts = document.querySelectorAll(".bullet");


// select all links
const allLinks = document.querySelectorAll(".links a");


function scrollTo (element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.secttion).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scrollTo(allBuletts);
scrollTo(allLinks);

// create  Handle Active state
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    })
    ev.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".bullet-option span");
let bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullet-option");
if(bulletLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
        
    });
    if(bulletLocalItem === 'block') {
        bulletContainer.style.display = 'block';
        document.querySelector(".bullet-option .yes").classList.add("active");
    }else {
        bulletContainer.style.display = 'none';
        document.querySelector(".bullet-option .no").classList.add("active");
    }

}

bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show') {

            bulletContainer.style.display = 'block';

            localStorage.setItem("bullet-option", 'block');
        } else {
            bulletContainer.style.display = 'none';

            localStorage.setItem("bullet-option", 'none');
        }
        handleActive(e);
    })
})

document.querySelector(".rest-option").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("random-option");
    localStorage.removeItem("bullet-option");
    window.location.reload();
}

// toggle menu 

let toggoleBtn = document.querySelector(".toggle-menue");
let theLinks = document.querySelector(".links");

toggoleBtn.onclick = function(e) {
    this.classList.toggle("menu-active");
    theLinks.classList.toggle("open");
    e.stopPropagation();
}

// click anywhere outside menu and toggole button
document.addEventListener("click", (e) => {
    if(e.target !== toggoleBtn && e.target !== theLinks) {
        if(theLinks.classList.contains("open")) {
            toggoleBtn.classList.toggle("menu-active");
            theLinks.classList.toggle("open");
        }
    }
})

// stop propaggation on menu
theLinks.onclick = function(e) {
    e.stopPropagation();        
}