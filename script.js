alert("SCRIPT CARREGOU!");/* =====================================
   FENIX STORE
   CARRINHO + PIX MANUAL
===================================== */


/* =====================================
   CONFIGURAÇÃO PIX
===================================== */

/*
   TROQUE SOMENTE O TEXTO ABAIXO
   PELA SUA CHAVE PIX.
*/

const CHAVE_PIX = "53997094670";


/* =====================================
   CARRINHO
===================================== */

let carrinho = [];


/* =====================================
   ABRIR CARRINHO
===================================== */

function abrirCarrinho() {

    const modal = document.getElementById("cart-modal");

    if (!modal) return;

    modal.classList.add("active");
}


/* =====================================
   FECHAR CARRINHO
===================================== */

function fecharCarrinho() {

    const modal = document.getElementById("cart-modal");

    if (!modal) return;

    modal.classList.remove("active");
}


/* =====================================
   ADICIONAR PRODUTO
===================================== */

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
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


    if (!container || !contador || !totalElement) {
        return;
    }


    container.innerHTML = "";


    contador.textContent = carrinho.length;


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


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${produto.nome}
                </strong>

                <p style="
                    color:#8f82ff;
                    margin-top:5px;
                ">
                    R$ ${formatarPreco(produto.preco)}
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
        "R$ " + formatarPreco(total);
}


/* =====================================
   REMOVER PRODUTO
===================================== */

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


/* =====================================
   FORMATAR PREÇO
===================================== */

function formatarPreco(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
}


/* =====================================
   ANIMAÇÃO
===================================== */

function animarContador() {

    const contador =
        document.getElementById("cart-count");


    if (!contador) return;


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


    produtos.forEach(produto => {

        const jogo =
            produto.dataset.game;


        if (
            categoria === "todos" ||
            jogo === categoria
        ) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });


    document
        .querySelectorAll(".filter")
        .forEach(filtro => {

            filtro.classList.remove("active");

        });


    if (botao) {

        botao.classList.add("active");

    } else if (categoria === "todos") {

        const primeiro =
            document.querySelector(".filter");

        if (primeiro) {
            primeiro.classList.add("active");
        }

    } else {

        const filtros =
            document.querySelectorAll(".filter");


        filtros.forEach(filtro => {

            if (
                filtro.textContent
                    .toLowerCase()
                    .replace(" ", "")
                    .includes(
                        categoria.replace(" ", "")
                    )
            ) {

                filtro.classList.add("active");

            }

        });

    }


    const produtosSection =
        document.getElementById("produtos");


    if (produtosSection) {

        produtosSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =====================================
   PESQUISA
===================================== */

function abrirPesquisa() {

    const box =
        document.getElementById("search-box");


    if (!box) return;


    box.classList.toggle("active");


    if (box.classList.contains("active")) {

        const input =
            document.getElementById("search-input");


        if (input) {

            input.focus();

        }

    }
}


/* =====================================
   FECHAR PESQUISA
===================================== */

function fecharPesquisa() {

    const box =
        document.getElementById("search-box");


    if (!box) return;


    box.classList.remove("active");


    const input =
        document.getElementById("search-input");


    if (input) {

        input.value = "";

    }


    document
        .querySelectorAll(".product")
        .forEach(produto => {

            produto.style.display = "";

        });
}


/* =====================================
   PESQUISAR
===================================== */

function pesquisarProduto() {

    const input =
        document.getElementById("search-input");


    if (!input) return;


    const texto =
        input.value
            .toLowerCase()
            .trim();


    const produtos =
        document.querySelectorAll(".product");


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


        const descricao =
            produto
                .querySelector(".description")
                ?.textContent
                .toLowerCase() || "";


        if (
            nome.includes(texto) ||
            categoria.includes(texto) ||
            descricao.includes(texto)
        ) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });
}


/* =====================================
   CALCULAR TOTAL
===================================== */

function calcularTotal() {

    let total = 0;


    carrinho.forEach(produto => {

        total += produto.preco;

    });


    return total;
}


/* =====================================
   FINALIZAR COMPRA
===================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    const total =
        calcularTotal();


    const pixModal =
        document.getElementById("pix-modal");


    const pixTotal =
        document.getElementById("pix-total");


    const pixKey =
        document.getElementById("pix-key");


    if (!pixModal || !pixTotal || !pixKey) {

        alert(
            "Erro ao carregar o pagamento PIX."
        );

        return;
    }


    pixTotal.textContent =
        "R$ " + formatarPreco(total);


    pixKey.value =
        CHAVE_PIX;


    fecharCarrinho();


    pixModal.classList.add("active");
}


/* =====================================
   FECHAR PIX
===================================== */

function fecharPix() {

    const pixModal =
        document.getElementById("pix-modal");


    if (!pixModal) return;


    pixModal.classList.remove("active");
}


/* =====================================
   COPIAR CHAVE PIX
===================================== */

async function copiarPix() {

    const pixKey =
        document.getElementById("pix-key");


    const mensagem =
        document.getElementById("copy-message");


    if (!pixKey) return;


    try {

        await navigator.clipboard.writeText(
            pixKey.value
        );


        if (mensagem) {

            mensagem.textContent =
                "✓ Chave PIX copiada!";

        }

    } catch (erro) {

        pixKey.select();

        document.execCommand("copy");


        if (mensagem) {

            mensagem.textContent =
                "✓ Chave PIX copiada!";

        }

    }
}


/* =====================================
   CONFIRMAR PAGAMENTO
===================================== */

function confirmarPagamento() {

    alert(
        "Pagamento informado!\n\n" +
        "Envie o comprovante ao suporte " +
        "para confirmar o pedido."
    );

}


/* =====================================
   CLICAR FORA DOS MODAIS
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const cartModal =
            document.getElementById("cart-modal");


        const pixModal =
            document.getElementById("pix-modal");


        if (cartModal) {

            cartModal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === cartModal
                    ) {

                        fecharCarrinho();

                    }

                }
            );

        }


        if (pixModal) {

            pixModal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === pixModal
                    ) {

                        fecharPix();

                    }

                }
            );

        }


        atualizarCarrinho();

    }
);


/* =====================================
   TECLA ESC
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            fecharCarrinho();

            fecharPix();

            fecharPesquisa();

        }

    }
);
