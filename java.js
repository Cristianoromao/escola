// Função para calcular a média do aluno e salvar no localStorage
function calcularMedia() {
    const nome = document.getElementById("nome").value;
    const numero = document.getElementById("numero").value;
    const disciplinas = [
        "linguaPortuguesa", "matematica", "ingles", "tic", "tlp", "eletrotecnia",
        "fisica", "quimica", "empreendedorismo", "educacaoFisica", "fai", "seac"
    ];

    // Obter as notas e calcular a média
    let soma = 0;
    let totalDisciplinas = disciplinas.length;

    disciplinas.forEach(disciplina => {
        const nota = parseFloat(document.getElementById(disciplina).value);
        soma += nota;
    });

    const media = soma / totalDisciplinas;

    // Exibir a média do aluno
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `A média de ${nome} (Nº ${numero}) é: ${media.toFixed(2)}`;

    // Salvar a média no localStorage
    salvarMediaLocal(nome, numero, media);
}

// Função para salvar a média no localStorage
function salvarMediaLocal(nome, numero, media) {
    // Obter os dados existentes (ou criar um novo array se não houver dados)
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    // Adicionar o novo aluno com a média ao array
    alunos.push({ nome, numero, media });

    // Salvar novamente o array atualizado no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Atualizar o ranking após salvar
    atualizarRanking();
}

// Função para exibir o ranking dos alunos com base nas médias
function atualizarRanking() {
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = "<h2>Ranking de Alunos</h2>";

    // Obter os dados do localStorage e ordenar pelo valor da média
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.sort((a, b) => b.media - a.media); // Ordenar de forma decrescente pela média

    // Exibir o ranking na tela
    alunos.forEach((aluno, index) => {
        const alunoInfo = document.createElement("p");
        alunoInfo.innerHTML = `${index + 1}. ${aluno.nome} (Nº ${aluno.numero}) - Média: ${aluno.media.toFixed(2)}`;
        rankingDiv.appendChild(alunoInfo);
    });
}

// Chamar a função para atualizar o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarRanking);
