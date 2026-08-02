// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }else{

        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});


// ===============================
// TYPING EFFECT
// ===============================

const textArray = [

"Web Developer",

"Java Programmer",

"Python Developer",

"IT Graduate"

];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typing = document.querySelector(".typing");

function type(){

    currentText = textArray[index];

    if(!isDeleting){

        typing.textContent=currentText.substring(0,charIndex++);

        if(charIndex>currentText.length){

            isDeleting=true;

            setTimeout(type,1000);

            return;

        }

    }else{

        typing.textContent=currentText.substring(0,charIndex--);

        if(charIndex<0){

            isDeleting=false;

            index++;

            if(index>=textArray.length){

                index=0;

            }

        }

    }

    setTimeout(type,isDeleting?70:120);

}

type();


// ===============================
// SCROLL ANIMATION
// ===============================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    sections.forEach(section=>{

        const top=window.scrollY;

        const offset=section.offsetTop-250;

        if(top>offset){

            section.style.opacity="1";
            section.style.transform="translateY(0px)";

        }

    });

});

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition=".8s";

});


// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.right="20px";
topBtn.style.bottom="20px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#38bdf8";
topBtn.style.color="#000";
topBtn.style.fontSize="20px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.boxShadow="0 0 20px #38bdf8";

window.addEventListener("scroll",()=>{

    if(window.pageYOffset>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// ===============================
// NAVBAR ACTIVE LINK
// ===============================

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current="";

    document.querySelectorAll("section").forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
