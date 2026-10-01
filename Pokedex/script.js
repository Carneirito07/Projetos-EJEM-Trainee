const nomeElement = document.getElementById("nome-pokemon");
const tipoElement = document.getElementById("tipo-pokemon");
const imagemElement = document.getElementById("imagem-pokemon");
const alturaElement = document.getElementById("altura-pokemon");
const pesoElement = document.getElementById("peso-pokemon");
const pesquisaElement = document.getElementById("barra-pesquisa");
const botBuscaElement = document.getElementById("botao-busca");
const listaElement = document.getElementById("sugestoes");
let nomes = [];

const coresTipos = {
    normal: "#aa9",
    fire: "#f42",
    water: "#39f",
    electric: "#fc3",
    grass: "#7c5",
    ice: "#6cf",
    fighting: "#b54",
    poison: "#a59",
    ground: "#db5",
    flying: "#89f",
    psychic: "#f59",
    bug: "#ab2",
    rock: "#ba6",
    ghost: "#66b",
    dragon: "#76e",
    dark: "#754",
    steel: "#aab",
    fairy: "#e9e"
};


async function buscarPokemon(nome) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}: Pokémon não encontrado`);
        }

        const dados = await resposta.json();

        nomeElement.textContent = `#${dados.id} - ${formatarNome(dados.name)}`;
        tipoElement.textContent = "";
        alturaElement.textContent = `Altura: ${(dados.height / 10).toFixed(1).replace(".", ",")} m`;
        pesoElement.textContent = `Peso: ${(dados.weight / 10).toFixed(1).replace(".", ",")} kg`;

        dados.types.forEach((item) => {
            const nomeTipo = item.type.name;

            const balao = document.createElement("span");
            balao.textContent = formatarNome(nomeTipo);
            balao.style.backgroundColor = coresTipos[nomeTipo] || "#777777";

            tipoElement.appendChild(balao);
        });
        const imagem = dados.sprites.other?.["official-artwork"]?.front_default || dados.sprites.front_default;

        if (imagem) {
            imagemElement.src = imagem;
        } else {
            imagemElement.removeAttribute("src");
        }
        imagemElement.alt = formatarNome(dados.name);
    } catch (erro) {
        nomeElement.textContent = "Pokémon não encontrado";
        tipoElement.textContent = "";
        alturaElement.textContent = "";
        pesoElement.textContent = "";
        imagemElement.removeAttribute("src");
        imagemElement.alt = "era pra ter pokemon";
        console.error("Falha ao buscar:", erro.message);
    }
}

async function carregarNomes() {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao carregar a lista.`);
        }

        const dados = await resposta.json();
        nomes = dados.results.map((pokemon) => pokemon.name);
        console.log("Função carregarNomes() chamada com sucesso.");
    } catch (erro) {
        console.error("Falha ao carregar nomes: ", erro.message);
    }
}

function mostrarSugestoes() {
    const termo = pesquisaElement.value.trim().toLowerCase();

    listaElement.innerHTML = "";

    if (termo === "") {
        return;
    }
    
    const sugestoes = nomes
        .filter((nome) => nome.startsWith(termo))
        .slice(0, 8);

    sugestoes.forEach((nome) => {
        const item = document.createElement("li");
        item.textContent = formatarNome(nome);

        item.addEventListener("click", () => {
            pesquisaElement.value = nome;
            listaElement.innerHTML = "";
            buscarPokemon(nome);
        });

        listaElement.appendChild(item);
    });}

pesquisaElement.addEventListener("input", mostrarSugestoes);

document.addEventListener("click", (evento) => {
    if (!evento.target.closest(".pesquisa")) {
        listaElement.innerHTML = "";
    }
});

function pesquisar() {
    const termo = pesquisaElement.value.trim().toLowerCase();

    if (termo === "") {
        return;
    }

    listaElement.innerHTML = "";
    buscarPokemon(termo);
}

function formatarNome(texto) {
    return texto
        .split("-")
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join(" ");
}

botBuscaElement.addEventListener("click", pesquisar);

pesquisaElement.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        pesquisar();
    }
});

carregarNomes();
buscarPokemon("pikachu");