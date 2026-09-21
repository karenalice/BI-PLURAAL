let workbookFinal = null;
let previewData = [];

// =====================================================
// CABEÇALHOS DEFINITIVOS
// =====================================================

const META_COLS = [
  "id_arquivo",
  "serie",
  "nivel",
  "nivel_serie",
  "tipo_simulado",
  "disciplina_nome_arquivo",
  "bimestre",
  "escola",
  "ano"
];

const ALUNOS_HEADERS = [
  ...META_COLS,
  "Alunos",
  "RA",
  "Turma",
  "Início",
  "Fim",
  "Tempo",
  "Total (%)",
  "Total (23)",
  "disciplina"
];

const UNIDADE_HEADERS = [
  ...META_COLS,
  "União",
  "Campo",
  "Unidade",
  "Início",
  "Fim",
  "Participantes",
  "Participantes esperados",
  "Percentual de participantes",
  "disciplina",
  "Nota"
];

const MAPA_HEADERS = [
  ...META_COLS,
  "Code",
  "Disciplina",
  "Conteúdo/Habilidade",
  "Dificuldade",
  "Gabarito"
];

const QUESTAO_HEADERS = [
  ...META_COLS,
  "#",
  "Código",
  "Disciplina",
  "Habilidade/Conteúdo",
  "Dificuldade",
  "Gabarito",
  "% Acertos",
  "% Erros"
];

// =====================================================
// LOG
// =====================================================

function log(msg) {
  const el = document.getElementById("log");

  if (!el) return;

  el.textContent += "\n" + msg;
  el.scrollTop = el.scrollHeight;
}

function limparLog() {
  const logEl = document.getElementById("log");
  const preview = document.getElementById("preview");

  if (logEl) {
    logEl.textContent = "Iniciando...";
  }

  if (preview) {
    preview.innerHTML = "";
  }

  previewData = [];
}

// =====================================================
// NORMALIZAÇÃO
// =====================================================

function normalizarTexto(txt) {
  return (txt || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function normalizarCabecalho(txt) {
  return (txt || "")
    .toString()
    .replace(/\s+/g, " ")
    .trim();
}

// =====================================================
// TIPO DO ARQUIVO
// =====================================================

function detectarTipoArquivo(nomeArquivo) {
  const n = normalizarTexto(nomeArquivo);

  if (n.includes("ALUNOS") || n.includes("ALUNO")) {
    return "alunos";
  }

  if (n.includes("UNIDADE")) {
    return "unidade";
  }

  if (n.includes("MAPA")) {
    return "mapa";
  }

  if (
    n.includes("QUESTAO") ||
    n.includes("QUESTOES")
  ) {
    return "questao";
  }

  return "desconhecido";
}

// =====================================================
// ID
// =====================================================

function extrairIdArquivo(nomeArquivo) {
  const nomeSemExt = nomeArquivo.replace(/\.[^.]+$/, "");

  const match = nomeSemExt.match(
    /^\s*([A-Za-z0-9]+)/
  );

  return match
    ? match[1].trim()
    : "";
}

// =====================================================
// SÉRIE / NÍVEL
// =====================================================

function extrairSerieENivel(nomeArquivo) {
  const n = normalizarTexto(nomeArquivo);

  let serieTexto = "";
  let nivel = "";
  let m;

  // =================================================
  // FUND I
  // =================================================

  m = n.match(
    /FUND\s*I\s*(\d{1,2})\s*[º°OªA]?\s*(ANO|SERIE)?/i
  );

  if (m) {
    const numero = parseInt(m[1], 10);

    serieTexto = `${numero}° ANO`;
    nivel = "F1";

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // FUND II
  // =================================================

  m = n.match(
    /FUND\s*II\s*(\d{1,2})\s*[º°OªA]?\s*(ANO|SERIE)?/i
  );

  if (m) {
    const numero = parseInt(m[1], 10);

    serieTexto = `${numero}° ANO`;
    nivel = "F2";

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // FUND genérico
  // =================================================

  m = n.match(
    /FUND\s*(\d{1,2})\s*[º°OªA]?\s*(ANO|SERIE)?/i
  );

  if (m) {
    const numero = parseInt(m[1], 10);

    serieTexto = `${numero}° ANO`;

    if (numero >= 3 && numero <= 5) {
      nivel = "F1";
    } else if (numero >= 6 && numero <= 9) {
      nivel = "F2";
    } else {
      nivel = "FUND";
    }

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // EM 3º
  // E.M 3º
  // EM 3º ANO
  // =================================================

  m = n.match(
    /(?:^|[\s-])(E\.?\s*M|EM)\s*(\d{1,2})\s*[º°OªA]?\s*(ANO|SERIE)?/i
  );

  if (m) {
    const numero = parseInt(m[2], 10);

    serieTexto = `${numero}° ANO`;
    nivel = "E.M";

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // 3º EM
  // 3 EM
  // 3º E.M
  // =================================================

  m = n.match(
    /(\d{1,2})\s*[º°OªA]?\s*(E\.?\s*M|EM)(?:[\s-]|$)/i
  );

  if (m) {
    const numero = parseInt(m[1], 10);

    serieTexto = `${numero}° ANO`;
    nivel = "E.M";

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // 3º ANO EM
  // 3ª SERIE EM
  // =================================================

  m = n.match(
    /(\d{1,2})\s*[º°OªA]?\s*(ANO|SERIE)\s*(E\.?\s*M|EM)/i
  );

  if (m) {
    const numero = parseInt(m[1], 10);

    serieTexto = `${numero}° ANO`;
    nivel = "E.M";

    return {
      serie: serieTexto,
      nivel: nivel,
      nivel_serie: `${nivel} ${serieTexto}`
    };
  }

  // =================================================
  // Se tiver EM mas não achou série
  // =================================================

  if (
    /(?:^|[\s-])(E\.?\s*M|EM)(?:[\s-]|$)/i.test(n)
  ) {
    return {
      serie: "",
      nivel: "E.M",
      nivel_serie: "E.M"
    };
  }

  return {
    serie: "",
    nivel: "",
    nivel_serie: ""
  };
}

// =====================================================
// TIPO SIMULADO
// =====================================================

function extrairTipoSimulado(nomeArquivo) {
  const m = nomeArquivo.match(
    /SIMULADO\s+ESSENCIAL|SIMULADO\s+B[ÁA]SICO/i
  );

  if (!m) {
    return "";
  }

  return m[0]
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    .replace("BÁSICO", "BASICO");
}

// =====================================================
// BIMESTRE
// =====================================================

function extrairBimestre(nomeArquivo) {
  const m = nomeArquivo.match(
    /\d+\s*[º°O]?\s*BIMESTRE/i
  );

  return m
    ? m[0]
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase()
    : "";
}

// =====================================================
// ANO
// =====================================================

function extrairAno(nomeArquivo) {
  const nomeSemExt = nomeArquivo.replace(
    /\.[^.]+$/,
    ""
  );

  const m = nomeSemExt.match(
    /(?:ALUNO|ALUNOS|UNIDADE|MAPA|QUESTAO|QUESTOES|QUESTÕES)\s*-\s*(\d{4})/i
  );

  return m
    ? m[1]
    : "";
}

// =====================================================
// ESCOLA
// =====================================================

function extrairEscola(nomeArquivo) {
  const nomeSemExt = nomeArquivo.replace(
    /\.[^.]+$/,
    ""
  );

  const match = nomeSemExt.match(
    /PLURAAL\s*-\s*(.*?)\s*(?:-\s*(ALUNO|ALUNOS|UNIDADE|MAPA|QUESTAO|QUESTOES|QUESTÕES)\s*(?:-\s*\d{4})?)?$/i
  );

  if (!match || !match[1]) {
    return "";
  }

  return match[1]
    .replace(/\s+/g, " ")
    .trim();
}

// =====================================================
// DISCIPLINA DO NOME DO ARQUIVO
// =====================================================

function extrairDisciplinaNomeArquivo(nomeArquivo) {
  const nomeSemExt = nomeArquivo.replace(
    /\.[^.]+$/,
    ""
  );

  const regex =
    /SIMULADO\s+(?:ESSENCIAL|B[ÁA]SICO)\s*-\s*(.*?)\s*-\s*\d+\s*[º°O]?\s*BIMESTRE/i;

  const match = nomeSemExt.match(regex);

  if (match && match[1]) {
    return match[1]
      .replace(/\s+/g, " ")
      .trim();
  }

  return "";
}

// =====================================================
// METADADOS
// =====================================================

function montarMetadados(
  nomeArquivo,
  tipoArquivo
) {
  const serieInfo =
    extrairSerieENivel(nomeArquivo);

  return {
    id_arquivo:
      extrairIdArquivo(nomeArquivo),

    serie:
      serieInfo.serie,

    nivel:
      serieInfo.nivel,

    nivel_serie:
      serieInfo.nivel_serie,

    tipo_simulado:
      extrairTipoSimulado(nomeArquivo),

    disciplina_nome_arquivo:
      extrairDisciplinaNomeArquivo(
        nomeArquivo
      ),

    bimestre:
      extrairBimestre(nomeArquivo),

    // UNIDADE NÃO RECEBE ESCOLA DO NOME
    escola:
      tipoArquivo === "unidade"
        ? ""
        : extrairEscola(nomeArquivo),

    ano:
      extrairAno(nomeArquivo)
  };
}

// =====================================================
// LEITURA DA PLANILHA
// =====================================================

function sheetToObjects(ws) {
  let linhas = XLSX.utils.sheet_to_json(
    ws,
    {
      header: 1,
      defval: ""
    }
  );

  if (
    !linhas ||
    !linhas.length
  ) {
    return [];
  }

  // =================================================
  // REMOVE SEMPRE A PRIMEIRA LINHA
  // =================================================

  linhas = linhas.slice(1);

  if (!linhas.length) {
    return [];
  }

  // =================================================
  // NOVA PRIMEIRA LINHA = CABEÇALHO
  // =================================================

  const headers =
    (linhas[0] || []).map(
      h => normalizarCabecalho(h)
    );

  const dados = [];

  for (
    let i = 1;
    i < linhas.length;
    i++
  ) {
    const row = linhas[i];

    const obj = {};

    headers.forEach(
      (h, idx) => {

        obj[
          h ||
          `COLUNA_${idx + 1}`
        ] =
          row[idx] ?? "";
      }
    );

    const temValor =
      Object.values(obj).some(
        v =>
          String(v).trim() !== ""
      );

    if (temValor) {
      dados.push(obj);
    }
  }

  return dados;
}

// =====================================================
// PROCURA UMA COLUNA POR ALIASES
// =====================================================

function firstValue(
  obj,
  aliases
) {
  for (
    const alias of aliases
  ) {
    for (
      const key of Object.keys(obj)
    ) {
      if (
        normalizarTexto(key) ===
        normalizarTexto(alias)
      ) {
        return obj[key] ?? "";
      }
    }
  }

  return "";
}

// =====================================================
// MATÉRIAS DO ARQUIVO ALUNOS
// =====================================================

function detectarMateriasPorPadrao(
  headers,
  indiceInicial = 0
) {
  const resultado = [];

  for (
    let i = indiceInicial;
    i < headers.length;
    i++
  ) {
    const atual =
      normalizarCabecalho(
        headers[i]
      );

    if (!atual) {
      continue;
    }

    const atualNorm =
      normalizarTexto(atual);

    if (
      atual.includes("%") &&
      !atualNorm.includes("TOTAL") &&
      !atualNorm.includes(
        "PERCENTUAL DE PARTICIPANTES"
      )
    ) {
      const base =
        atual
          .replace("%", "")
          .trim();

      const colunaNota =
        headers.find(h => {

          const t =
            normalizarCabecalho(h);

          const baseNorm =
            normalizarTexto(base);

          const tNorm =
            normalizarTexto(t);

          return (
            tNorm.startsWith(
              baseNorm + " ("
            ) ||
            tNorm.startsWith(
              baseNorm + "("
            )
          );
        });

      if (colunaNota) {
        resultado.push({
          disciplina: base,
          colunaPercentual:
            headers[i],
          colunaNota:
            colunaNota
        });
      }
    }
  }

  return resultado;
}

// =====================================================
// DISCIPLINAS DO ARQUIVO UNIDADE
// Tudo depois de "Percentual de participantes"
// =====================================================

function detectarDisciplinasUnidade(
  headers
) {
  const idxBase =
    headers.findIndex(h =>
      normalizarTexto(h) ===
      "PERCENTUAL DE PARTICIPANTES"
    );

  if (idxBase === -1) {
    return [];
  }

  const resultado = [];

  for (
    let i = idxBase + 1;
    i < headers.length;
    i++
  ) {
    const col =
      normalizarCabecalho(
        headers[i]
      );

    if (!col) {
      continue;
    }

    const colNorm =
      normalizarTexto(col);

    if (
      !colNorm.startsWith(
        "COLUNA "
      )
    ) {
      resultado.push(col);
    }
  }

  return resultado;
}

// =====================================================
// PADRONIZA ALUNOS
// =====================================================

function padronizarCabecalhoAlunos(
  linhas
) {
  return linhas.map(l => {

    const novo = {};

    ALUNOS_HEADERS.forEach(
      h => novo[h] = ""
    );

    META_COLS.forEach(
      c => novo[c] =
        l[c] ?? ""
    );

    novo["Alunos"] =
      l["Alunos"] ?? "";

    novo["RA"] =
      l["RA"] ?? "";

    novo["Turma"] =
      l["Turma"] ?? "";

    novo["Início"] =
      l["Início"] ?? "";

    novo["Fim"] =
      l["Fim"] ?? "";

    novo["Tempo"] =
      l["Tempo"] ?? "";

    novo["Total (%)"] =
      l["Total (%)"] ?? "";

    novo["Total (23)"] =
      l["Total (23)"] ?? "";

    novo["disciplina"] =
      l["disciplina"] ?? "";

    return novo;
  });
}

// =====================================================
// PADRONIZA UNIDADE
// =====================================================

function padronizarCabecalhoUnidade(
  linhas
) {
  return linhas.map(l => {

    const novo = {};

    UNIDADE_HEADERS.forEach(
      h => novo[h] = ""
    );

    META_COLS.forEach(
      c => novo[c] =
        l[c] ?? ""
    );

    // GARANTIA:
    // unidade nunca recebe escola
    novo["escola"] = "";

    novo["União"] =
      l["União"] ?? "";

    novo["Campo"] =
      l["Campo"] ?? "";

    novo["Unidade"] =
      l["Unidade"] ?? "";

    novo["Início"] =
      l["Início"] ?? "";

    novo["Fim"] =
      l["Fim"] ?? "";

    novo["Participantes"] =
      l["Participantes"] ?? "";

    novo["Participantes esperados"] =
      l["Participantes esperados"] ?? "";

    novo["Percentual de participantes"] =
      l["Percentual de participantes"] ??
      "";

    novo["disciplina"] =
      l["disciplina"] ?? "";

    novo["Nota"] =
      l["Nota"] ?? "";

    return novo;
  });
}

// =====================================================
// PADRONIZA MAPA
// =====================================================

function padronizarCabecalhoMapa(
  linhas
) {
  return linhas.map(l => {

    const novo = {};

    MAPA_HEADERS.forEach(
      h => novo[h] = ""
    );

    META_COLS.forEach(
      c => novo[c] =
        l[c] ?? ""
    );

    novo["Code"] =
      l["Code"] ?? "";

    novo["Disciplina"] =
      l["Disciplina"] ?? "";

    novo["Conteúdo/Habilidade"] =
      l["Conteúdo/Habilidade"] ??
      "";

    novo["Dificuldade"] =
      l["Dificuldade"] ?? "";

    novo["Gabarito"] =
      l["Gabarito"] ?? "";

    return novo;
  });
}

// =====================================================
// PADRONIZA QUESTÃO
// =====================================================

function padronizarCabecalhoQuestao(
  linhas
) {
  return linhas.map(l => {

    const novo = {};

    QUESTAO_HEADERS.forEach(
      h => novo[h] = ""
    );

    META_COLS.forEach(
      c => novo[c] =
        l[c] ?? ""
    );

    novo["#"] =
      l["#"] ?? "";

    novo["Código"] =
      l["Código"] ?? "";

    novo["Disciplina"] =
      l["Disciplina"] ?? "";

    novo["Habilidade/Conteúdo"] =
      l["Habilidade/Conteúdo"] ??
      "";

    novo["Dificuldade"] =
      l["Dificuldade"] ?? "";

    novo["Gabarito"] =
      l["Gabarito"] ?? "";

    novo["% Acertos"] =
      l["% Acertos"] ?? "";

    novo["% Erros"] =
      l["% Erros"] ?? "";

    return novo;
  });
}

// =====================================================
// TRANSFORMA ALUNOS
// =====================================================

function transformarAlunos(
  dados,
  meta
) {
  if (!dados.length) {
    return [];
  }

  const headers =
    Object.keys(dados[0]);

  const idxTempo =
    headers.findIndex(
      h =>
        normalizarTexto(h) ===
        "TEMPO"
    );

  const idxTotal =
    headers.findIndex(
      h =>
        normalizarTexto(h)
          .startsWith("TOTAL")
    );

  const materias =
    detectarMateriasPorPadrao(
      headers,
      idxTempo >= 0
        ? idxTempo + 1
        : 0
    )
    .filter(m => {

      const idxPerc =
        headers.indexOf(
          m.colunaPercentual
        );

      return (
        idxTotal === -1 ||
        idxPerc < idxTotal
      );
    });

  let resultado = [];

  if (!materias.length) {

    resultado =
      dados.map(l => ({
        ...meta,

        "Alunos":
          firstValue(
            l,
            [
              "Alunos",
              "Aluno"
            ]
          ),

        "RA":
          firstValue(
            l,
            ["RA"]
          ),

        "Turma":
          firstValue(
            l,
            ["Turma"]
          ),

        "Início":
          firstValue(
            l,
            [
              "Início",
              "Inicio"
            ]
          ),

        "Fim":
          firstValue(
            l,
            ["Fim"]
          ),

        "Tempo":
          firstValue(
            l,
            ["Tempo"]
          ),

        "Total (%)":
          firstValue(
            l,
            ["Total (%)"]
          ),

        "Total (23)":
          firstValue(
            l,
            [
              "Total (23)",
              "Total (30)",
              "Total (20)",
              "Total (15)",
              "Total (12)",
              "Total (10)",
              "Total (8)",
              "Total (6)",
              "Total"
            ]
          ),

        "disciplina":
          firstValue(
            l,
            ["Disciplina"]
          )
      }));

  } else {

    for (
      const linha of dados
    ) {

      for (
        const mat of materias
      ) {

        resultado.push({
          ...meta,

          "Alunos":
            firstValue(
              linha,
              [
                "Alunos",
                "Aluno"
              ]
            ),

          "RA":
            firstValue(
              linha,
              ["RA"]
            ),

          "Turma":
            firstValue(
              linha,
              ["Turma"]
            ),

          "Início":
            firstValue(
              linha,
              [
                "Início",
                "Inicio"
              ]
            ),

          "Fim":
            firstValue(
              linha,
              ["Fim"]
            ),

          "Tempo":
            firstValue(
              linha,
              ["Tempo"]
            ),

          "Total (%)":
            firstValue(
              linha,
              ["Total (%)"]
            ),

          "Total (23)":
            firstValue(
              linha,
              [
                "Total (23)",
                "Total (30)",
                "Total (20)",
                "Total (15)",
                "Total (12)",
                "Total (10)",
                "Total (8)",
                "Total (6)",
                "Total"
              ]
            ),

          "disciplina":
            mat.disciplina
        });
      }
    }
  }

  return padronizarCabecalhoAlunos(
    resultado
  );
}

// =====================================================
// TRANSFORMA UNIDADE
// =====================================================

function transformarUnidade(
  dados,
  meta
) {
  if (!dados.length) {
    return [];
  }

  const headers =
    Object.keys(dados[0]);

  const disciplinas =
    detectarDisciplinasUnidade(
      headers
    );

  log(
    `   Disciplinas unidade: ${
      disciplinas.length
        ? disciplinas.join(", ")
        : "nenhuma"
    }`
  );

  const resultado = [];

  for (
    const linha of dados
  ) {

    const base = {
      ...meta,

      escola: "",

      "União":
        firstValue(
          linha,
          [
            "União",
            "Uniao"
          ]
        ),

      "Campo":
        firstValue(
          linha,
          ["Campo"]
        ),

      "Unidade":
        firstValue(
          linha,
          ["Unidade"]
        ),

      "Início":
        firstValue(
          linha,
          [
            "Início",
            "Inicio"
          ]
        ),

      "Fim":
        firstValue(
          linha,
          ["Fim"]
        ),

      "Participantes":
        firstValue(
          linha,
          ["Participantes"]
        ),

      "Participantes esperados":
        firstValue(
          linha,
          [
            "Participantes esperados",
            "Participantes Esperados"
          ]
        ),

      "Percentual de participantes":
        firstValue(
          linha,
          [
            "Percentual de participantes",
            "Percentual"
          ]
        )
    };

    if (!disciplinas.length) {

      resultado.push({
        ...base,
        disciplina: "",
        Nota: ""
      });

      continue;
    }

    // ===============================================
    // CADA DISCIPLINA VIRA UMA LINHA
    // ===============================================

    for (
      const disciplina of disciplinas
    ) {

      resultado.push({
        ...base,

        disciplina:
          disciplina,

        Nota:
          linha[disciplina] ?? ""
      });
    }
  }

  return padronizarCabecalhoUnidade(
    resultado
  );
}

// =====================================================
// TRANSFORMA MAPA
// =====================================================

function transformarMapa(
  dados,
  meta
) {
  const linhas =
    dados.map(l => ({
      ...meta,

      "Code":
        firstValue(
          l,
          [
            "Code",
            "Código",
            "Codigo"
          ]
        ),

      "Disciplina":
        firstValue(
          l,
          ["Disciplina"]
        ),

      "Conteúdo/Habilidade":
        firstValue(
          l,
          [
            "Conteúdo/Habilidade",
            "Conteudo/Habilidade",
            "Habilidade/Conteúdo",
            "Habilidade/Conteudo"
          ]
        ),

      "Dificuldade":
        firstValue(
          l,
          ["Dificuldade"]
        ),

      "Gabarito":
        firstValue(
          l,
          ["Gabarito"]
        )
    }));

  return padronizarCabecalhoMapa(
    linhas
  );
}

// =====================================================
// TRANSFORMA QUESTÃO
// =====================================================

function transformarQuestao(
  dados,
  meta
) {
  const linhas =
    dados.map(l => ({
      ...meta,

      "#":
        firstValue(
          l,
          [
            "#",
            "Nº",
            "No"
          ]
        ),

      "Código":
        firstValue(
          l,
          [
            "Código",
            "Codigo",
            "Code"
          ]
        ),

      "Disciplina":
        firstValue(
          l,
          ["Disciplina"]
        ),

      "Habilidade/Conteúdo":
        firstValue(
          l,
          [
            "Habilidade/Conteúdo",
            "Habilidade/Conteudo",
            "Conteúdo/Habilidade",
            "Conteudo/Habilidade"
          ]
        ),

      "Dificuldade":
        firstValue(
          l,
          ["Dificuldade"]
        ),

      "Gabarito":
        firstValue(
          l,
          ["Gabarito"]
        ),

      "% Acertos":
        firstValue(
          l,
          [
            "% Acertos",
            "% Acerto"
          ]
        ),

      "% Erros":
        firstValue(
          l,
          [
            "% Erros",
            "% Erro"
          ]
        )
    }));

  return padronizarCabecalhoQuestao(
    linhas
  );
}

// =====================================================
// LEITURA DO ARQUIVO
// =====================================================

async function lerArquivo(file) {
  const buffer =
    await file.arrayBuffer();

  const wb =
    XLSX.read(
      buffer,
      {
        type: "array"
      }
    );

  const primeiraAba =
    wb.SheetNames[0];

  const ws =
    wb.Sheets[
      primeiraAba
    ];

  return sheetToObjects(ws);
}

// =====================================================
// FUNÇÕES DE LINK
// =====================================================

function escaparHTML(texto) {
  return String(
    texto ?? ""
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =====================================================
// VERIFICA SE O VALOR É LINK
// =====================================================

function ehLink(valor) {
  if (!valor) {
    return false;
  }

  const v =
    String(valor).trim();

  return (
    v.startsWith("http://") ||
    v.startsWith("https://")
  );
}

// =====================================================
// VERIFICA SE A COLUNA É DE LINK
// =====================================================

function ehColunaLink(nomeColuna) {
  const n =
    normalizarTexto(
      nomeColuna
    );

  return (
    n === "LINK" ||
    n.includes("LINK ") ||
    n.includes(" LINK") ||
    n === "URL" ||
    n.includes("URL ") ||
    n.includes(" URL")
  );
}

// =====================================================
// ENCURTAR LINK NA TELA
// =====================================================

function encurtarLink(
  link,
  tamanhoInicio = 35,
  tamanhoFim = 15
) {
  if (!link) {
    return "";
  }

  const texto =
    String(link);

  if (
    texto.length <=
    tamanhoInicio +
      tamanhoFim +
      3
  ) {
    return texto;
  }

  return (
    texto.substring(
      0,
      tamanhoInicio
    ) +
    "..." +
    texto.substring(
      texto.length -
      tamanhoFim
    )
  );
}

// =====================================================
// COPIAR LINK
// =====================================================

async function copiarLink(
  link,
  botao
) {
  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        link
      );

    } else {

      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.value =
        link;

      textarea.style.position =
        "fixed";

      textarea.style.left =
        "-9999px";

      document.body.appendChild(
        textarea
      );

      textarea.focus();
      textarea.select();

      document.execCommand(
        "copy"
      );

      document.body.removeChild(
        textarea
      );
    }

    const original =
      botao.innerHTML;

    botao.innerHTML = "✓";
    botao.title =
      "Link copiado";

    setTimeout(
      () => {
        botao.innerHTML =
          original;

        botao.title =
          "Copiar link";
      },
      1500
    );

  } catch (erro) {

    console.error(
      "Erro ao copiar:",
      erro
    );

    alert(
      "Não foi possível copiar o link."
    );
  }
}

// =====================================================
// CRIA VISUAL DO LINK
// =====================================================

function criarLinkComCopia(
  link
) {
  if (!link) {
    return "";
  }

  const linkOriginal =
    String(link);

  const linkSeguro =
    escaparHTML(
      linkOriginal
    );

  const linkCurto =
    escaparHTML(
      encurtarLink(
        linkOriginal
      )
    );

  return `
    <div
      style="
        display:flex;
        align-items:center;
        gap:6px;
        max-width:320px;
      "
    >

      <a
        href="${linkSeguro}"
        target="_blank"
        rel="noopener noreferrer"
        title="${linkSeguro}"
        style="
          display:inline-block;
          max-width:260px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          color:#1265b0;
          text-decoration:none;
        "
      >
        ${linkCurto}
      </a>

      <button
        type="button"
        onclick='copiarLink(${JSON.stringify(linkOriginal)}, this)'
        title="Copiar link"
        style="
          border:none;
          background:transparent;
          cursor:pointer;
          font-size:17px;
          padding:4px 6px;
        "
      >
        📋
      </button>

    </div>
  `;
}

// =====================================================
// PREVIEW
// =====================================================

function mostrarPreview(
  linhas
) {
  const preview =
    document.getElementById(
      "preview"
    );

  if (!preview) {
    return;
  }

  if (
    !linhas ||
    !linhas.length
  ) {
    preview.innerHTML = "";
    return;
  }

  const primeiros =
    linhas.slice(
      0,
      15
    );

  const colunas =
    Object.keys(
      primeiros[0]
    );

  let html =
    "<table><thead><tr>";

  colunas.forEach(
    col => {

      html += `
        <th>
          ${escaparHTML(col)}
        </th>
      `;
    }
  );

  html +=
    "</tr></thead><tbody>";

  primeiros.forEach(
    linha => {

      html += "<tr>";

      colunas.forEach(
        col => {

          const valor =
            linha[col] ?? "";

          if (
            ehColunaLink(col) ||
            ehLink(valor)
          ) {

            html += `
              <td>
                ${criarLinkComCopia(
                  valor
                )}
              </td>
            `;

          } else {

            html += `
              <td>
                ${escaparHTML(
                  valor
                )}
              </td>
            `;
          }
        }
      );

      html += "</tr>";
    }
  );

  html +=
    "</tbody></table>";

  preview.innerHTML =
    html;
}

// =====================================================
// PROCESSAMENTO PRINCIPAL
// =====================================================

async function processarArquivos() {
  limparLog();

  const input =
    document.getElementById(
      "files"
    );

  const files =
    Array.from(
      input?.files || []
    );

  if (!files.length) {

    alert(
      "Selecione os arquivos."
    );

    return;
  }

  const abas = {
    alunos: [],
    unidade: [],
    mapa: [],
    questao: [],
    desconhecido: []
  };

  for (
    const file of files
  ) {
    try {

      log(
        `📂 Lendo: ${file.name}`
      );

      const tipo =
        detectarTipoArquivo(
          file.name
        );

      const meta =
        montarMetadados(
          file.name,
          tipo
        );

      const dados =
        await lerArquivo(
          file
        );

      log(
        `   Tipo: ${tipo}`
      );

      log(
        `   ID: ${
          meta.id_arquivo ||
          "(não encontrado)"
        }`
      );

      log(
        `   Série: ${
          meta.serie ||
          "(não encontrada)"
        }`
      );

      log(
        `   Nível: ${
          meta.nivel ||
          "(não encontrado)"
        }`
      );

      log(
        `   Nível/Série: ${
          meta.nivel_serie ||
          "(não encontrado)"
        }`
      );

      log(
        `   Simulado: ${
          meta.tipo_simulado ||
          "(não encontrado)"
        }`
      );

      log(
        `   Disciplina: ${
          meta.disciplina_nome_arquivo ||
          "(não encontrada)"
        }`
      );

      log(
        `   Bimestre: ${
          meta.bimestre ||
          "(não encontrado)"
        }`
      );

      if (
        tipo !== "unidade"
      ) {
        log(
          `   Escola: ${
            meta.escola ||
            "(não encontrada)"
          }`
        );
      }

      log(
        `   Ano: ${
          meta.ano ||
          "(não encontrado)"
        }`
      );

      log(
        `   Linhas lidas: ${
          dados.length
        }`
      );

      let transformado = [];

      if (
        tipo === "alunos"
      ) {

        transformado =
          transformarAlunos(
            dados,
            meta
          );

      } else if (
        tipo === "unidade"
      ) {

        transformado =
          transformarUnidade(
            dados,
            meta
          );

      } else if (
        tipo === "mapa"
      ) {

        transformado =
          transformarMapa(
            dados,
            meta
          );

      } else if (
        tipo === "questao"
      ) {

        transformado =
          transformarQuestao(
            dados,
            meta
          );

      } else {

        transformado =
          dados.map(
            l => ({
              ...meta,
              ...l
            })
          );
      }

      abas[tipo] =
        abas[tipo].concat(
          transformado
        );

      previewData =
        previewData.concat(
          transformado.slice(
            0,
            5
          )
        );

      log(
        `   ✅ Linhas finais: ${
          transformado.length
        }`
      );

    } catch (erro) {

      console.error(
        erro
      );

      log(
        `   ❌ Erro em ${
          file.name
        }: ${
          erro.message
        }`
      );
    }
  }

  // ===================================================
  // CRIA EXCEL FINAL
  // ===================================================

  workbookFinal =
    XLSX.utils.book_new();

  Object.entries(
    abas
  ).forEach(
    ([nomeAba, linhas]) => {

      if (
        !linhas.length
      ) {
        return;
      }

      const ws =
        XLSX.utils.json_to_sheet(
          linhas
        );

      XLSX.utils.book_append_sheet(
        workbookFinal,
        ws,
        nomeAba.substring(
          0,
          31
        )
      );
    }
  );

  mostrarPreview(
    previewData
  );

  const btnBaixar =
    document.getElementById(
      "btnBaixar"
    );

  if (btnBaixar) {
    btnBaixar.disabled =
      false;
  }

  log(
    "✅ Processamento concluído."
  );
}

// =====================================================
// BAIXAR EXCEL
// =====================================================

function baixarExcel() {
  if (!workbookFinal) {

    alert(
      "Nenhum resultado disponível."
    );

    return;
  }

  XLSX.writeFile(
    workbookFinal,
    "resultado_pluraal.xlsx"
  );
}

// =====================================================
// EVENTOS
// =====================================================

document
  .getElementById(
    "btnProcessar"
  )
  ?.addEventListener(
    "click",
    processarArquivos
  );

document
  .getElementById(
    "btnBaixar"
  )
  ?.addEventListener(
    "click",
    baixarExcel
  );
