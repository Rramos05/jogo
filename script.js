/* =========================================================
   FENIX STORE
   Carrinho + Pesquisa + Filtros + PIX
   Regra de preço:
   PREÇO BASE + R$ 2,00
   ========================================================= */

const ACRÉSCIMO = 2.00;

let carrinho = [];

const PIX_KEY = "SUA-CHAVE-PIX-AQUI";

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    prepararPrecos();
    atualizarCarrinho();

    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        searchInput.addEventListener("input", pesquisarProdutos);

        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                fecharPesquisa();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharPesquisa();
            fecharCarrinho();
            fecharPix();
        }
    });

    const pixKey = document.getElementById("pix-key");

    if (pixKey) {
        pixKey.textContent = PIX_KEY;
    }
});


/* =========================================================
   PREÇOS
   ========================================================= */

/*
    O HTML original possui:

    <del>R$ XX,XX</del>
    <strong>R$ XX,XX</strong>

    O valor dentro do <del> é tratado como preço-base.
    O preço final será:
    
    preço-base + R$ 2,00

    O desconto é removido.
*/

function prepararPrecos() {

    const produtos = document.querySelectorAll(".product");

    produtos.forEach((produto) => {

        const precoBaseElement = produto.querySelector(".price del");
        const precoFinalElement = produto.querySelector(".price strong");
        const descontoElement = produto.querySelector(".discount");

        if (!precoBaseElement || !precoFinalElement) {
            return;
        }

        const precoBase = extrairPreco(precoBaseElement.textContent);

        if (isNaN(precoBase)) {
            return;
        }

        const precoFinal = precoBase + ACRÉSCIMO;

        /* Remove desconto */
        if (descontoElement) {
            descontoElement.remove();
        }

        /* Remove preço riscado */
        precoBaseElement.remove();

        /* Mostra somente o preço final */
        precoFinalElement.textContent = formatarPreco(precoFinal);

        /* Guarda o preço real para o carrinho */
        produto.dataset.price = precoFinal.toFixed(2);

        /*
            Atualiza também o botão.
            Não dependemos mais do preço antigo
            que estava escrito no onclick do HTML.
        */

        const botao = produto.querySelector(".buy-button");

        if (botao) {

            const titulo = produto.querySelector("h3");

            if (titulo) {
                botao.dataset.product = titulo.textContent.trim();
            }

            botao.dataset.price = precoFinal.toFixed(2);

            botao.onclick = null;

            botao.addEventListener("click", () => {

                const nome = botao.dataset.product;
                const preco = Number(botao.dataset.price);

                adicionarCarrinho(nome, preco);
            });
        }
    });
}


/* =========================================================
   CONVERSÃO DE PREÇO
   ========================================================= */

function extrairPreco(texto) {

    if (!texto) {
        return NaN;
    }

    return Number(
        texto
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
    );
}


function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   CARRINHO
   ========================================================= */

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: Number(preco),
            quantidade: 1
        });
    }

    atualizarCarrinho();

    mostrarToast(`${nome} adicionado ao carrinho.`);

    abrirCarrinho();
}


function removerCarrinho(index) {

    if (index < 0 || index >= carrinho.length) {
        return;
    }

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


function alterarQuantidade(index, quantidade) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade += quantidade;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}


/* =========================================================
   ATUALIZAR CARRINHO
   ========================================================= */

function atualizarCarrinho() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartSubtitle = document.getElementById("cart-subtitle");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    let quantidadeTotal = 0;
    let valorTotal = 0;

    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;
    });


    /* CONTADOR */

    if (cartCount) {
        cartCount.textContent = quantidadeTotal;
    }


    /* SUBTÍTULO */

    if (cartSubtitle) {

        if (quantidadeTotal === 0) {
            cartSubtitle.textContent = "0 produtos";
        }

        else if (quantidadeTotal === 1) {
            cartSubtitle.textContent = "1 produto";
        }

        else {
            cartSubtitle.textContent =
                `${quantidadeTotal} produtos`;
        }
    }


    /* TOTAL */

    if (cartTotal) {
        cartTotal.textContent =
            formatarPreco(valorTotal);
    }


    /* ITENS */

    if (carrinho.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos para continuar.</p>
            </div>
        `;

        return;
    }


    cartItems.innerHTML = carrinho.map(
        (item, index) => {

            const subtotal =
                item.preco * item.quantidade;

            return `
                <div class="cart-item">

                    <div class="cart-item-name">
                        ${escaparHTML(item.nome)}
                    </div>

                    <div class="cart-item-price">
                        ${formatarPreco(subtotal)}
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
                            ${item.quantidade}
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
                            onclick="removerCarrinho(${index})"
                        >
                            Remover
                        </button>

                    </div>

                </div>
            `;
        }
    ).join("");
}


/* =========================================================
   ABRIR / FECHAR CARRINHO
   ========================================================= */

function abrirCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    document.body.classList.add("modal-open");
}


function fecharCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   PESQUISA
   ========================================================= */

function abrirPesquisa() {

    const box =
        document.getElementById("search-box");

    const input =
        document.getElementById("search-input");

    if (!box) {
        return;
    }

    box.classList.add("active");

    if (input) {
        setTimeout(() => {
            input.focus();
        }, 100);
    }
}


function fecharPesquisa() {

    const box =
        document.getElementById("search-box");

    const input =
        document.getElementById("search-input");

    if (!box) {
        return;
    }

    box.classList.remove("active");

    if (input) {
        input.value = "";
    }

    mostrarTodosProdutos();
}


/* =========================================================
   PESQUISAR PRODUTOS
   ========================================================= */

function pesquisarProdutos() {

    const input =
        document.getElementById("search-input");

    if (!input) {
        return;
    }

    const termo =
        normalizarTexto(input.value.trim());

    const produtos =
        document.querySelectorAll(".product");

    let encontrados = 0;

    produtos.forEach(produto => {

        const texto =
            normalizarTexto(produto.textContent);

        const corresponde =
            termo === "" ||
            texto.includes(termo);

        produto.style.display =
            corresponde ? "" : "none";

        if (corresponde) {
            encontrados++;
        }
    });

    atualizarNoResults(encontrados);

    if (termo !== "") {
        document
            .getElementById("produtos")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }
}


/* =========================================================
   FILTROS
   ========================================================= */

function filtrarProdutos(game, botao = null) {

    const produtos =
        document.querySelectorAll(".product");

    let encontrados = 0;

    produtos.forEach(produto => {

        const categoria =
            produto.dataset.game;

        const mostrar =
            game === "todos" ||
            categoria === game;

        produto.style.display =
            mostrar ? "" : "none";

        if (mostrar) {
            encontrados++;
        }
    });


    /* BOTÕES DE FILTRO */

    document
        .querySelectorAll(".filter")
        .forEach(filter => {

            filter.classList.remove("active");
        });


    if (botao) {

        botao.classList.add("active");

    } else {

        const filtroCorrespondente =
            document.querySelector(
                `.filter[onclick*="'${game}'"]`
            );

        if (filtroCorrespondente) {
            filtroCorrespondente.classList.add("active");
        }
    }


    atualizarNoResults(encontrados);


    /* Vai para produtos quando clicar em categoria */

    if (event instanceof Event) {

        const produtosSection =
            document.getElementById("produtos");

        if (produtosSection) {

            produtosSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
}


/* =========================================================
   MOSTRAR TODOS
   ========================================================= */

function mostrarTodosProdutos() {

    const produtos =
        document.querySelectorAll(".product");

    produtos.forEach(produto => {
        produto.style.display = "";
    });

    atualizarNoResults(produtos.length);

    document
        .querySelectorAll(".filter")
        .forEach(filter => {
            filter.classList.remove("active");
        });

    const todos =
        document.querySelector(
            '.filter[onclick*="todos"]'
        );

    if (todos) {
        todos.classList.add("active");
    }
}


/* =========================================================
   RESULTADOS
   ========================================================= */

function atualizarNoResults(quantidade) {

    const noResults =
        document.getElementById("no-results");

    if (!noResults) {
        return;
    }

    noResults.style.display =
        quantidade === 0 ? "block" : "none";
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Adicione pelo menos um produto ao carrinho."
        );

        return;
    }

    const total =
        calcularTotalCarrinho();

    const numeroPedido =
        gerarNumeroPedido();


    const orderNumber =
        document.getElementById("order-number");

    const pixTotal =
        document.getElementById("pix-total");

    const pixKey =
        document.getElementById("pix-key");


    if (orderNumber) {
        orderNumber.textContent =
            numeroPedido;
    }

    if (pixTotal) {
        pixTotal.textContent =
            formatarPreco(total);
    }

    if (pixKey) {
        pixKey.textContent =
            PIX_KEY;
    }


    fecharCarrinho();

    const modal =
        document.getElementById("pix-modal");

    if (modal) {
        modal.classList.add("active");
    }
}


function calcularTotalCarrinho() {

    return carrinho.reduce(
        (total, item) =>
            total + item.preco * item.quantidade,
        0
    );
}


function gerarNumeroPedido() {

    const agora = new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(agora.getMonth() + 1)
            .padStart(2, "0");

    const dia =
        String(agora.getDate())
            .padStart(2, "0");

    const aleatorio =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `FNX-${ano}${mes}${dia}-${aleatorio}`;
}


/* =========================================================
   PIX
   ========================================================= */

function fecharPix() {

    const modal =
        document.getElementById("pix-modal");

    if (modal) {
        modal.classList.remove("active");
    }
}


async function copiarPix() {

    const pixKey =
        document.getElementById("pix-key");

    if (!pixKey) {
        return;
    }

    const chave =
        pixKey.textContent.trim();

    try {

        await navigator.clipboard.writeText(chave);

        mostrarToast(
            "Chave PIX copiada!"
        );

    } catch (erro) {

        /* Fallback para navegadores antigos */

        const area =
            document.createElement("textarea");

        area.value = chave;

        document.body.appendChild(area);

        area.select();

        document.execCommand("copy");

        area.remove();

        mostrarToast(
            "Chave PIX copiada!"
        );
    }
}


function pagamentoRealizado() {

    mostrarToast(
        "Pagamento informado. Aguarde a confirmação do suporte."
    );

    setTimeout(() => {
        fecharPix();
    }, 2200);
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;


function mostrarToast(mensagem) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }

    clearTimeout(toastTimeout);

    toast.textContent = mensagem;

    toast.classList.add("show");

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================================================
   UTILITÁRIOS
   ========================================================= */

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


/* =========================================================
   FECHAR MODAIS CLICANDO FORA
   ========================================================= */

document.addEventListener("click", (event) => {

    const cartModal =
        document.getElementById("cart-modal");

    const pixModal =
        document.getElementById("pix-modal");


    if (
        cartModal &&
        event.target === cartModal
    ) {
        fecharCarrinho();
    }


    if (
        pixModal &&
        event.target === pixModal
    ) {
        fecharPix();
    }
});


/* =========================================================
   BLOQUEAR SCROLL QUANDO MODAL ESTÁ ABERTO
   ========================================================= */

const observer =
    new MutationObserver(() => {

        const cart =
            document.getElementById("cart-modal");

        const pix =
            document.getElementById("pix-modal");

        const aberto =
            cart?.classList.contains("active") ||
            pix?.classList.contains("active");

        document.body.classList.toggle(
            "modal-open",
            Boolean(aberto)
        );
    });


observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
});
