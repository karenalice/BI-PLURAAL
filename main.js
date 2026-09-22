// ============================================================
// DASHBOARDS
// ============================================================

const dashboards = [
    {
        nome: "ASUMA",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMWFlMGIzZmMtZmIyOS00OTI4LWI3MTItNGEyMWFlYjQ2NDEyIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "AMA",
        link: "https://app.powerbi.com/view?r=eyJrIjoiY2U1ZTM1OGMtODY4OS00MmRiLWE3OGEtNmVhZmRjNjBjMDhjIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "ANPA",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNmI5NTVjNTUtZDgxOS00ZjRlLWFlNmYtYTcxZGI4NTNhOTBmIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "BLUMENAU",
        link: "https://app.powerbi.com/view?r=eyJrIjoiYmMzZjI1ZjQtZjc0ZC00NDhhLWEzNTctYjQzNjFlZWYzMTlkIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "CAMPINAS",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMTAxOTQzY2UtMjNhMC00OWY1LTgzMDMtNjc5Njg3ODc1MGYyIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "IABC",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMWUyOWYzYTQtMTY4NC00Mzk4LWFiNGQtZGQxZThiYmM0MTEzIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "IAESC",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMTEyYzExYTItZjlhZC00NzJjLTgwYzQtY2YxNWIzNTZkZTQyIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "MNEM",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZTNjYjQ4YTYtMjZmNC00YTBlLWI5OWQtNWE5ZjBmOWI5NDU2IiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "MTO",
        link: "https://app.powerbi.com/view?r=eyJrIjoiYmRhOTVkNWUtNzcxZi00N2JjLWFkNTQtYjY5Y2VjYmM1N2EyIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "AP",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMzE1ZjU4M2YtMTIyNS00MzIwLTgwZjgtNTE4MTNkY2I2NTY3IiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "APSE",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMWYwNDA2N2QtNjg1MC00ZjRiLTgyMTItMWFkMDZmOTkxYTZiIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "ALM",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNjdjNTE2ZDQtZjIxNy00NjE3LWJkYzgtMzAwY2UxODk5YTE3IiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "UNASP",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMDFmMjNlMzktOGRjYy00YTlkLWFjNGQtMzQ4MTg1MjMzZmM0IiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "UNEB",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZDg2YTg5ZGEtMzM0Ny00Zjk1LWEyYWYtZTFjNjE4MDFiNzM2IiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "UNOB",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMDI4M2VmMTEtYThhNC00MjM1LWEyOWMtOWJlMzMyOWE1M2VhIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "USB",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMDI4M2VmMTEtYThhNC00MjM1LWEyOWMtOWJlMzMyOWE1M2VhIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "ACP",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNDg1YjMyZGQtYTZmOC00MTJkLWE2YTMtNjgzYTQwMzdiNmVlIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "ACSR",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMmQzNGRiNzItYjA1Zi00ZTA4LTg5MjctYzk4NjY3YmFmMDVjIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    },
    {
        nome: "IAP",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMTE5ODA1NmMtMWFlNC00NDkxLWIwN2ItNmI1OWFkNDE3OTVhIiwidCI6ImM4NGI3YzEwLTdlZWYtNDFlNS1hYjllLTRlMWQ1NjlkNzIyYiJ9"
    }
];


// ============================================================
// ELEMENTOS
// ============================================================

const listaDashboards =
    document.getElementById("listaDashboards");

const campoPesquisa =
    document.getElementById("campoPesquisa");

const quantidadeDashboards =
    document.getElementById("quantidadeDashboards");

const nenhumResultado =
    document.getElementById("nenhumResultado");


// ============================================================
// UTILIDADES
// ============================================================

function escaparHTML(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizarPesquisa(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


// ============================================================
// ENCURTAR LINK
// ============================================================

function encurtarLink(link) {

    const inicio = 38;
    const fim = 16;

    if (!link) {
        return "";
    }

    if (
        link.length <=
        inicio + fim + 3
    ) {
        return link;
    }

    return (
        link.substring(0, inicio) +
        "..." +
        link.substring(link.length - fim)
    );
}


// ============================================================
// COPIAR
// ============================================================

async function copiarLink(link, botao) {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(link);

        } else {

            const textarea =
                document.createElement("textarea");

            textarea.value = link;

            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);

            textarea.select();

            document.execCommand("copy");

            document.body.removeChild(textarea);
        }

        mostrarCopiado(botao);

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível copiar o link."
        );
    }
}


// ============================================================
// FEEDBACK
// ============================================================

function mostrarCopiado(botao) {

    const original =
        botao.innerHTML;

    botao.classList.add(
        "copiado"
    );

    botao.innerHTML = `
        <svg
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M5 12L10 17L19 7"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    `;

    botao.title =
        "Link copiado";

    setTimeout(
        () => {

            botao.innerHTML =
                original;

            botao.title =
                "Copiar link";

            botao.classList.remove(
                "copiado"
            );

        },
        1500
    );
}


// ============================================================
// CARD
// ============================================================

function criarCard(dashboard) {

    const card =
        document.createElement("div");

    card.className =
        "dashboard-card";

    const nomeSeguro =
        escaparHTML(dashboard.nome);

    const linkSeguro =
        escaparHTML(dashboard.link);

    const linkCurto =
        escaparHTML(
            encurtarLink(
                dashboard.link
            )
        );


    card.innerHTML = `

        <div class="card-header">

            <div class="card-title-area">

                <h3>
                    ${nomeSeguro}
                </h3>

            </div>


            <a
                href="${linkSeguro}"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-box"
                title="Abrir dashboard"
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                >

                    <path
                        d="M14 4H20V10"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d="M10 14L20 4"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d="M20 14V20H4V4H10"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                </svg>

            </a>

        </div>


        <p class="card-description">
            Clique no ícone para abrir o dashboard do Power BI
        </p>


        <div class="dashboard-link-area">

            <a
                href="${linkSeguro}"
                target="_blank"
                rel="noopener noreferrer"
                class="dashboard-link-text"
                title="${linkSeguro}"
            >
                ${linkCurto}
            </a>


            <button
                type="button"
                class="btn-copiar-link"
                title="Copiar link"
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                >

                    <rect
                        x="9"
                        y="9"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="2"
                    />

                    <path
                        d="M15 9V6C15 4.9 14.1 4 13 4H6C4.9 4 4 4.9 4 6V13C4 14.1 4.9 15 6 15H9"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />

                </svg>

            </button>

        </div>
    `;


    const botaoCopiar =
        card.querySelector(
            ".btn-copiar-link"
        );


    botaoCopiar.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            copiarLink(
                dashboard.link,
                botaoCopiar
            );

        }
    );


    return card;
}


// ============================================================
// RENDER
// ============================================================

function renderizarDashboards(lista) {

    listaDashboards.innerHTML = "";


    quantidadeDashboards.textContent =
        `${lista.length} ${
            lista.length === 1
                ? "dashboard disponível"
                : "dashboards disponíveis"
        }`;


    if (
        lista.length === 0
    ) {

        nenhumResultado.style.display =
            "block";

        return;
    }


    nenhumResultado.style.display =
        "none";


    lista.forEach(
        dashboard => {

            const card =
                criarCard(dashboard);

            listaDashboards.appendChild(
                card
            );

        }
    );
}


// ============================================================
// FILTRO
// ============================================================

function filtrarDashboards() {

    const busca =
        normalizarPesquisa(
            campoPesquisa.value
        );


    const filtrados =
        dashboards.filter(
            dashboard =>
                normalizarPesquisa(
                    dashboard.nome
                ).includes(busca)
        );


    renderizarDashboards(
        filtrados
    );
}


// ============================================================
// EVENTOS
// ============================================================

campoPesquisa.addEventListener(
    "input",
    filtrarDashboards
);


campoPesquisa.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            campoPesquisa.value = "";

            renderizarDashboards(
                dashboards
            );

        }
    }
);


// ============================================================
// INICIALIZAÇÃO
// ============================================================

renderizarDashboards(
    dashboards
);
