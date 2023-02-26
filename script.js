const minutosEl = document.querySelector('#minutos');
const segundosEl = document.querySelector('#segundos');
const milisegundosEl = document.querySelector('#milisegundos');

const iniciarBtn = document.querySelector('#iniciarBtn');
const pausarBtn = document.querySelector('#pausarBtn');
const continuarBtn = document.querySelector('#continuarBtn');
const resetarBtn = document.querySelector('#resetarBtn');

let intervalo;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let pausado = false;

iniciarBtn.addEventListener('click', iniciarTempo);
pausarBtn.addEventListener('click', pausarTempo);
continuarBtn.addEventListener('click', continuarTempo);
resetarBtn.addEventListener('click', resetarTempo);

function iniciarTempo() {
    //determinar mudança do tempo
    intervalo = setInterval(() => {
        //verificar se esta pausado
        if(!pausado) {
            milisegundos += 10

            //se milisegundos for igual a 1000 (1 segundo)
            if(milisegundos === 1000) {
                segundos ++; //adiciona 1 segundo
                milisegundos = 0; //zera milisegundos
            }

            //se segundos for igual a 60 (1 minuto)
            if(segundos === 60) {
                minutos ++; //adicona 1 minuto
                segundos = 0; //zera segundos
            }

            //trocar informações
            minutosEl.textContent = formatoTempo(minutos);
            segundosEl.textContent = formatoTempo(segundos);
            milisegundosEl.textContent = formatoMilisegundos(milisegundos);
        }
    }, 10);

    //esconder botao iniciar
    iniciarBtn.style.display = 'none';
    //aparecer botao de pausar
    pausarBtn.style.display = 'block';
}

//pausar tempo
function pausarTempo () {
    pausado = true; //nao roda mais a função iniciarTempo
    //esconder botao pausar
    pausarBtn.style.display = 'none';
    //aparecer botao continuar
    continuarBtn.style.display = 'block';
}

//continuar tempo
function continuarTempo () {
    pausado = false; //roda a função iniciarTempo
    //aparecer botao pausar
    pausarBtn.style.display = 'block';
    //esconder botao continuar
    continuarBtn.style.display = 'none';
}

//resetar tempo 
function resetarTempo () {
    pausado = false; //roda a função iniciarTempo
    clearInterval(intervalo); //limpa intervalo
    //zerar variaveis do tempo
    minutos = 0;
    segundos = 0;
    milisegundos = 0;

    //zerar informações html
    minutosEl.textContent = '00';
    segundosEl.textContent = '00';
    milisegundosEl.textContent = '000';

    //aparecer botao iniciar
    iniciarBtn.style.display = 'block';
    //esconder botao continuar
    pausarBtn.style.display = 'none';
    //esconder botao resetar
    continuarBtn.style.display = 'none';
}

//formatar tempo
function formatoTempo (tempo) {
    //se tempo menor que 10 retorna concatenando com 0 na frente, se não retorna o tempo
    return tempo <10 ? `0${tempo}` : tempo;
}

function formatoMilisegundos (tempo) {
    //se tempo for menor que 100 retorna concatenando com zeros que falta, se não retorna o tempo
    return tempo < 100 ? `${tempo}`.padStart(3, '0') : tempo;
}