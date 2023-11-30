//Funny little command ticker at the top of the page
const WAITTIME = 10;
const TYPESPEED = 50;
const COMMANDS = ["neofetch", "cowsay \"Hello World\"", "cargo run", "ping vvill.dev", "sudo rm -rf --no-preserve-root /", "sudo pacman -Syu", "echo Go Beavs", "git commit -am \"I did a thing\"", "pandoc a.md -o a.pdf", "man man", "systemctl list services", ":(){ :|:& };:", "sudo nvim -b /bin/bash", "nvim +q"];
let currentCommandId = 0;
let writing = true;
let waiting = 0;
let commandElm;
function updateCommand(){
    let text = commandElm.innerText;
    if(writing){
        if(text.length < COMMANDS[currentCommandId].length){
            commandElm.innerText += COMMANDS[currentCommandId][text.length];
            return;
        }else if(waiting < WAITTIME){
            waiting++;
            return;
        }else{
            writing = false;
            return;
        }
    }else{
        if(text.length > 0){
            commandElm.innerText = text.slice(0, -1);
            return;
        }else if(waiting > 0){
            waiting--;
            return;
        }else{
            currentCommandId = (currentCommandId+1) % (COMMANDS.length-1);
            writing = true;
            return;
        }
    }
}

//Nav Bar Highlighting w/ scroll
let navBar;
let positions = [];
function navScroll(){
    let i = 1; //Set to 1 to skip over gradient hack
    while(window.scrollY + (window.innerHeight / 2) > positions[i])
        i++;
    if(!navBar.children[i].classList.contains("active")){
        navBar.getElementsByClassName("active")[0].classList.remove("active");
        navBar.children[i].classList.add("active");
    }
}

//Card dropdown and content switching
function swapContent(e, i){
    if(window.innerHeight > window.innerWidth){
        e.parentElement.classList.toggle("active");
    }
    e.parentElement.parentElement.parentElement.getElementsByClassName("card-content active")[0].classList.remove("active");
    e.parentElement.parentElement.parentElement.getElementsByClassName("card-content")[i].classList.add("active");
    e.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    e.parentElement.children[i].classList.add("active");
}

//CSS -vh variable for 100% height minus the bottom nav bar on mobile
function calcVh(){
	document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + "px");
}


//Load all the element references to memory and start up functions
window.onload = function(e){
    //Commands bar at the top
    commandElm = document.getElementById("commands");
    currentCommandId = Math.floor(Math.random()*COMMANDS.length);
    setInterval(updateCommand, TYPESPEED);
    
    //Nav Bar Scroll Highlighting
    navBar = document.getElementById("nav");
    for(let link=navBar.firstChild; link!==null; link=link.nextSibling){
        if(link.nodeName == 'A')
            positions.push(document.getElementById(link.href.split("#")[1]).offsetTop);
    }
    window.addEventListener("scroll", navScroll, false);
    window.addEventListener("resize", calcVh, false);
    calcVh();
    navScroll();
}
