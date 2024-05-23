1;
2;
3;
4;
5;
6;
7;
8;
9;
10;
11;
12;
13;
14;
15;
16;
17;
18;
19;
20;
21;
22;
23;
24;
25;
26;
27;
28;
29;
30;
31;
32;
33;
34;
35;
36;
37;
38;
39;
40;
41;
42;
43;
44;
45;
46;
47;
48;
49;
50;
51;
52;
53;
54;
55;
56;
57;
58;
59;
60;
61;
62;
63;
64;
65;
66;
67;
68;
69;
70;
71;
72;
73;
74;
75;
76;
77;
78;
79;
80;
81;
82;
83;
84;
let radius = 240;
let autoRotate = true;
let rotateSpeed = -150;
let imgWidth = 140;
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].style.transform =
      "rotateY(" +
      i * (360 / aImg.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aImg[i].style.transition = "transform 1s";
    aImg[i].style.transitionDelay = delayTime || (aImg.length - i) / 4 + "s";
  }
}
function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;
if (autoRotate) {
  let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}
carousel.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  let sX = e.clientX,
    sY = e.clientY;
  this.onpointermove = function (e) {
    e = e || window.event;
    let nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };
  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
  return false;
};
