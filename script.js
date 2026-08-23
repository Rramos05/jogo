/* =========================================
   FENIX STORE
   JAVASCRIPT COMPLETO
========================================= */


/* =========================================
   CONFIGURAÇÃO
========================================= */

/*
   ALTERE AQUI SUA CHAVE PIX.

   Exemplo:

   const CHAVE_PIX = "11999999999";
*/

const CHAVE_PIX = "53997094670";


/*
   CONFIGURAÇÃO DO SUPORTE

   Coloque aqui seu WhatsApp quando tiver.

   Exemplo:

   const WHATSAPP_SUPORTE = "5553999999999";

   Deixe vazio por enquanto se não quiser usar.
*/

const WHATSAPP_SUPORTE = "";


/* =========================================
   PRODUTOS
========================================= */

const produtos = [

    /* =========================
       FREE FIRE
    ========================= */

    {
        id: "ff-100",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "100 Diamantes",
        descricao: "Pacote de 100 diamantes para Free Fire.",
        preco: 4.90,
        antigo: 5.90,
        desconto: 17,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },

    {
        id: "ff-310",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "310 Diamantes",
        descricao: "Pacote de 310 diamantes para Free Fire.",
        preco: 13.90,
        antigo: 16.90,
        desconto: 18,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },

    {
        id: "ff-520",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "520 Diamantes",
        descricao: "Pacote de 520 diamantes para Free Fire.",
        preco: 20.90,
        antigo: 24.90,
        desconto: 16,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },

    {
        id: "ff-1060",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "1.060 Diamantes",
        descricao: "Pacote de 1.060 diamantes para Free Fire.",
        preco: 39.90,
        antigo: 49.90,
        desconto: 20,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },

    {
        id: "ff-2180",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "2.180 Diamantes",
        descricao: "Pacote de 2.180 diamantes para Free Fire.",
        preco: 79.90,
        antigo: 99.90,
        desconto: 20,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },

    {
        id: "ff-5600",
        jogo: "freefire",
        categoria: "FREE FIRE",
        nome: "5.600 Diamantes",
        descricao: "Pacote de 5.600 diamantes para Free Fire.",
        preco: 199.90,
        antigo: 249.90,
        desconto: 20,
        imagem: "./imagens/freefire.jpg",
        icone: "💎"
    },


    /* =========================
       FORTNITE
    ========================= */

    {
        id: "fn-800",
        jogo: "fortnite",
        categoria: "FORTNITE",
        nome: "800 V-Bucks",
        descricao: "Pacote de V-Bucks para Fortnite.",
        preco: 29.90,
        antigo: 34.90,
        desconto: 14,
        imagem: "./imagens/fortnite.jpg",
        icone: "🟣"
    },

    {
        id: "fn-2800",
        jogo: "fortnite",
        categoria: "FORTNITE",
        nome: "2.800 V-Bucks",
        descricao: "Pacote de V-Bucks para Fortnite.",
        preco: 89.90,
        antigo: 99.90,
        desconto: 10,
        imagem: "./imagens/fortnite.jpg",
        icone: "🟣"
    },

    {
        id: "fn-5000",
        jogo: "fortnite",
        categoria: "FORTNITE",
        nome: "5.000 V-Bucks",
        descricao: "Pacote de V-Bucks para Fortnite.",
        preco: 149.90,
        antigo: 169.90,
        desconto: 12,
        imagem: "./imagens/fortnite.jpg",
        icone: "🟣"
    },

    {
        id: "fn-13500",
        jogo: "fortnite",
        categoria: "FORTNITE",
        nome: "13.500 V-Bucks",
        descricao: "Pacote grande de V-Bucks para Fortnite.",
        preco: 349.90,
        antigo: 399.90,
        desconto: 12,
        imagem: "./imagens/fortnite.jpg",
        icone: "🟣"
    },


    /* =========================
       ROBLOX
    ========================= */

    {
        id: "rb-400",
        jogo: "roblox",
        categoria: "ROBLOX",
        nome: "400 Robux",
        descricao: "Pacote de Robux para Roblox.",
        preco: 19.90,
        antigo: 24.90,
        desconto: 20,
        imagem: "./imagens/roblox.jpg",
        icone: "🟦"
    },

    {
        id: "rb-800",
        jogo: "roblox",
        categoria: "ROBLOX",
        nome: "800 Robux",
        descricao: "Pacote de Robux para Roblox.",
        preco: 34.90,
        antigo: 39.90,
        desconto: 13,
        imagem: "./imagens/roblox.jpg",
        icone: "🟦"
    },

    {
        id: "rb-1700",
        jogo: "roblox",
        categoria: "ROBLOX",
        nome: "1.700 Robux",
        descricao: "Pacote de Robux para Roblox.",
        preco: 69.90,
        antigo: 79.90,
        desconto: 13,
        imagem: "./imagens/roblox.jpg",
        icone: "🟦"
    },

    {
        id: "rb-4500",
        jogo: "roblox",
        categoria: "ROBLOX",
        nome: "4.500 Robux",
        descricao: "Pacote grande de Robux para Roblox.",
        preco: 159.90,
        antigo: 179.90,
        desconto: 11,
        imagem: "./imagens/roblox.jpg",
        icone: "🟦"
    },


    /* =========================
       VALORANT
    ========================= */

    {
        id: "va-475",
        jogo: "valorant",
        categoria: "VALORANT",
        nome: "475 VP",
        descricao: "Valorant Points para sua conta.",
        preco: 19.90,
        antigo: 24.90,
        desconto: 20,
        imagem: "./imagens/valorant.jpg",
        icone: "🎯"
    },

    {
        id: "va-1000",
        jogo: "valorant",
        categoria: "VALORANT",
        nome: "1.000 VP",
        descricao: "Valorant Points para sua conta.",
        preco: 39.90,
        antigo: 44.90,
        desconto: 11,
        imagem: "./imagens/valorant.jpg",
        icone: "🎯"
    },

    {
        id: "va-2050",
        jogo: "valorant",
        categoria: "VALORANT",
        nome: "2.050 VP",
        descricao: "Valorant Points para sua conta.",
        preco: 79.90,
        antigo: 89.90,
        desconto: 11,
        imagem: "./imagens/valorant.jpg",
        icone: "🎯"
    },

    {
        id: "va-3650",
        jogo: "valorant",
        categoria: "VALORANT",
        nome: "3.650 VP",
        descricao: "Pacote grande de Valorant Points.",
        preco: 139.90,
        antigo: 159.90,
        desconto: 13,
        imagem: "./imagens/valorant.jpg",
        icone: "🎯"
    },


    /* =========================
       EA SPORTS FC
    ========================= */

    {
        id: "fc-1050",
        jogo: "eafc",
        categoria: "EA SPORTS FC",
        nome: "1.050 FC Points",
        descricao: "FC Points para EA Sports FC.",
        preco: 39.90,
        antigo: 44.90,
        desconto: 11,
        imagem: "./imagens/eafc.jpg",
        icone: "⚽"
    },

    {
        id: "fc-2800",
        jogo: "eafc",
        categoria: "EA SPORTS FC",
        nome: "2.800 FC Points",
        descricao: "FC Points para EA Sports FC.",
        preco: 89.90,
        antigo: 99.90,
        desconto: 10,
        imagem: "./imagens/eafc.jpg",
        icone: "⚽"
    },

    {
        id: "fc-5900",
        jogo: "eafc",
        categoria: "EA SPORTS FC",
        nome: "5.900 FC Points",
        descricao: "Pacote grande de FC Points.",
        preco: 179.90,
        antigo: 199.90,
        desconto: 10,
        imagem: "./imagens/eafc.jpg",
        icone: "⚽"
    },


    /* =========================
       MINECRAFT
    ========================= */

    {
        id: "mc-320",
        jogo: "minecraft",
        categoria: "MINECRAFT",
        nome: "320 Minecoins",
        descricao: "Moeda digital para Minecraft.",
        preco: 9.90,
        antigo: 12.90,
        desconto: 23,
        imagem: "./imagens/minecraft.jpg",
        icone: "🟩"
    },

    {
        id: "mc-1020",
        jogo: "minecraft",
        categoria: "MINECRAFT",
        nome: "1.020 Minecoins",
        descricao: "Moedas digitais para Minecraft.",
        preco: 29.90,
        antigo: 34.90,
        desconto: 14,
        imagem: "./imagens/minecraft.jpg",
        icone: "🟩"
    },

    {
        id: "mc-1720",
        jogo: "minecraft",
        categoria: "MINECRAFT",
        nome: "1.720 Minecoins",
        descricao: "Pacote de Minecoins para Minecraft.",
        preco: 49.90,
        antigo: 59.90,
        desconto: 17,
        imagem: "./imagens/minecraft.jpg",
        icone: "🟩"
    },

    {
        id: "mc-3500",
        jogo: "minecraft",
        categoria: "MINECRAFT",
        nome: "3.500 Minecoins",
        descricao: "Pacote grande de Minecoins.",
        preco: 89.90,
        antigo: 99.90,
        desconto: 10,
        imagem: "./imagens/minecraft.jpg",
        icone: "🟩"
    }

];


/* =========================================
   CARRINHO
========================================= */

let carrinho = [];

try {

    const salvo =
        localStorage.getItem("fenix_carrinho");

    if (salvo) {

        const dados =
            JSON.parse(salvo);

        if (Array.isArray(dados)) {

            carrinho = dados;

        }

    }

} catch (erro) {

    carrinho = [];

}


/* =========================================
   PEDIDO ATUAL
========================================= */

let pedidoAtual = null;


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderizarProdutos();

        atualizarCarrinho();

        configurarPesquisa();

        configurarModais();

        const pixKey =
            document.getElementById("pix-key");

        if (pixKey) {

            pixKey.textContent =
                CHAVE_PIX;

        }

    }
);


/* =========================================
   RENDERIZAR PRODUTOS
========================================= */

function renderizarProdutos(
    categoria = "todos",
    pesquisa = ""
) {

    const container =
        document.getElementById("products");

    const noResults =
        document.getElementById("no-results");


    if (!container) {

        return;

    }


    const texto =
        pesquisa
            .toLowerCase()
            .trim();


    container.innerHTML = "";


    const encontrados =
        produtos.filter(produto => {

            const categoriaOK =
                categoria === "todos" ||
                produto.jogo === categoria;


            const pesquisaOK =
                !texto ||
                produto.nome
                    .toLowerCase()
                    .includes(texto) ||

                produto.categoria
                    .toLowerCase()
                    .includes(texto) ||

                produto.jogo
                    .toLowerCase()
                    .includes(texto);


            return categoriaOK && pesquisaOK;

        });


    encontrados.forEach(
        produto => {

            container.appendChild(
                criarCardProduto(produto)
            );

        }
    );


    if (noResults) {

        noResults.style.display =
            encontrados.length === 0
                ? "block"
                : "none";

    }

}


/* =========================================
   CRIAR CARD
========================================= */

function criarCardProduto(produto) {

    const article =
        document.createElement("article");


    article.className =
        "product";


    article.dataset.game =
        produto.jogo;


    article.dataset.id =
        produto.id;


    article.innerHTML = `

        <div class="product-image">

            <img
                src="${escaparHTML(produto.imagem)}"
                alt="${escaparHTML(produto.nome)}"
                loading="lazy"
                onerror="this.src='./imagens/favicon.png'"
            >

            <span class="discount">
                -${produto.desconto}%
            </span>

            <span class="product-game">
                ${escaparHTML(produto.categoria)}
            </span>

        </div>


        <div class="product-info">

            <span class="product-category">
                ${escaparHTML(produto.categoria)}
            </span>


            <h3>
                ${produto.icone}
                ${escaparHTML(produto.nome)}
            </h3>


            <p class="description">
                ${escaparHTML(produto.descricao)}
            </p>


            <div class="price">

                <del>
                    R$ ${formatarPreco(produto.antigo)}
                </del>

                <strong>
                    R$ ${formatarPreco(produto.preco)}
                </strong>

            </div>


            <button
                type="button"
                class="buy-button"
                data-product-id="${escaparHTML(produto.id)}"
            >
                🛒 Comprar
            </button>

        </div>

    `;


    const botao =
        article.querySelector(
            ".buy-button"
        );


    if (botao) {

        botao.addEventListener(
            "click",
            () => {

                adicionarCarrinho(
                    produto.id
                );

            }
        );

    }


    return article;

}


/* =========================================
   ADICIONAR CARRINHO
========================================= */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {

        return;

    }


    const existente =
        carrinho.find(
            item => item.id === id
        );


    if (existente) {

        existente.quantidade =
            Number(existente.quantidade || 1) + 1;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            jogo: produto.jogo,

            categoria: produto.categoria,

            preco: Number(produto.preco),

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

    animarContador();

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

        console.log(
            "Não foi possível salvar o carrinho."
        );

    }

}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "cart-items"
        );


    const contador =
        document.getElementById(
            "cart-count"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(
        produto => {

            const quantidade =
                Number(
                    produto.quantidade || 1
                );


            const preco =
                Number(produto.preco) || 0;


            total +=
                preco * quantidade;


            quantidadeTotal +=
                quantidade;

        }
    );


    if (contador) {

        contador.textContent =
            quantidadeTotal;

    }


    if (carrinho.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <p>
                    Seu carrinho está vazio.
                </p>

            </div>

        `;

    }


    carrinho.forEach(
        (produto, index) => {

            const quantidade =
                Number(
                    produto.quantidade || 1
                );


            const totalProduto =
                Number(produto.preco) *
                quantidade;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-name">
                        ${escaparHTML(produto.nome)}
                    </div>


                    <div class="cart-item-game">
                        ${escaparHTML(
                            produto.categoria || ""
                        )}
                    </div>


                    <div class="cart-item-price">
                        R$ ${formatarPreco(
                            totalProduto
                        )}
                    </div>


                    <div class="cart-actions">

                        <button
                            type="button"
                            class="quantity-button"
                            data-action="minus"
                        >
                            −
                        </button>


                        <span class="quantity-number">
                            ${quantidade}
                        </span>


                        <button
                            type="button"
                            class="quantity-button"
                            data-action="plus"
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


            const minus =
                item.querySelector(
                    '[data-action="minus"]'
                );


            const plus =
                item.querySelector(
                    '[data-action="plus"]'
                );


            const remove =
                item.querySelector(
                    '[data-action="remove"]'
                );


            minus?.addEventListener(
                "click",
                () => {
                    alterarQuantidade(
                        index,
                        -1
                    );
                }
            );


            plus?.addEventListener(
                "click",
                () => {
                    alterarQuantidade(
                        index,
                        1
                    );
                }
            );


            remove?.addEventListener(
                "click",
                () => {
                    removerProduto(index);
                }
            );


            container.appendChild(item);

        }
    );


    if (totalElement) {

        totalElement.textContent =
            "R$ " +
            formatarPreco(total);

    }

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function alterarQuantidade(
    index,
    quantidade
) {

    if (!carrinho[index]) {

        return;

    }


    carrinho[index].quantidade =
        Number(
            carrinho[index].quantidade || 1
        ) + quantidade;


    if (
        carrinho[index].quantidade <= 0
    ) {

        carrinho.splice(
            index,
            1
        );

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================================
   REMOVER
========================================= */

function removerProduto(index) {

    if (!carrinho[index]) {

        return;

    }


    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================================
   TOTAL
========================================= */

function obterTotal() {

    return carrinho.reduce(
        (
            total,
            produto
        ) => {

            return total +
                (
                    Number(produto.preco) *
                    Number(
                        produto.quantidade || 1
                    )
                );

        },
        0
    );

}


/* =========================================
   ABRIR CARRINHO
========================================= */

function abrirCarrinho() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


/* =========================================
   FECHAR CARRINHO
========================================= */

function fecharCarrinho() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    verificarScrollBody();

}


/* =========================================
   FILTROS
========================================= */

function filtrarProdutos(
    categoria,
    botao = null
) {

    renderizarProdutos(
        categoria
    );


    document
        .querySelectorAll(".filter")
        .forEach(
            filtro => {

                filtro.classList.remove(
                    "active"
                );

            }
        );


    if (botao) {

        botao.classList.add(
            "active"
        );

    } else {

        const filtro =
            document.querySelector(
                `.filter[data-filter="${categoria}"]`
            );


        if (filtro) {

            filtro.classList.add(
                "active"
            );

        }

    }


    const produtosSection =
        document.getElementById(
            "produtos"
        );


    if (produtosSection) {

        produtosSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================
   PESQUISA
========================================= */

function configurarPesquisa() {

    const input =
        document.getElementById(
            "search-input"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "input",
        pesquisarProduto
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                fecharPesquisa();

            }

        }
    );

}


/* =========================================
   ABRIR PESQUISA
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


/* =========================================
   FECHAR PESQUISA
========================================= */

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


/* =========================================
   PESQUISAR
========================================= */

function pesquisarProduto() {

    const input =
        document.getElementById(
            "search-input"
        );


    if (!input) {

        return;

    }


    const texto =
        input.value
            .toLowerCase()
            .trim();


    renderizarProdutos(
        "todos",
        texto
    );


    document
        .querySelectorAll(".filter")
        .forEach(
            filtro => {

                filtro.classList.remove(
                    "active"
                );

            }
        );


    if (!texto) {

        const todos =
            document.querySelector(
                '.filter[data-filter="todos"]'
            );


        todos?.classList.add(
            "active"
        );

        return;

    }


    const produtosSection =
        document.getElementById(
            "produtos"
        );


    if (produtosSection) {

        produtosSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================
   CHECKOUT
========================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const nome =
        document.getElementById(
            "player-name"
        );


    const id =
        document.getElementById(
            "player-id"
        );


    if (nome) {

        nome.value = "";

    }


    if (id) {

        id.value = "";

    }


    const total =
        obterTotal();


    const numeroPedido =
        gerarNumeroPedido();


    pedidoAtual = {

        numero: numeroPedido,

        total: total,

        itens:
            carrinho.map(
                produto => ({
                    ...produto
                })
            )

    };


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


    renderizarResumoCheckout();


    fecharCarrinho();


    const pixModal =
        document.getElementById(
            "pix-modal"
        );


    if (pixModal) {

        pixModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


/* =========================================
   RESUMO CHECKOUT
========================================= */

function renderizarResumoCheckout() {

    const container =
        document.getElementById(
            "checkout-items"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    carrinho.forEach(
        produto => {

            const quantidade =
                Number(
                    produto.quantidade || 1
                );


            const total =
                Number(produto.preco) *
                quantidade;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "checkout-item";


            item.innerHTML = `

                <div class="checkout-item-name">

                    ${escaparHTML(
                        produto.nome
                    )}

                    <br>

                    <span style="color:#666b78">
                        ${quantidade} unidade(s)
                    </span>

                </div>


                <div class="checkout-item-price">
                    R$ ${formatarPreco(total)}
                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================
   FECHAR PIX
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


    verificarScrollBody();

}


/* =========================================
   COPIAR PIX
========================================= */

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

            copiarTextoAlternativo(
                CHAVE_PIX
            );

        }


        mostrarMensagem(
            "Chave PIX copiada!"
        );

    } catch (erro) {

        try {

            copiarTextoAlternativo(
                CHAVE_PIX
            );


            mostrarMensagem(
                "Chave PIX copiada!"
            );

        } catch (erro2) {

            alert(
                "Não foi possível copiar automaticamente. Copie a chave manualmente."
            );

        }

    }

}


/* =========================================
   COPIAR ALTERNATIVO
========================================= */

function copiarTextoAlternativo(texto) {

    const area =
        document.createElement(
            "textarea"
        );


    area.value =
        texto;


    area.style.position =
        "fixed";

    area.style.opacity =
        "0";


    document.body.appendChild(
        area
    );


    area.focus();

    area.select();


    document.execCommand(
        "copy"
    );


    area.remove();

}


/* =========================================
   PAGAMENTO REALIZADO
========================================= */

function pagamentoRealizado() {

    if (!pedidoAtual) {

        alert(
            "Nenhum pedido foi encontrado."
        );

        return;

    }


    const nome =
        document.getElementById(
            "player-name"
        )?.value.trim() || "";


    const id =
        document.getElementById(
            "player-id"
        )?.value.trim() || "";


    if (!nome) {

        alert(
            "Informe seu nome ou nick."
        );

        document
            .getElementById(
                "player-name"
            )
            ?.focus();

        return;

    }


    if (!id) {

        alert(
            "Informe o ID do jogador."
        );

        document
            .getElementById(
                "player-id"
            )
            ?.focus();

        return;

    }


    let mensagem =
        "Pagamento informado!";


    mensagem +=
        "\n\nPedido: " +
        pedidoAtual.numero;


    mensagem +=
        "\nNome/Nick: " +
        nome;


    mensagem +=
        "\nID: " +
        id;


    mensagem +=
        "\nValor: R$ " +
        formatarPreco(
            pedidoAtual.total
        );


    mensagem +=
        "\n\nAgora envie o comprovante ao suporte para confirmar o pagamento.";


    if (WHATSAPP_SUPORTE) {

        const url =
            "https://wa.me/" +
            WHATSAPP_SUPORTE +
            "?text=" +
            encodeURIComponent(
                mensagem
            );


        window.open(
            url,
            "_blank"
        );

    } else {

        alert(
            mensagem
        );

    }

}


/* =========================================
   NÚMERO DO PEDIDO
========================================= */

function gerarNumeroPedido() {

    const agora =
        Date.now()
            .toString()
            .slice(-8);


    const aleatorio =
        Math.floor(
            Math.random() * 90 + 10
        );


    return (
        "FNX-" +
        agora +
        aleatorio
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
   ESCAPAR HTML
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
   ANIMAÇÃO DO CONTADOR
========================================= */

function animarContador() {

    const contador =
        document.getElementById(
            "cart-count"
        );


    if (!contador) {

        return;

    }


    if (
        typeof contador.animate ===
        "function"
    ) {

        contador.animate(

            [

                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.5)"
                },

                {
                    transform:
                        "scale(1)"
                }

            ],

            {
                duration: 400
            }

        );

    }

}


/* =========================================
   MODAIS
========================================= */

function configurarModais() {

    const cartModal =
        document.getElementById(
            "cart-modal"
        );


    if (cartModal) {

        cartModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    cartModal
                ) {

                    fecharCarrinho();

                }

            }
        );

    }


    const pixModal =
        document.getElementById(
            "pix-modal"
        );


    if (pixModal) {

        pixModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    pixModal
                ) {

                    fecharPix();

                }

            }
        );

    }

}


/* =========================================
   BODY SCROLL
========================================= */

function verificarScrollBody() {

    const cart =
        document.getElementById(
            "cart-modal"
        );


    const pix =
        document.getElementById(
            "pix-modal"
        );


    const algumAberto =
        cart?.classList.contains("active") ||
        pix?.classList.contains("active");


    if (!algumAberto) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================
   MENSAGEM
========================================= */

function mostrarMensagem(texto) {

    alert(texto);

}


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            fecharCarrinho();

            fecharPesquisa();

            fecharPix();

        }

    }
);
