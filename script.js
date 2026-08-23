let carrinho = [];


// ============================
// ABRIR PESQUISA
// ============================

function abrirPesquisa() {

    const searchBox = document.getElementById("search-box");

    searchBox.classList.toggle("active");

}


// ============================
// PESQUISAR PRODUTO
// ============================

function pesquisarProduto() {

    const texto = document
        .getElementById("search-input")
        .value
        .toLowerCase();

    const produtos = document.querySelectorAll(".product");

    produtos.forEach(produto => {

        const nome = produto
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nome.includes(texto)) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}


// ============================
// ADICIONAR AO CARRINHO
// ============================

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    abrirCarrinho();

}


// ============================
// ATUALIZAR CARRINHO
// ============================

function atualizarCarrinho() {

    const container =
        document.getElementById("cart-items");

    const contador =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");


    contador.textContent = carrinho.length;


    container.innerHTML = "";


    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>
                <strong>${produto.nome}</strong>

                <p>
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>
            </div>

            <button
                onclick="removerProduto(${index})"
                style="
                    background:none;
                    border:none;
                    color:#ff6b6b;
                    cursor:pointer;
                "
            >
                Remover
            </button>

        `;


        container.appendChild(item);

    });


    totalElement.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


// ============================
// REMOVER PRODUTO
// ============================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ============================
// ABRIR CARRINHO
// ============================

function abrirCarrinho() {

    document
        .getElementById("cart-modal")
        .classList.add("active");

}


// ============================
// FECHAR CARRINHO
// ============================

function fecharCarrinho() {

    document
        .getElementById("cart-modal")
        .classList.remove("active");

}


// ============================
// FECHAR CLICANDO FORA
// ============================

document
    .getElementById("cart-modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            fecharCarrinho();

        }

    });