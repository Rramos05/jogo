/* =========================================================
   FENIX STORE
   PREÇOS DEFINIDOS INDIVIDUALMENTE
   ========================================================= */

const PIX_KEY = "SUA-CHAVE-PIX-AQUI";

let carrinho = [];


/* =========================================================
   CATÁLOGO
   ========================================================= */

const PRECOS = {

    "100 Diamantes Free Fire": 8.00,
    "310 Diamantes Free Fire": 17.00,
    "520 Diamantes Free Fire": 27.00,
    "1060 Diamantes Free Fire": 52.00,

    "1000 V-Bucks Fortnite": 37.00,
    "2800 V-Bucks Fortnite": 87.00,
    "5000 V-Bucks Fortnite": 147.00,

    "400 Robux Roblox": 27.00,
    "800 Robux Roblox": 47.00,
    "1700 Robux Roblox": 92.00,

    "475 VP Valorant": 27.00,
    "1000 VP Valorant": 52.00,
    "2050 VP Valorant": 97.00,

    "100 FC Points": 10.00,
    "1050 FC Points": 57.00,
    "2200 FC Points": 107.00,

    "Gift Card Minecraft R$ 30": 32.00,
    "Gift Card Minecraft R$ 50": 52.00,
    "Gift Card Minecraft R$ 100": 102.00
};


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    aplicarPrecos();

    atualizarCarrinho();

    const input =
        document.getElementById("search-input");

    if (input) {

        input.addEventListener(
            "input",
            pesquisarProdutos
        );

        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    fecharPesquisa();
                }

            }
        );
    }

    const pix =
        document.getElementById("pix-key");

    if (pix) {
        pix.textContent = PIX_KEY;
    }

});


/* =========================================================
   APLICAR PREÇOS
   ========================================================= */

function aplicarPrecos() {

    const produtos =
        document.querySelectorAll(".product");

    produtos.forEach(produto => {

        const titulo =
            produto.querySelector("h3");

        const preco =
            produto.querySelector(".price");

        const botao =
            produto.querySelector(".buy-button");

        if (!titulo || !preco) {
            return;
        }

        const nomeBase =
            titulo.textContent.trim();

        let nomeCarrinho = nomeBase;

        /*
           Nomes usados no carrinho
        */

        if (
            produto.dataset.game === "freefire"
        ) {
            nomeCarrinho =
                `${nomeBase} Free Fire`;
        }

        if (
            produto.dataset.game === "fortnite"
        ) {
            nomeCarrinho =
                `${nomeBase} Fortnite`;
        }

        if (
            produto.dataset.game === "roblox"
        ) {
            nomeCarrinho =
                `${nomeBase} Roblox`;
        }

        if (
            produto.dataset.game === "valorant"
        ) {
            nomeCarrinho =
                `${nomeBase} Valorant`;
        }

        if (
            produto.dataset.game === "eafc"
        ) {

            nomeCarrinho =
                nomeBase
                    .replace(
                        " FC Points",
                        " FC Points"
                    );
        }

        if (
            produto.dataset.game === "minecraft"
        ) {
            nomeCarrinho = nomeBase;
        }


        /*
           Procura pelo preço correspondente.
        */

        let precoFinal =
            PRECOS[nomeCarrinho];


        /*
           Compatibilidade com os nomes do HTML.
        */

        if (
            !precoFinal &&
            nomeBase === "100 Diamantes"
        ) {
            precoFinal = 8.00;
            nomeCarrinho =
                "100 Diamantes Free Fire";
        }

        if (
            !precoFinal &&
            nomeBase === "310 Diamantes"
        ) {
            precoFinal = 17.00;
            nomeCarrinho =
                "310 Diamantes Free Fire";
        }

        if (
            !precoFinal &&
            nomeBase === "520 Diamantes"
        ) {
            precoFinal = 27.00;
            nomeCarrinho =
                "520 Diamantes Free Fire";
        }

        if (
            !precoFinal &&
            nomeBase === "1.060 Diamantes"
        ) {
            precoFinal = 52.00;
            nomeCarrinho =
                "1060 Diamantes Free Fire";
        }


        if (
            !precoFinal &&
            nomeBase === "1.000 V-Bucks"
        ) {
            precoFinal = 37.00;
            nomeCarrinho =
                "1000 V-Bucks Fortnite";
        }

        if (
            !precoFinal &&
            nomeBase === "2.800 V-Bucks"
        ) {
            precoFinal = 87.00;
            nomeCarrinho =
                "2800 V-Bucks Fortnite";
        }

        if (
            !precoFinal &&
            nomeBase === "5.000 V-Bucks"
        ) {
            precoFinal = 147.00;
            nomeCarrinho =
                "5000 V-Bucks Fortnite";
        }


        if (
            !precoFinal &&
            nomeBase === "400 Robux"
        ) {
            precoFinal = 27.00;
            nomeCarrinho =
                "400 Robux Roblox";
        }

        if (
            !precoFinal &&
            nomeBase === "800 Robux"
        ) {
            precoFinal = 47.00;
            nomeCarrinho =
                "800 Robux Roblox";
        }

        if (
            !precoFinal &&
            nomeBase === "1.700 Robux"
        ) {
            precoFinal = 92.00;
            nomeCarrinho =
                "1700 Robux Roblox";
        }


        if (
            !precoFinal &&
            nomeBase === "475 VP"
        ) {
            precoFinal = 27.00;
            nomeCarrinho =
                "475 VP Valorant";
        }

        if (
            !precoFinal &&
            nomeBase === "1.000 VP"
        ) {
            precoFinal = 52.00;
            nomeCarrinho =
                "1000 VP Valorant";
        }

        if (
            !precoFinal &&
            nomeBase === "2.050 VP"
        ) {
            precoFinal = 97.00;
            nomeCarrinho =
                "2050 VP Valorant";
        }


        if (
            !precoFinal &&
            nomeBase === "100 FC Points"
        ) {
            precoFinal = 10.00;
            nomeCarrinho =
                "100 FC Points";
        }

        if (
            !precoFinal &&
            nomeBase === "1.050 FC Points"
        ) {
            precoFinal = 57.00;
            nomeCarrinho =
                "1050 FC Points";
        }

        if (
            !precoFinal &&
            nomeBase === "2.200 FC Points"
        ) {
            precoFinal = 107.00;
            nomeCarrinho =
                "2200 FC Points";
        }


        if (
            !precoFinal &&
            nomeBase === "Gift Card R$ 30"
        ) {
            precoFinal = 32.00;
            nomeCarrinho =
                "Gift Card Minecraft R$ 30";
        }

        if (
            !precoFinal &&
            nomeBase === "Gift Card R$ 50"
        ) {
            precoFinal = 52.00;
            nomeCarrinho =
                "Gift Card Minecraft R$ 50";
        }

        if (
            !precoFinal &&
            nomeBase === "Gift Card R$ 100"
        ) {
            precoFinal = 102.00;
            nomeCarrinho =
                "Gift Card Minecraft R$ 100";
        }


        /*
           Se não encontrar preço,
           não coloca R$2 automaticamente.
        */

        if (typeof precoFinal !== "number") {

            console.warn(
                "Preço não cadastrado:",
                nomeBase
            );

            return;
        }


        /*
           Remove desconto.
        */

        const desconto =
            produto.querySelector(".discount");

        if (desconto) {
            desconto.remove();
        }


        /*
           Remove preço antigo.
        */

        const antigo =
            preco.querySelector("del");

        if (antigo) {
            antigo.remove();
        }


        /*
           Mostra preço final.
        */

        let strong =
            preco.querySelector("strong");

        if (!strong) {

            strong =
                document.createElement("strong");

            preco.appendChild(strong);
        }

        strong.textContent =
            formatarPreco(precoFinal);


        /*
           Dados usados pelo carrinho.
        */

        produto.dataset.price =
            precoFinal.toFixed(2);

        produto.dataset.product =
            nomeCarrinho;


        /*
           Botão.
        */

        if (botao) {

            botao.dataset.product =
                nomeCarrinho;

            botao.dataset.price =
                precoFinal.toFixed(2);

            botao.removeAttribute("onclick");

            botao.onclick = () => {

                adicionarCarrinho(
                    nomeCarrinho,
                    precoFinal
                );

            };
        }

    });

}


/* =========================================================
   FORMATAÇÃO
   ========================================================= */

function formatarPreco(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


/* =========================================================
   CARRINHO
   ========================================================= */

function adicionarCarrinho(nome, preco) {

    const existente =
        carrinho.find(
            item => item.nome === nome
        );

    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({
            nome,
            preco: Number(preco),
            quantidade: 1
        });

    }

    atualizarCarrinho();

    mostrarToast(
        `${nome} adicionado ao carrinho.`
    );

    abrirCarrinho();
}


function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


function alterarQuantidade(index, valor) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade += valor;

    if (
        carrinho[index].quantidade <= 0
    ) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}


function calcularTotal() {

    return carrinho.reduce(
        (total, item) => {

            return total +
                item.preco *
                item.quantidade;

        },
        0
    );
}


/* =========================================================
   ATUALIZAR CARRINHO
   ========================================================= */

function atualizarCarrinho() {

    const items =
        document.getElementById(
            "cart-items"
        );

    const count =
        document.getElementById(
            "cart-count"
        );

    const subtitle =
        document.getElementById(
            "cart-subtitle"
        );

    const total =
        document.getElementById(
            "cart-total"
        );


    const quantidade =
        carrinho.reduce(
            (soma, item) =>
                soma + item.quantidade,
            0
        );


    if (count) {
        count.textContent =
            quantidade;
    }


    if (subtitle) {

        subtitle.textContent =
            quantidade === 1
                ? "1 produto"
                : `${quantidade} produtos`;

    }


    if (total) {
        total.textContent =
            formatarPreco(
                calcularTotal()
            );
    }


    if (!items) {
        return;
    }


    if (carrinho.length === 0) {

        items.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione produtos para continuar.
                </p>
            </div>
        `;

        return;
    }


    items.innerHTML =
        carrinho.map(
            (item, index) => {

                const subtotal =
                    item.preco *
                    item.quantidade;

                return `
                    <div class="cart-item">

                        <div class="cart-item-name">
                            ${escapeHTML(item.nome)}
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
   CARRINHO MODAL
   ========================================================= */

function abrirCarrinho() {

    const modal =
        document.getElementById(
            "cart-modal"
        );

    if (modal) {
        modal.classList.add("active");
    }
}


function fecharCarrinho() {

    const modal =
        document.getElementById(
            "cart-modal"
        );

    if (modal) {
        modal.classList.remove("active");
    }
}


/* =========================================================
   PESQUISA
   ========================================================= */

function abrirPesquisa() {

    const box =
        document.getElementById(
            "search-box"
        );

    const input =
        document.getElementById(
            "search-input"
        );

    if (!box) {
        return;
    }

    box.classList.add("active");

    if (input) {
        setTimeout(
            () => input.focus(),
            100
        );
    }
}


function fecharPesquisa() {

    const box =
        document.getElementById(
            "search-box"
        );

    const input =
        document.getElementById(
            "search-input"
        );

    if (box) {
        box.classList.remove("active");
    }

    if (input) {
        input.value = "";
    }

    mostrarTodosProdutos();
}


function pesquisarProdutos() {

    const input =
        document.getElementById(
            "search-input"
        );

    if (!input) {
        return;
    }

    const termo =
        normalizar(
            input.value
        );

    const produtos =
        document.querySelectorAll(
            ".product"
        );

    let encontrados = 0;


    produtos.forEach(produto => {

        const texto =
            normalizar(
                produto.textContent
            );

        const mostrar =
            termo === "" ||
            texto.includes(termo);

        produto.style.display =
            mostrar ? "" : "none";

        if (mostrar) {
            encontrados++;
        }

    });


    mostrarNoResults(
        encontrados
    );
}


/* =========================================================
   FILTROS
   ========================================================= */

function filtrarProdutos(
    game,
    botao = null
) {

    const produtos =
        document.querySelectorAll(
            ".product"
        );

    let encontrados = 0;


    produtos.forEach(produto => {

        const mostrar =
            game === "todos" ||
            produto.dataset.game === game;

        produto.style.display =
            mostrar ? "" : "none";

        if (mostrar) {
            encontrados++;
        }

    });


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

    } else if (game === "todos") {

        const todos =
            document.querySelector(
                ".filter"
            );

        if (todos) {
            todos.classList.add(
                "active"
            );
        }

    }


    mostrarNoResults(
        encontrados
    );
}


function mostrarTodosProdutos() {

    const produtos =
        document.querySelectorAll(
            ".product"
        );

    produtos.forEach(
        produto => {
            produto.style.display = "";
        }
    );

    mostrarNoResults(
        produtos.length
    );

    document
        .querySelectorAll(".filter")
        .forEach(
            filtro =>
                filtro.classList.remove(
                    "active"
                )
        );

    const primeiro =
        document.querySelector(
            ".filter"
        );

    if (primeiro) {
        primeiro.classList.add(
            "active"
        );
    }
}


/* =========================================================
   SEM RESULTADOS
   ========================================================= */

function mostrarNoResults(numero) {

    const box =
        document.getElementById(
            "no-results"
        );

    if (!box) {
        return;
    }

    box.style.display =
        numero === 0
            ? "block"
            : "none";
}


/* =========================================================
   PIX
   ========================================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio."
        );

        return;
    }


    const total =
        calcularTotal();


    const pedido =
        gerarPedido();


    const numero =
        document.getElementById(
            "order-number"
        );

    const valor =
        document.getElementById(
            "pix-total"
        );

    const chave =
        document.getElementById(
            "pix-key"
        );


    if (numero) {
        numero.textContent =
            pedido;
    }

    if (valor) {
        valor.textContent =
            formatarPreco(total);
    }

    if (chave) {
        chave.textContent =
            PIX_KEY;
    }


    fecharCarrinho();


    const modal =
        document.getElementById(
            "pix-modal"
        );

    if (modal) {
        modal.classList.add(
            "active"
        );
    }

}


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

    const elemento =
        document.getElementById(
            "pix-key"
        );

    if (!elemento) {
        return;
    }

    const chave =
        elemento.textContent.trim();


    try {

        await navigator.clipboard.writeText(
            chave
        );

        mostrarToast(
            "Chave PIX copiada!"
        );

    } catch {

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value = chave;

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand(
            "copy"
        );

        textarea.remove();

        mostrarToast(
            "Chave PIX copiada!"
        );

    }
}


function pagamentoRealizado() {

    mostrarToast(
        "Pagamento informado. Aguarde a confirmação do suporte."
    );

    setTimeout(
        fecharPix,
        2000
    );
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function mostrarToast(texto) {

    const toast =
        document.getElementById(
            "toast"
        );

    if (!toast) {
        return;
    }

    clearTimeout(
        toastTimer
    );

    toast.textContent =
        texto;

    toast.classList.add(
        "show"
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );
}


/* =========================================================
   UTILITÁRIOS
   ========================================================= */

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );
}


function escapeHTML(texto) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        texto;

    return div.innerHTML;
}


/* =========================================================
   FECHAR MODAIS CLICANDO FORA
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const cart =
            document.getElementById(
                "cart-modal"
            );

        const pix =
            document.getElementById(
                "pix-modal"
            );


        if (
            cart &&
            event.target === cart
        ) {
            fecharCarrinho();
        }


        if (
            pix &&
            event.target === pix
        ) {
            fecharPix();
        }

    }
);


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        fecharPesquisa();
        fecharCarrinho();
        fecharPix();

    }
);
