/* =========================================
   FENIX STORE - SCRIPT
   VERSÃO COM + R$ 2,00 SOBRE O PREÇO BASE
========================================= */


/* =========================================
   CONFIGURAÇÃO
========================================= */

const CHAVE_PIX = "53997094670";

/*
    VALOR ADICIONAL DA FENIX STORE

    Exemplo:
    preço base = R$ 10,00
    preço Fenix = R$ 12,00
*/
const TAXA_FENIX = 2.00;

let carrinho = [];

let filtroAtual = "todos";

let pesquisaAtual = "";


/* =========================================
   CARREGAR CARRINHO
========================================= */

try {

    const salvo =
        localStorage.getItem("fenix_carrinho");

    if (salvo) {
        carrinho = JSON.parse(salvo);
    }

    if (!Array.isArray(carrinho)) {
        carrinho = [];
    }

} catch (erro) {

    carrinho = [];

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
        Primeiro atualizamos os preços dos produtos.
    */
    atualizarPrecosProdutos();


    /*
        Depois carregamos o carrinho.
    */
    atualizarCarrinho();


    /* =====================================
       CHAVE PIX
    ===================================== */

    const pixKey =
        document.getElementById("pix-key");

    if (pixKey) {
        pixKey.textContent = CHAVE_PIX;
    }


    /* =====================================
       PESQUISA
    ===================================== */

    const searchInput =
        document.getElementById("search-input");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            pesquisarProduto
        );

    }


    /* =====================================
       MODAL CARRINHO
    ===================================== */

    const cartModal =
        document.getElementById("cart-modal");

    if (cartModal) {

        cartModal.addEventListener(
            "click",
            event => {

                if (event.target === cartModal) {
                    fecharCarrinho();
                }

            }
        );

    }


    /* =====================================
       MODAL PIX
    ===================================== */

    const pixModal =
        document.getElementById("pix-modal");

    if (pixModal) {

        pixModal.addEventListener(
            "click",
            event => {

                if (event.target === pixModal) {
                    fecharPix();
                }

            }
        );

    }


    /* =====================================
       FILTROS
    ===================================== */

    aplicarFiltros();

});


/* =========================================
   PREÇOS
========================================= */

/*
    Lê o preço original que está no <del>
    e acrescenta R$ 2,00.

    Exemplo:

    HTML:
    <del>R$ 25,00</del>

    Resultado:
    R$ 27,00
*/

function obterPrecoBaseProduto(produto) {

    if (!produto) {
        return 0;
    }


    const elemento =
        produto.querySelector(".price del");


    if (!elemento) {
        return 0;
    }


    const texto =
        elemento.textContent
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", ".");


    const preco =
        Number(texto);


    if (!Number.isFinite(preco)) {
        return 0;
    }


    return preco;

}


/*
    Retorna o preço final da Fenix.
*/

function obterPrecoFinalProduto(produto) {

    const precoBase =
        obterPrecoBaseProduto(produto);


    return precoBase + TAXA_FENIX;

}


/*
    Atualiza TODOS os preços automaticamente.

    Também substitui o onclick antigo dos botões.
*/

function atualizarPrecosProdutos() {

    const produtos =
        document.querySelectorAll(".product");


    produtos.forEach(produto => {

        const precoBase =
            obterPrecoBaseProduto(produto);


        if (!Number.isFinite(precoBase)) {
            return;
        }


        const precoFinal =
            precoBase + TAXA_FENIX;


        /* =================================
           ELEMENTOS DE PREÇO
        ================================= */

        const preco =
            produto.querySelector(".price");


        if (preco) {

            /*
                Não usamos mais "desconto".
                O valor anterior passa a ser
                apenas a referência/base.
            */

            preco.innerHTML = `

                <span class="price-label">
                    Preço normal
                </span>

                <strong>
                    R$ ${formatarPreco(precoFinal)}
                </strong>

            `;

        }


        /* =================================
           REMOVE BADGE DE DESCONTO
        ================================= */

        const desconto =
            produto.querySelector(".discount");


        if (desconto) {
            desconto.remove();
        }


        /* =================================
           BOTÃO DE COMPRA
        ================================= */

        const botao =
            produto.querySelector(".buy-button");


        if (botao) {

            const nome =
                produto.querySelector("h3")
                    ?.textContent
                    ?.trim() || "Produto";


            /*
                Guardamos o preço no elemento.
            */

            botao.dataset.price =
                precoFinal.toFixed(2);


            botao.dataset.productName =
                nome;


            /*
                Remove o onclick antigo.
            */

            botao.removeAttribute("onclick");


            /*
                Novo evento.
            */

            botao.onclick = () => {

                adicionarCarrinho(
                    nome,
                    precoFinal
                );

            };

        }

    });

}


/* =========================================
   SALVAR CARRINHO
========================================= */

function salvarCarrinho() {

    try {

        localStorage.setItem(
            "fenix_carrinho",
            JSON.stringify(carrinho)
        );

    } catch (erro) {

        console.warn(
            "Não foi possível salvar o carrinho.",
            erro
        );

    }

}


/* =========================================
   CARRINHO
========================================= */

function abrirCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (modal) {
        modal.classList.add("active");
    }

}


function fecharCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (modal) {
        modal.classList.remove("active");
    }

}


/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

function adicionarCarrinho(nome, preco) {

    preco = Number(preco);


    if (
        !nome ||
        !Number.isFinite(preco) ||
        preco < 0
    ) {
        return;
    }


    const existente =
        carrinho.find(
            produto =>
                produto.nome === nome
        );


    if (existente) {

        existente.quantidade =
            Number(
                existente.quantidade || 1
            ) + 1;


        /*
            Garante que o preço atualizado
            continue sendo usado.
        */

        existente.preco = preco;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

    animarContador();

    mostrarToast(
        "Produto adicionado ao carrinho!"
    );

}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    const container =
        document.getElementById("cart-items");

    const contador =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");

    const subtitle =
        document.getElementById("cart-subtitle");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(produto => {

        const quantidade =
            Math.max(
                1,
                Number(
                    produto.quantidade || 1
                )
            );


        const preco =
            Number(
                produto.preco || 0
            );


        total +=
            preco * quantidade;


        quantidadeTotal +=
            quantidade;

    });


    if (contador) {

        contador.textContent =
            quantidadeTotal;

    }


    if (subtitle) {

        subtitle.textContent =
            quantidadeTotal === 1
                ? "1 produto"
                : `${quantidadeTotal} produtos`;

    }


    /* =====================================
       CARRINHO VAZIO
    ===================================== */

    if (carrinho.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                <div class="cart-empty-icon">
                    🛒
                </div>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione um produto para começar.
                </p>

            </div>

        `;

    }


    /* =====================================
       PRODUTOS DO CARRINHO
    ===================================== */

    carrinho.forEach(
        (produto, index) => {

            const quantidade =
                Math.max(
                    1,
                    Number(
                        produto.quantidade || 1
                    )
                );


            const subtotal =
                Number(
                    produto.preco || 0
                ) * quantidade;


            const item =
                document.createElement("div");


            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-item-content">

                    <div class="cart-item-name">
                        ${escaparHTML(
                            produto.nome
                        )}
                    </div>

                    <div class="cart-item-price">
                        R$ ${formatarPreco(subtotal)}
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

        }
    );


    /* =====================================
       TOTAL
    ===================================== */

    if (totalElement) {

        totalElement.textContent =
            "R$ " +
            formatarPreco(total);

    }

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function alterarQuantidade(index, valor) {

    if (!carrinho[index]) {
        return;
    }


    const quantidadeAtual =
        Number(
            carrinho[index].quantidade || 1
        );


    carrinho[index].quantidade =
        quantidadeAtual +
        Number(valor);


    if (
        carrinho[index].quantidade <= 0
    ) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================================
   REMOVER PRODUTO
========================================= */

function removerProduto(index) {

    if (!carrinho[index]) {
        return;
    }


    const nome =
        carrinho[index].nome;


    carrinho.splice(index, 1);


    salvarCarrinho();

    atualizarCarrinho();


    mostrarToast(
        `${nome} removido do carrinho.`
    );

}


/* =========================================
   TOTAL
========================================= */

function obterTotal() {

    return carrinho.reduce(
        (total, produto) => {

            const preco =
                Number(
                    produto.preco || 0
                );


            const quantidade =
                Math.max(
                    1,
                    Number(
                        produto.quantidade || 1
                    )
                );


            return total +
                preco * quantidade;

        },
        0
    );

}


/* =========================================
   FORMATAÇÃO
========================================= */

function formatarPreco(valor) {

    return Number(valor || 0)
        .toFixed(2)
        .replace(".", ",");

}


/* =========================================
   SEGURANÇA HTML
========================================= */

function escaparHTML(texto) {

    return String(texto)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   CONTADOR
========================================= */

function animarContador() {

    const contador =
        document.getElementById(
            "cart-count"
        );


    if (!contador) {
        return;
    }


    contador.animate(

        [

            {
                transform:
                    "scale(1)"
            },

            {
                transform:
                    "scale(1.45)"
            },

            {
                transform:
                    "scale(1)"
            }

        ],

        {

            duration: 400,

            easing: "ease-out"

        }

    );

}


/* =========================================
   FILTROS
========================================= */

function filtrarProdutos(
    categoria,
    botao = null
) {

    filtroAtual =
        categoria || "todos";


    pesquisaAtual = "";


    const input =
        document.getElementById(
            "search-input"
        );


    if (input) {
        input.value = "";
    }


    document
        .querySelectorAll(".filter")
        .forEach(filtro => {

            filtro.classList.remove(
                "active"
            );

        });


    if (botao) {

        botao.classList.add(
            "active"
        );

    } else {

        const filtros =
            document.querySelectorAll(
                ".filter"
            );


        filtros.forEach(filtro => {

            const texto =
                filtro.textContent
                    .toLowerCase();


            if (
                categoria === "todos" &&
                texto.includes("todos")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "freefire" &&
                texto.includes("free fire")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "fortnite" &&
                texto.includes("fortnite")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "roblox" &&
                texto.includes("roblox")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "valorant" &&
                texto.includes("valorant")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "eafc" &&
                texto.includes("ea fc")
            ) {

                filtro.classList.add(
                    "active"
                );

            }


            if (
                categoria === "minecraft" &&
                texto.includes("minecraft")
            ) {

                filtro.classList.add(
                    "active"
                );

            }

        });

    }


    aplicarFiltros();


    const section =
        document.getElementById(
            "produtos"
        );


    if (section) {

        section.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }

}


/* =========================================
   APLICAR FILTROS
========================================= */

function aplicarFiltros() {

    const produtos =
        document.querySelectorAll(
            ".product"
        );


    let encontrados = 0;


    produtos.forEach(produto => {

        const jogo =
            produto.dataset.game || "";


        const textoProduto =
            produto.textContent
                .toLowerCase();


        const pertenceCategoria =
            filtroAtual === "todos" ||
            jogo === filtroAtual;


        const pertencePesquisa =
            !pesquisaAtual ||
            textoProduto.includes(
                pesquisaAtual
            );


        const mostrar =
            pertenceCategoria &&
            pertencePesquisa;


        if (mostrar) {

            produto.style.display =
                "";

            encontrados++;

        } else {

            produto.style.display =
                "none";

        }

    });


    const noResults =
        document.getElementById(
            "no-results"
        );


    if (noResults) {

        noResults.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }

}


/* =========================================
   PESQUISA
========================================= */

function abrirPesquisa() {

    const box =
        document.getElementById(
            "search-box"
        );


    if (!box) {
        return;
    }


    box.classList.toggle(
        "active"
    );


    if (
        box.classList.contains(
            "active"
        )
    ) {

        const input =
            document.getElementById(
                "search-input"
            );


        if (input) {
            input.focus();
        }

    }

}


function fecharPesquisa() {

    const box =
        document.getElementById(
            "search-box"
        );


    if (box) {
        box.classList.remove(
            "active"
        );
    }

}


function pesquisarProduto() {

    const input =
        document.getElementById(
            "search-input"
        );


    if (!input) {
        return;
    }


    pesquisaAtual =
        input.value
            .toLowerCase()
            .trim();


    aplicarFiltros();


    if (pesquisaAtual) {

        const section =
            document.getElementById(
                "produtos"
            );


        if (section) {

            section.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }

    }

}


/* =========================================
   CHECKOUT
========================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio."
        );

        return;

    }


    const total =
        obterTotal();


    const numeroPedido =
        gerarNumeroPedido();


    const totalElement =
        document.getElementById(
            "pix-total"
        );


    const pedidoElement =
        document.getElementById(
            "order-number"
        );


    const chaveElement =
        document.getElementById(
            "pix-key"
        );


    if (totalElement) {

        totalElement.textContent =
            "R$ " +
            formatarPreco(total);

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
        document.getElementById(
            "pix-modal"
        );


    if (pixModal) {

        pixModal.classList.add(
            "active"
        );

    }

}


/* =========================================
   PIX
========================================= */

function fecharPix() {

    const modal =
        document.getElementById(
            "pix-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


async function copiarPix() {

    try {

        await navigator.clipboard.writeText(
            CHAVE_PIX
        );


        mostrarToast(
            "Chave PIX copiada!"
        );

    } catch (erro) {

        const area =
            document.createElement(
                "textarea"
            );


        area.value =
            CHAVE_PIX;


        document.body.appendChild(
            area
        );


        area.select();


        document.execCommand(
            "copy"
        );


        area.remove();


        mostrarToast(
            "Chave PIX copiada!"
        );

    }

}


/* =========================================
   PEDIDO
========================================= */

function gerarNumeroPedido() {

    const agora =
        Date.now()
            .toString()
            .slice(-8);


    return "FNX-" + agora;

}


/* =========================================
   PAGAMENTO
========================================= */

function pagamentoRealizado() {

    const pedido =
        document.getElementById(
            "order-number"
        )?.textContent ||
        "FNX";


    mostrarToast(

        "Pagamento informado. " +
        "Pedido " +
        pedido +
        ". Entre em contato com " +
        "o suporte para confirmação."

    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer = null;


function mostrarToast(mensagem) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        mensagem;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}


/* =========================================
   ESC
========================================= */

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
