/* =====================================
   FENIX STORE
   SISTEMA DA LOJA
===================================== */


/* =====================================
   CARRINHO
===================================== */

let carrinho = [];


/* =====================================
   ABRIR CARRINHO
===================================== */

function abrirCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    modal.classList.add("active");

}


/* =====================================
   FECHAR CARRINHO
===================================== */

function fecharCarrinho() {

    const modal =
        document.getElementById("cart-modal");

    modal.classList.remove("active");

}


/* =====================================
   ADICIONAR PRODUTO
===================================== */

function adicionarCarrinho(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: preco

    });


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


    container.innerHTML = "";


    contador.textContent =
        carrinho.length;


    let total = 0;


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


    carrinho.forEach(
        (produto, index) => {

            total += produto.preco;


            const item =
                document.createElement("div");


            item.className =
                "cart-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${produto.nome}
                    </strong>

                    <p style="
                        color:#8f82ff;
                        margin-top:5px;
                    ">

                        R$
                        ${formatarPreco(
                            produto.preco
                        )}

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

        }
    );


    totalElement.textContent =
        "R$ " +
        formatarPreco(total);

}


/* =====================================
   REMOVER PRODUTO
===================================== */

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


/* =====================================
   FORMATAÇÃO DE PREÇO
===================================== */

function formatarPreco(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");

}


/* =====================================
   ANIMAÇÃO DO CARRINHO
===================================== */

function animarContador() {

    const contador =
        document.getElementById("cart-count");


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
        document.querySelectorAll(
            ".product"
        );


    produtos.forEach(
        produto => {

            const jogo =
                produto.dataset.game;


            if (
                categoria === "todos" ||
                jogo === categoria
            ) {

                produto.style.display = "";


                produto.animate(

                    [

                        {
                            opacity: 0,

                            transform:
                                "translateY(15px)"
                        },

                        {
                            opacity: 1,

                            transform:
                                "translateY(0)"
                        }

                    ],

                    {

                        duration: 350,

                        easing: "ease"

                    }

                );

            }

            else {

                produto.style.display =
                    "none";

            }

        }
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

    }

    else {

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

}


/* =====================================
   PESQUISA
===================================== */

function abrirPesquisa() {

    const box =
        document.getElementById(
            "search-box"
        );


    box.classList.toggle(
        "active"
    );


    if (
        box.classList.contains(
            "active"
        )
    ) {

        document
            .getElementById(
                "search-input"
            )
            .focus();

    }

}


function fecharPesquisa() {

    document
        .getElementById(
            "search-box"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================
   PESQUISAR PRODUTO
===================================== */

function pesquisarProduto() {

    const texto =
        document
            .getElementById(
                "search-input"
            )
            .value
            .toLowerCase()
            .trim();


    const produtos =
        document.querySelectorAll(
            ".product"
        );


    produtos.forEach(
        produto => {

            const nome =
                produto
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const categoria =
                produto
                    .querySelector(
                        ".product-category"
                    )
                    .textContent
                    .toLowerCase();


            if (
                nome.includes(texto) ||
                categoria.includes(texto)
            ) {

                produto.style.display = "";

            }

            else {

                produto.style.display =
                    "none";

            }

        }
    );

}


/* =====================================
   CLICAR FORA DO CARRINHO
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        const modal =
            document.getElementById(
                "cart-modal"
            );


        if (modal) {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        fecharCarrinho();

                    }

                }
            );

        }


    }
);


/* =====================================
   TECLA ESC
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            fecharCarrinho();

            fecharPesquisa();

        }

    }
);


/* =====================================
   /* =====================================
   FINALIZAR COMPRA - PIX
===================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }

    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco;
    });


    /*
       =====================================
       CHAVE PIX DE TESTE

       Depois você troca somente este valor.
       =====================================
    */

    const chavePix =5553997094670";


    const valor = formatarPreco(total);


    const mensagem = `
FENIX STORE

Valor: R$ ${valor}

Chave PIX:
${chavePix}

Após realizar o pagamento,
envie o comprovante para o suporte.
`;


    alert(mensagem);


