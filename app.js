//Lista onde ficará os números sorteados.
let numerosSorteados = [];
//Variável que armazena o número aleatório atual gerado.
let numeroAleatorio;

//Pega o número do campo da página do jogo.
function pegarValorCampoHTML(id){
    return parseInt(document.getElementById(id).value);
}

//Função que realiza o sorteio ao clicar no botão sortear.
function sortear(){
    let quantidadeNumero = pegarValorCampoHTML('quantidade');
    let doNumero = pegarValorCampoHTML('de');
    let ateNumero = pegarValorCampoHTML('ate');
    let variavelTemporaria;

    //Tratativa para impedir que o jogo prossiga com um ou mais campos vazios.
    if(isNaN(quantidadeNumero) || isNaN(doNumero) || isNaN(ateNumero)){
        alert("Um ou mais campos vazios!");
        return;
    }

    //Isso é feito para não ter erros na geração de valores aleatórios.
    if(doNumero > ateNumero){
        variavelTemporaria = doNumero; //Variável temporária pega o maior valor.
        doNumero = ateNumero; //O maior valor se converte no menor valor.
        ateNumero = variavelTemporaria; //O menor valor se converte no maior valor.
    }

    //Variável que armazena a quantidade de números do intervalo feito pelo usuário.
    let intervaloNumerico = (ateNumero - doNumero + 1); 

    //Tratativas
    if(quantidadeNumero < 1){
       tratativa('Quantidade de números não pode ser 0.');
       return;
    }

    if(quantidadeNumero > (intervaloNumerico)){
        tratativa('Quantidade de números não pode ser maior que o intervalo numérico.');
        return;
    }
   

    //Laço que faz toda a geração de valores aleatórios e armazena na lista de acordo com a quantidade de números inserida pelo usuário.    
    let i = 1;

    while(i <= quantidadeNumero){
        numeroAleatorio = gerarNumeroAleatorio(doNumero,ateNumero);
        console.log(numeroAleatorio);

        //Execução para caso o intervalo seja de apenas 1 número.
        //Serve para impedir que cause um loop infinito.
        if((intervaloNumerico) == 1){
            numerosSorteados.push(numeroAleatorio);
            break;
        } 

        //Execução para caso o intervalo seja de 2 ou mais.
        if(numerosSorteados.includes(numeroAleatorio)){
            continue;
        }else{
            numerosSorteados.push(numeroAleatorio);
        }

        i++;
    }

    //Campos que são alterados ao fim do sorteio.
    alterarTexto(`Números sorteados: ${numerosSorteados}`);
    removerAdicionarDisabled('btn-reiniciar','btn-sortear');
    alterarEstiloBotao('btn-sortear');
    alterarEstiloBotao('btn-reiniciar');
}

//Configuração da tratativa de valores inválidos.
function tratativa(texto){
    alert(texto);
    limparCampos();
}

//Configuração da alteração do texto da página.
function alterarTexto(texto){
    document.getElementById('resultado').textContent = texto;
}

//Configuração de adicionar/remover o atributo disabled dos botões.
function removerAdicionarDisabled(id,id2){
    document.getElementById(id).removeAttribute('disabled');
    document.getElementById(id2).setAttribute('disabled',true)
}

//Configuração de alterar o estilo dos botões trocando as classes.
function alterarEstiloBotao(alterarBotao){
    let botao = document.getElementById(alterarBotao);
   
    if(botao.classList.contains('container__botao')){
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }else{
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    }
    
}

//Configuração de reinício do jogo.
function reiniciar(){
    
    removerAdicionarDisabled('btn-sortear','btn-reiniciar');
    alterarTexto(`Números sorteados: nenhum até agora.`);
    alterarEstiloBotao('btn-reiniciar');
    alterarEstiloBotao('btn-sortear');
    limparCampos();

}

//Configuração de limpar os campos de input do jogo.
function limparCampos(){
    numerosSorteados = [];
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
}

//Configuração de gerar valores aleatórios.
function gerarNumeroAleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min );
}

