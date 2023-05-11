// variaveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis da raquete

let xRaquete = 10;
let yRaquete = 160;
let heightRaquete = 60;
let widthRaquete = 10;

//variaveis da raquete do oponente

let xRaqueteOponente = 580;
let yRaqueteOponente = 160;
let heightRaqueteOponente = 60;
let widthRaqueteOponente = 10;
let velocidadeRaqueteOponente;

// variaveis do movimento da bola
let velocidadeX = 5;
let velocidadeY = 4;

//placar

let meusPontos = 0;
let pontosOponente = 0;

// sons

let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  colisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  moveRaquete();
  colisaoRaquete();
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteOponente();
  mostraPonto();
}

function mostraBola(){
  circle(xBola,yBola,diametro);
}

function mostraRaquete(x,y){
  rect(x,y,widthRaquete,heightRaquete);
  
}


function movimentaBola(){
  xBola += velocidadeX;
  yBola += velocidadeY;
}

function movimentaRaqueteOponente(){
  velocidadeRaqueteOponente = yBola - heightRaqueteOponente / 2 - 20 ;
  
  yRaqueteOponente = velocidadeRaqueteOponente;
}


function colisaoBorda(){
   if (xBola + raio > width || xBola - raio < 0){
    velocidadeX *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0){
    velocidadeY *= -1;
  }
}

function moveRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function colisaoRaquete() {
    if (  xBola - raio < xRaquete + widthRaquete && yBola - raio < yRaquete + heightRaquete && yBola - raio > yRaquete) {
             
      velocidadeX *= -1;  
      raquetada.play();
    }
}
/* 1º verificação = Se o eixo X da bola for menor que o eixo X da raquete + sua largura
2º verificação = Se o eixo Y da bola for menor que o eixo Y da raquete + sua altura
3º verificação = Se o eixo Y da bola for maior que o eixo Y da raquete (sendo maior, seu valor passará o inicio da raquete no plano cartesiano)
*/

function colisaoRaqueteOponente() {
    if (   xBola - raio > xRaqueteOponente - widthRaquete && yBola - raio < yRaqueteOponente + heightRaqueteOponente && yBola - raio > yRaqueteOponente) {
             
      velocidadeX *= -1;  
      raquetada.play();
    }
}

function mostraPonto(){
  fill(255);
  text(meusPontos, 260, 26);
  text(pontosOponente, 300, 26);
  
  if (xBola > 590){
    meusPontos += 1;
     ponto.play();
  }
  if (xBola < 10){
    pontosOponente += 1;
    ponto.play();
}
}