```javascript
/* =====================================
   FENIX STORE
   FRONTEND — VERSÃO MELHORADA
===================================== */


/* =====================================
   CONFIGURAÇÃO
===================================== */

const CHAVE_PIX = "53997094670";

const STORAGE_KEY = "fenix_carrinho";


/* =====================================
   ESTADO
===================================== */

let carrinho = [];
let filtroAtual = "todos";
let pesquisaAtual = "";

let ultimoPedido = null;


/* =====================================
   ELEMENTOS
===================================== */

const elementos = {};


/* =====================================
   INICIALIZAÇÃO
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    carregarCarrinho();

    obterElementos();

    configurarEventos();

    atualizarCarrinho();

    atualizarProdutos();

    atualizarChavePix();

});


/* =====================================
   ELEMENTOS
===================================== */

function obterElementos() {

    elementos.cartModal =
        document.getElementById("cart-modal");

    elementos.cartItems =
        document.getElementById("cart-items");

    elementos.cartCount =
        document.getElementById("cart-count");

    elementos.cartItemsTotal =
        document.getElementById("cart-items-total");

    elementos.cartTotal =
        document.getElementById("cart-total");

    elementos.checkoutButton =
        document.getElementById("checkout-button");

    elementos.searchButton =
        document.getElementById("search-button");

    elementos.searchBox =
        document.getElementById("search-box");

    elementos.searchInput =
        document.getElementById("search-input");

    elementos.clearSearch =
        document.getElementById("clear-search");

    elementos.closeSearch =
        document.getElementById("close-search");

    elementos.pixModal =
        document.getElementById("pix-modal");

    elementos.pixKey =
        document.getElementById("pix-key");

    elementos.pixTotal =
        document.getElementById("pix-total");

    elementos.orderNumber =
        document.getElementById("order-number");

    elementos.products =
        document.querySelectorAll(".product");

    elementos.noResults =
        document.getElementById("no-results");

    elementos.resultsCount =
        document.getElementById("results-count");

    elementos.toastContainer =
        document.getElementById("toast-container");

}


/* =====================================
   EVENTOS
===================================== */

function configurarEventos() {

    /* Pesquisa */

    elementos.searchButton?.addEventListener(
        "click",
        alternarPesquisa
    );

    elementos.closeSearch?.addEventListener(
        "click",
        fecharPesquisa
    );

    elementos.clearSearch?.addEventListener(
        "click",
        limparPesquisa
    );

    elementos.searchInput?.addEventListener(
        "input",
        pesquisarProduto
    );


    /* Carrinho */

    document
        .getElementById("cart-button")
        ?.addEventListener(
            "click",
            abrirCarrinho
        );

    document
        .getElementById("close-cart")
        ?.addEventListener(
            "click",
            fecharCarrinho
        );

    document
        .getElementById("continue-shopping")
        ?.addEventListener(
            "click",
            fecharCarrinho
        );

    elementos.checkoutButton?.addEventListener(
        "click",
        finalizarCompra
    );


    /* Produtos */

    document
        .querySelectorAll(".buy-button")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const nome =
                        botao.dataset.product;

                    const preco =
                        Number(botao.dataset.price);

                    adicionarCarrinho(
                        nome,
                        preco,
                        botao
                    );

                }
            );

        });


    /* Filtros */

    document
        .querySelectorAll(".filter")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    definirFiltro(
                        botao.dataset.filter
                    );

                }
            );

        });


    /* Categorias */

    document
        .querySelectorAll(".category")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    definirFiltro(
                        botao.dataset.category
                    );

                    document
                        .getElementById("produtos")
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                }
            );

        });


    /* Reset */

    document
        .getElementById("reset-products")
        ?.addEventListener(
            "click",
            resetarProdutos
        );


    /* PIX */

    document
        .getElementById("close-pix")
        ?.addEventListener(
            "click",
            fecharPix
        );

    document
        .getElementById("copy-pix")
        ?.addEventListener(
            "click",
            copiarPix
        );

    document
        .getElementById("payment-done")
        ?.addEventListener(
            "click",
            pagamentoRealizado
        );


    /* Clique fora dos modais */

    elementos.cartModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elementos.cartModal
            ) {

                fecharCarrinho();

            }

        }
    );


    elementos.pixModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elementos.pixModal
            ) {

                fecharPix();

            }

        }
    );


    /* ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            fecharCarrinho();
            fecharPix();
            fecharPesquisa();

        }
    );

}


/* =====================================
   CARRINHO — STORAGE
===================================== */

function carregarCarrinho() {

    try {

        const salvo =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!salvo) {
            carrinho = [];
            return;
        }

        const dados =
            JSON.parse(salvo);

        if (!Array.isArray(dados)) {
            carrinho = [];
            return;
        }

        carrinho =
            dados.filter(produto => {

                return (
                    produto &&
                    typeof produto.nome === "string" &&
                    Number.isFinite(
                        Number(produto.preco)
                    ) &&
                    Number(produto.preco) >= 0
                );

            }).map(produto => ({

                nome: produto.nome,

                preco: Number(produto.preco),

                quantidade:
                    Math.max(
                        1,
                        Number(produto.quantidade) || 1
                    )

            }));

    } catch (erro) {

        carrinho = [];

        console.warn(
            "Não foi possível carregar o carrinho.",
            erro
        );

    }

}


function salvarCarrinho() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(carrinho)
        );

    } catch (erro) {

        console.warn(
            "Não foi possível salvar o carrinho.",
            erro
        );

    }

}


/* =====================================
   CARRINHO — ABRIR/FECHAR
===================================== */

function abrirCarrinho() {

    elementos.cartModal?.classList.add(
        "active"
    );

    elementos.cartModal?.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function fecharCarrinho() {

    elementos.cartModal?.classList.remove(
        "active"
    );

    elementos.cartModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        !elementos.pixModal?.classList.contains(
            "active"
        )
    ) {

        document.body.classList.remove(
            "no-scroll"
        );

    }

}


/* =====================================
   ADICIONAR
===================================== */

function adicionarCarrinho(
    nome,
    preco,
    botao = null
) {

    const precoNumerico =
        Number(preco);


    if (
        !nome ||
        !Number.isFinite(precoNumerico) ||
        precoNumerico < 0
    ) {

        mostrarToast(
            "Produto inválido.",
            "error"
        );

        return;

    }


    const existente =
        carrinho.find(
            produto =>
                produto.nome === nome
        );


    if (existente) {

        existente.quantidade += 1;

    } else {

        carrinho.push({

            nome,

            preco: precoNumerico,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    animarContador();

    abrirCarrinho();


    if (botao) {

        const textoOriginal =
            botao.innerHTML;

        botao.classList.add("added");

        botao.innerHTML =
            "✓ Adicionado";

        setTimeout(() => {

            botao.classList.remove("added");

            botao.innerHTML =
                textoOriginal;

        }, 900);

    }


    mostrarToast(
        `${nome} foi adicionado ao carrinho.`,
        "success"
    );

}


/* =====================================
   ATUALIZAR CARRINHO
===================================== */

function atualizarCarrinho() {

    if (!elementos.cartItems) {
        return;
    }


    elementos.cartItems.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(produto => {

        const quantidade =
            Math.max(
                1,
                Number(produto.quantidade) || 1
            );

        total +=
            Number(produto.preco) *
            quantidade;

        quantidadeTotal +=
            quantidade;

    });


    if (elementos.cartCount) {

        elementos.cartCount.textContent =
            quantidadeTotal;

    }


    if (elementos.cartItemsTotal) {

        elementos.cartItemsTotal.textContent =
            quantidadeTotal;

    }


    if (elementos.cartTotal) {

        elementos.cartTotal.textContent =
            formatarMoeda(total);

    }


    if (carrinho.length === 0) {

        elementos.cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione um produto para continuar.
                </p>

            </div>

        `;

        if (elementos.checkoutButton) {

            elementos.checkoutButton.disabled =
                true;

            elementos.checkoutButton.style.opacity =
                ".5";

            elementos.checkoutButton.style.cursor =
                "not-allowed";

        }

        return;

    }


    if (elementos.checkoutButton) {

        elementos.checkoutButton.disabled =
            false;

        elementos.checkoutButton.style.opacity =
            "1";

        elementos.checkoutButton.style.cursor =
            "pointer";

    }


    carrinho.forEach(
        (produto, index) => {

            const quantidade =
                Number(produto.quantidade) || 1;

            const subtotal =
                Number(produto.preco) *
                quantidade;


            const item =
                document.createElement("div");

            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-name">
                        ${escaparHTML(
                            produto.nome
                        )}
                    </div>

                    <div class="cart-item-unit">
                        ${formatarMoeda(
                            produto.preco
                        )} por unidade
                    </div>

                    <div class="cart-item-price">
                        ${formatarMoeda(
                            subtotal
                        )}
                    </div>

                    <div class="cart-actions">

                        <button
                            type="button"
                            class="quantity-button"
                            data-action="decrease"
                            aria-label="Diminuir quantidade"
                        >
                            −
                        </button>

                        <span
                            class="quantity-number"
                        >
                            ${quantidade}
                        </span>

                        <button
                            type="button"
                            class="quantity-button"
                            data-action="increase"
                            aria-label="Aumentar quantidade"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            class="remove-button"
                            data-action="remove"
                        >
                            Remover
                        </button>

                    </div>

                </div>

            `;


            item
                .querySelector(
                    '[data-action="decrease"]'
                )
                ?.addEventListener(
                    "click",
                    () => alterarQuantidade(
                        index,
                        -1
                    )
                );


            item
                .querySelector(
                    '[data-action="increase"]'
                )
                ?.addEventListener(
                    "click",
                    () => alterarQuantidade(
                        index,
                        1
                    )
                );


            item
                .querySelector(
                    '[data-action="remove"]'
                )
                ?.addEventListener(
                    "click",
                    () => removerProduto(
                        index
                    )
                );


            elementos.cartItems
                .appendChild(item);

        }
    );

}


/* =====================================
   QUANTIDADE
===================================== */

function alterarQuantidade(
    index,
    quantidade
) {

    const produto =
        carrinho[index];


    if (!produto) {
        return;
    }


    produto.quantidade =
        (
            Number(produto.quantidade) || 1
        ) + quantidade;


    if (produto.quantidade <= 0) {

        carrinho.splice(
            index,
            1
        );

        mostrarToast(
            "Produto removido do carrinho.",
            "success"
        );

    }


    salvarCarrinho();

    atualizarCarrinho();

}


function removerProduto(index) {

    if (!carrinho[index]) {
        return;
    }


    const nome =
        carrinho[index].nome;


    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();


    mostrarToast(
        `${nome} foi removido.`,
        "success"
    );

}


/* =====================================
   TOTAL
===================================== */

function obterTotal() {

    return carrinho.reduce(
        (total, produto) => {

            return (
                total +
                Number(produto.preco) *
                (
                    Number(produto.quantidade) ||
                    1
                )
            );

        },
        0
    );

}


/* =====================================
   PESQUISA
===================================== */

function alternarPesquisa() {

    const ativo =
        elementos.searchBox
            ?.classList
            .toggle("active");


    elementos.searchBox?.setAttribute(
        "aria-hidden",
        ativo ? "false" : "true"
    );


    elementos.searchButton?.setAttribute(
        "aria-expanded",
        ativo ? "true" : "false"
    );


    if (ativo) {

        setTimeout(() => {

            elementos.searchInput?.focus();

        }, 50);

    }

}


function fecharPesquisa() {

    elementos.searchBox?.classList.remove(
        "active"
    );

    elementos.searchBox?.setAttribute(
        "aria-hidden",
        "true"
    );

    elementos.searchButton?.setAttribute(
        "aria-expanded",
        "false"
    );

}


function limparPesquisa() {

    if (!elementos.searchInput) {
        return;
    }


    elementos.searchInput.value = "";

    pesquisaAtual = "";

    atualizarProdutos();

    elementos.searchInput.focus();

}


function pesquisarProduto() {

    pesquisaAtual =
        elementos.searchInput?.value
            .toLowerCase()
            .trim() || "";


    atualizarProdutos();

}


/* =====================================
   FILTROS
===================================== */

function definirFiltro(categoria) {

    filtroAtual =
        categoria || "todos";


    document
        .querySelectorAll(".filter")
        .forEach(botao => {

            botao.classList.toggle(
                "active",
                botao.dataset.filter ===
                filtroAtual
            );

        });


    atualizarProdutos();

}


function atualizarProdutos() {

    if (!elementos.products) {
        return;
    }


    let encontrados = 0;


    elementos.products.forEach(
        produto => {

            const jogo =
                produto.dataset.game
                    ?.toLowerCase() || "";


            const nome =
                (
                    produto.dataset.name ||
                    produto
                        .querySelector("h3")
                        ?.textContent ||
                    ""
                )
                    .toLowerCase();


            const categoria =
                produto
                    .querySelector(
                        ".product-category"
                    )
                    ?.textContent
                    .toLowerCase() || "";


            const correspondeCategoria =
                filtroAtual === "todos" ||
                jogo === filtroAtual;


            const correspondePesquisa =
                !pesquisaAtual ||
                nome.includes(pesquisaAtual) ||
                categoria.includes(pesquisaAtual) ||
                jogo.includes(pesquisaAtual);


            const mostrar =
                correspondeCategoria &&
                correspondePesquisa;


            produto.classList.toggle(
                "hidden",
                !mostrar
            );


            if (mostrar) {

                encontrados++;

            }

        }
    );


    if (elementos.resultsCount) {

        elementos.resultsCount.textContent =
            `${encontrados} ${
                encontrados === 1
                    ? "produto"
                    : "produtos"
            }`;

    }


    if (elementos.noResults) {

        elementos.noResults.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }

}


/* =====================================
   RESET
===================================== */

function resetarProdutos() {

    filtroAtual = "todos";

    pesquisaAtual = "";


    if (elementos.searchInput) {

        elementos.searchInput.value = "";

    }


    definirFiltro("todos");

}


/* =====================================
   CHECKOUT
===================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio.",
            "error"
        );

        return;

    }


    const total =
        obterTotal();


    const numeroPedido =
        gerarNumeroPedido();


    ultimoPedido = {

        numero: numeroPedido,

        total,

        produtos:
            carrinho.map(produto => ({
                nome: produto.nome,
                preco: produto.preco,
                quantidade:
                    produto.quantidade
            })),

        criadoEm:
            new Date().toISOString()

    };


    if (elementos.pixTotal) {

        elementos.pixTotal.textContent =
            formatarMoeda(total);

    }


    if (elementos.orderNumber) {

        elementos.orderNumber.textContent =
            numeroPedido;

    }


    fecharCarrinho();

    abrirPix();

}


/* =====================================
   PIX
===================================== */

function atualizarChavePix() {

    if (elementos.pixKey) {

        elementos.pixKey.textContent =
            CHAVE_PIX;

    }

}


function abrirPix() {

    elementos.pixModal?.classList.add(
        "active"
    );

    elementos.pixModal?.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function fecharPix() {

    elementos.pixModal?.classList.remove(
        "active"
    );

    elementos.pixModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        !elementos.cartModal?.classList.contains(
            "active"
        )
    ) {

        document.body.classList.remove(
            "no-scroll"
        );

    }

}


/* =====================================
   COPIAR PIX
===================================== */

async function copiarPix() {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                CHAVE_PIX
            );

        } else {

            copiarFallback(CHAVE_PIX);

        }


        mostrarToast(
            "Chave PIX copiada!",
            "success"
        );

    } catch (erro) {

        mostrarToast(
            "Não foi possível copiar a chave.",
            "error"
        );

    }

}


function copiarFallback(texto) {

    const area =
        document.createElement(
            "textarea"
        );


    area.value = texto;

    area.style.position = "fixed";
    area.style.opacity = "0";

    document.body.appendChild(area);

    area.focus();
    area.select();

    document.execCommand("copy");

    area.remove();

}


/* =====================================
   PAGAMENTO INFORMADO
===================================== */

function pagamentoRealizado() {

    const pedido =
        ultimoPedido?.numero ||
        elementos.orderNumber?.textContent ||
        "FNX";


    mostrarToast(
        "Pagamento informado. A confirmação ainda depende da verificação da loja.",
        "success"
    );


    setTimeout(() => {

        alert(
            "Pagamento informado!\n\n" +
            "Número do pedido: " +
            pedido +
            "\n\n" +
            "A confirmação do pagamento deverá ser feita pela loja antes da entrega do produto."
        );

    }, 150);

}


/* =====================================
   PEDIDO
===================================== */

function gerarNumeroPedido() {

    const tempo =
        Date.now()
            .toString()
            .slice(-8);


    const aleatorio =
        Math.floor(
            100 +
            Math.random() * 900
        );


    return `FNX-${tempo}-${aleatorio}`;

}


/* =====================================
   TOAST
===================================== */

function mostrarToast(
    mensagem,
    tipo = "success"
) {

    if (!elementos.toastContainer) {
        return;
    }


    const toast =
        document.createElement("div");


    toast.className =
        `toast ${tipo}`;


    const icone =
        tipo === "error"
            ? "⚠️"
            : "✓";


    toast.innerHTML = `

        <strong>
            ${icone}
        </strong>

        <span>
            ${escaparHTML(mensagem)}
        </span>

    `;


    elementos.toastContainer
        .appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 3100);

}


/* =====================================
   ANIMAÇÃO DO CONTADOR
===================================== */

function animarContador() {

    if (!elementos.cartCount) {
        return;
    }


    elementos.cartCount.animate(

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
   FORMATAÇÃO
===================================== */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================
   SEGURANÇA — HTML
===================================== */

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
```
