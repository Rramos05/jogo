/* =====================================
   FENIX STORE
   SISTEMA COMPLETO
===================================== */


/* =====================================
   CONFIGURAÇÃO PIX
===================================== */

/*
   TROQUE SOMENTE ESTA CHAVE DEPOIS.

   Exemplo:
   const CHAVE_PIX = "11999999999";
*/

const CHAVE_PIX = "53997094670";


/* =====================================
   CARRINHO
===================================== */

let carrinho = [];

try {

    const salvo = localStorage.getItem("fenix_carrinho");

    if (salvo) {
        carrinho = JSON.parse(salvo);
    }

} catch (erro) {

    carrinho = [];

}


/* =====================================
   INICIALIZAÇÃO
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    atualizarCarrinho();

    const pixKey = document.getElementById("pix-key");

    if (pixKey) {
        pixKey.textContent = CHAVE_PIX;
    }


    const modal =
        document.getElementById("cart-modal");

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                fecharCarrinho();
            }

        });

    }


    const pixModal =
        document.getElementById("pix-modal");

    if (pixModal) {

        pixModal.addEventListener("click", event => {

            if (event.target === pixModal) {
                fecharPix();
            }

        });

    }

});


/* =====================================
   SALVAR CARRINHO
===================================== */

function salvarCarrinho() {

    try {

        localStorage.setItem(
            "fenix_carrinho",
            JSON.stringify(carrinho)
        );

    } catch (erro) {

        console.log(
            "Não foi possível salvar o carrinho."
        );

    }

}


/* =====================================
   ABRIR CARRINHO
===================================== */

function abrirCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (modal) {
        modal.classList.add("active");
    }

}


/* =====================================
   FECHAR CARRINHO
===================================== */

function fecharCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (modal) {
        modal.classList.remove("active");
    }

}


/* =====================================
   ADICIONAR PRODUTO
===================================== */

function adicionarCarrinho(nome, preco) {

    const existente =
        carrinho.find(
            produto => produto.nome === nome
        );


    if (existente) {

        existente.quantidade += 1;

    } else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

    animarContador();

}


/* =====================================
   ATUALIZAR CARRINHO
===================================== */

function atualizarCarrinho() {

    const container =
        document.getElementById("cart-items");

    const contador =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(produto => {

        const quantidade =
            produto.quantidade || 1;

        total +=
            produto.preco * quantidade;

        quantidadeTotal += quantidade;

    });


    if (contador) {

        contador.textContent =
            quantidadeTotal;

    }


    if (carrinho.length === 0) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:50px 10px;
                color:#777d8d;
            ">

                <div style="
                    font-size:50px;
                    margin-bottom:15px;
                ">
                    🛒
                </div>

                <p>
                    Seu carrinho está vazio.
                </p>

            </div>

        `;

    }


    carrinho.forEach((produto, index) => {

        const quantidade =
            produto.quantidade || 1;


        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${escaparHTML(produto.nome)}
                </div>

                <div class="cart-item-price">
                    R$ ${formatarPreco(
                        produto.preco * quantidade
                    )}
                </div>

                <div class="cart-actions">

                    <button
                        type="button"
                        class="quantity-button"
                        onclick="alterarQuantidade(${index}, -1)"
                    >
                        −
                    </button>

                    <span class="quantity-number">
                        ${quantidade}
                    </span>

                    <button
                        type="button"
                        class="quantity-button"
                        onclick="alterarQuantidade(${index}, 1)"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        class="remove-button"
                        onclick="removerProduto(${index})"
                    >
                        Remover
                    </button>

                </div>

            </div>

        `;


        container.appendChild(item);

    });


    if (totalElement) {

        totalElement.textContent =
            "R$ " + formatarPreco(total);

    }

}


/* =====================================
   ALTERAR QUANTIDADE
===================================== */

function alterarQuantidade(index, quantidade) {

    if (!carrinho[index]) {
        return;
    }


    carrinho[index].quantidade =
        (carrinho[index].quantidade || 1)
        + quantidade;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================
   REMOVER PRODUTO
===================================== */

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================
   TOTAL
===================================== */

function obterTotal() {

    return carrinho.reduce(
        (total, produto) => {

            return total +
                produto.preco *
                (produto.quantidade || 1);

        },
        0
    );

}


/* =====================================
   FORMATAÇÃO
===================================== */

function formatarPreco(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");

}


/* =====================================
   ESCAPAR HTML
===================================== */

function escaparHTML(texto) {

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================
   ANIMAÇÃO
===================================== */

function animarContador() {

    const contador =
        document.getElementById("cart-count");


    if (!contador) {
        return;
    }


    contador.animate(

        [
            {
                transform: "scale(1)"
            },

            {
                transform: "scale(1.5)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {
            duration: 400
        }

    );

}


/* =====================================
   FILTROS
===================================== */

function filtrarProdutos(
    categoria,
    botao = null
) {

    const produtos =
        document.querySelectorAll(".product");


    let encontrados = 0;


    produtos.forEach(produto => {

        const jogo =
            produto.dataset.game;


        if (
            categoria === "todos" ||
            jogo === categoria
        ) {

            produto.style.display = "";

            encontrados++;


            produto.animate(

                [
                    {
                        opacity: 0,
                        transform: "translateY(15px)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }

                ],

                {
                    duration: 350,
                    easing: "ease"
                }

            );

        } else {

            produto.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("no-results");


    if (noResults) {

        noResults.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }


    document
        .querySelectorAll(".filter")
        .forEach(filtro => {

            filtro.classList.remove("active");

        });


    if (botao) {

        botao.classList.add("active");

    } else {

        const filtros =
            document.querySelectorAll(".filter");


        filtros.forEach(filtro => {

            if (
                filtro.textContent
                    .trim()
                    .toLowerCase()
                    === categoria
            ) {

                filtro.classList.add("active");

            }

        });


        if (categoria === "todos" && filtros[0]) {

            filtros[0].classList.add("active");

        }

    }


    document
        .getElementById("produtos")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/* =====================================
   PESQUISA
===================================== */

function abrirPesquisa() {

    const box =
        document.getElementById("search-box");


    if (!box) {
        return;
    }


    box.classList.toggle("active");


    if (box.classList.contains("active")) {

        const input =
            document.getElementById("search-input");


        if (input) {
            input.focus();
        }

    }

}


function fecharPesquisa() {

    const box =
        document.getElementById("search-box");


    if (box) {
        box.classList.remove("active");
    }

}


/* =====================================
   PESQUISAR
===================================== */

function pesquisarProduto() {

    const input =
        document.getElementById("search-input");


    if (!input) {
        return;
    }


    const texto =
        input.value
            .toLowerCase()
            .trim();


    const produtos =
        document.querySelectorAll(".product");


    let encontrados = 0;


    produtos.forEach(produto => {

        const nome =
            produto
                .querySelector("h3")
                ?.textContent
                .toLowerCase() || "";


        const categoria =
            produto
                .querySelector(".product-category")
                ?.textContent
                .toLowerCase() || "";


        const jogo =
            produto.dataset.game
                ?.toLowerCase() || "";


        const corresponde =
            nome.includes(texto) ||
            categoria.includes(texto) ||
            jogo.includes(texto);


        if (corresponde) {

            produto.style.display = "";

            encontrados++;

        } else {

            produto.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("no-results");


    if (noResults) {

        noResults.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }


    const produtosSection =
        document.getElementById("produtos");


    if (
        texto &&
        produtosSection
    ) {

        produtosSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================
   CHECKOUT
===================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const total =
        obterTotal();


    const numeroPedido =
        gerarNumeroPedido();


    const totalElement =
        document.getElementById("pix-total");


    const pedidoElement =
        document.getElementById("order-number");


    const chaveElement =
        document.getElementById("pix-key");


    if (totalElement) {

        totalElement.textContent =
            "R$ " + formatarPreco(total);

    }


    if (pedidoElement) {

        pedidoElement.textContent =
            numeroPedido;

    }


    if (chaveElement) {

        chaveElement.textContent =
            CHAVE_PIX;

    }


    fecharCarrinho();


    const pixModal =
        document.getElementById("pix-modal");


    if (pixModal) {

        pixModal.classList.add("active");

    }

}


/* =====================================
   FECHAR PIX
===================================== */

function fecharPix() {

    const modal =
        document.getElementById("pix-modal");


    if (modal) {

        modal.classList.remove("active");

    }

}


/* =====================================
   COPIAR PIX
===================================== */

async function copiarPix() {

    try {

        await navigator.clipboard.writeText(
            CHAVE_PIX
        );


        alert(
            "Chave PIX copiada!"
        );


    } catch (erro) {

        const area =
            document.createElement("textarea");


        area.value =
            CHAVE_PIX;


        document.body.appendChild(area);

        area.select();

        document.execCommand("copy");

        area.remove();


        alert(
            "Chave PIX copiada!"
        );

    }

}


/* =====================================
   NÚMERO DO PEDIDO
===================================== */

function gerarNumeroPedido() {

    const agora =
        Date.now()
        .toString()
        .slice(-8);


    return "FNX-" + agora;

}


/* =====================================
   PAGAMENTO REALIZADO
===================================== */

function pagamentoRealizado() {

    const pedido =
        document.getElementById(
            "order-number"
        )?.textContent || "FNX";


    alert(
        "Pagamento informado!\n\n" +
        "Número do pedido: " +
        pedido +
        "\n\n" +
        "Agora entre em contato com o suporte para confirmar o pagamento e receber o produto."
    );

}


/* =====================================
   TECLA ESC
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            fecharCarrinho();

            fecharPesquisa();

            fecharPix();

        }

    }
);
