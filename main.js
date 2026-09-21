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
// ENCURTAR LINK
// ============================================================

function encurtarLink(link) {

    if (link.length <= 60) {
        return link;
    }

    return (
        link.substring(0, 38) +
        "..." +
        link.substring(link.length - 15)
    );
}


// ============================================================
// COPIAR LINK
// ============================================================

async function copiarLink(link, botao) {

    try {

        await navigator.clipboard.writeText(link);

        const original = botao.innerHTML;

        botao.innerHTML = "✓";
        botao.title = "Link copiado";

        setTimeout(() => {
            botao.innerHTML = original;
            botao.title = "Copiar link";
        }, 1500);

    } catch (erro) {

        const textarea =
            document.createElement("textarea");

        textarea.value = link;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        botao.innerHTML = "✓";

        setTimeout(() => {
            botao.innerHTML = "📋";
        }, 1500);
    }
}


// ============================================================
// CRIAR CARD
// ============================================================

function criarCard(dashboard) {

    const card =
        document.createElement("div");

    card.className = "dashboard-card";

    card.dataset.nome =
        dashboard.nome.toLowerCase();


    card.innerHTML = `

        <div class="card-header">

            <h3>
                ${dashboard.nome}
            </h3>

            <a
                href="${dashboard.link}"
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


        <p>
            Clique para abrir o dashboard do Power BI
        </p>


        <div
            style="
                display:flex;
                align-items:center;
                gap:8px;
                margin-top:12px;
            "
        >

            <a
                href="${dashboard.link}"
                target="_blank"
                rel="noopener noreferrer"
                title="${dashboard.link}"
                style="
                    min-width:0;
                    flex:1;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    font-size:12px;
                    color:#4f6f8f;
                    text-decoration:none;
                "
            >
                ${encurtarLink(dashboard.link)}
            </a>


            <button
                type="button"
                class="btn-copiar-link"
                title="Copiar link"
                style="
                    border:none;
                    background:transparent;
                    cursor:pointer;
                    font-size:17px;
                    padding:4px;
                "
            >
                📋
            </button>

        </div>

    `;


    // Botão copiar
    const botaoCopiar =
        card.querySelector(".btn-copiar-link");

    botaoCopiar.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            copiarLink(
                dashboard.link,
                botaoCopiar
            );
        }
    );


    return card;
}


// ============================================================
// MOSTRAR DASHBOARDS
// ============================================================

function renderizarDashboards(lista) {

    listaDashboards.innerHTML = "";

    quantidadeDashboards.textContent =
        `${lista.length} dashboard${
            lista.length !== 1 ? "s" : ""
        } disponíveis`;


    if (lista.length === 0) {

        nenhumResultado.style.display =
            "block";

        return;
    }


    nenhumResultado.style.display =
        "none";


    lista.forEach(dashboard => {

        const card =
            criarCard(dashboard);

        listaDashboards.appendChild(card);

    });

}


// ============================================================
// PESQUISA
// ============================================================

campoPesquisa.addEventListener(
    "input",
    function() {

        const texto =
            campoPesquisa
                .value
                .toLowerCase()
                .trim();


        const filtrados =
            dashboards.filter(
                dashboard =>
                    dashboard.nome
                        .toLowerCase()
                        .includes(texto)
            );


        renderizarDashboards(
            filtrados
        );

    }
);


// ============================================================
// INICIALIZAÇÃO
// ============================================================

renderizarDashboards(
    dashboards
);
