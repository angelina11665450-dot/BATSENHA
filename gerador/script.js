const senhaGerada = document.getElementById("senhaGerada");
const senhaValidada = document.getElementById("senhaValidada");

const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const gerar = document.getElementById("gerar");
const copiar = document.getElementById("copiar");

const barraForca = document.getElementById("barraForca");
const textoForca = document.getElementById("textoForca");


// Atualiza o número do tamanho
tamanho.addEventListener("input", function() {
    valorTamanho.textContent = tamanho.value;
});


// GERADOR DE SENHA
function gerarSenha() {

    let caracteres = "";

    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numerosDisponiveis = "0123456789";
    const simbolosDisponiveis = "!@#$%&*()-_=+[]{}?";

    if (maiusculas.checked) {
        caracteres += letrasMaiusculas;
    }

    if (minusculas.checked) {
        caracteres += letrasMinusculas;
    }

    if (numeros.checked) {
        caracteres += numerosDisponiveis;
    }

    if (simbolos.checked) {
        caracteres += simbolosDisponiveis;
    }

    if (caracteres === "") {
        senhaGerada.value = "Selecione uma opção";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanho.value; i++) {

        const posicao = Math.floor(
            Math.random() * caracteres.length
        );

        senha += caracteres[posicao];
    }

    senhaGerada.value = senha;

    validarSenha(senha);
}


// Botão gerar
gerar.addEventListener("click", gerarSenha);


// COPIAR SENHA
copiar.addEventListener("click", function() {

    if (senhaGerada.value === "") {
        return;
    }

    navigator.clipboard.writeText(senhaGerada.value);

    copiar.textContent = "✅ Copiado!";

    setTimeout(function() {
        copiar.textContent = "📋 Copiar";
    }, 1500);
});


// VALIDADOR
senhaValidada.addEventListener("input", function() {

    validarSenha(senhaValidada.value);

});


function validarSenha(senha) {

    const temTamanho = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temSimbolo = /[^A-Za-z0-9]/.test(senha);

    atualizarRequisito(
        "tamanhoReq",
        temTamanho,
        "Pelo menos 8 caracteres"
    );

    atualizarRequisito(
        "maiusculaReq",
        temMaiuscula,
        "Pelo menos uma letra maiúscula"
    );

    atualizarRequisito(
        "minusculaReq",
        temMinuscula,
        "Pelo menos uma letra minúscula"
    );

    atualizarRequisito(
        "numeroReq",
        temNumero,
        "Pelo menos um número"
    );

    atualizarRequisito(
        "simboloReq",
        temSimbolo,
        "Pelo menos um símbolo"
    );


    // Calcula a força
    let pontos = 0;

    if (temTamanho) pontos++;
    if (temMaiuscula) pontos++;
    if (temMinuscula) pontos++;
    if (temNumero) pontos++;
    if (temSimbolo) pontos++;


    if (senha.length === 0) {

        barraForca.style.width = "0%";
        textoForca.textContent = "Digite uma senha";

    } else if (pontos <= 2) {

        barraForca.style.width = "25%";
        textoForca.textContent = "🔴 Senha fraca";

    } else if (pontos === 3) {

        barraForca.style.width = "50%";
        textoForca.textContent = "🟠 Senha média";

    } else if (pontos === 4) {

        barraForca.style.width = "75%";
        textoForca.textContent = "🟡 Senha forte";

    } else {

        barraForca.style.width = "100%";
        textoForca.textContent = "🟢 Senha muito forte";

    }

}


// Atualiza cada requisito
function atualizarRequisito(id, valido, texto) {

    const elemento = document.getElementById(id);

    if (valido) {

        elemento.textContent = "✅ " + texto;

    } else {

        elemento.textContent = "❌ " + texto;

    }
}


// Gera uma senha automaticamente ao abrir
gerarSenha();