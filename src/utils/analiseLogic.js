export const calcularRiscoExtincao = (c1, c2, c3, c4) => {
  const pontos = (Number(c1) * 1) + (Number(c2) * 1) + (Number(c3) * 2) + (Number(c4) * 2);

  return {
    pontuacao: pontos,
    riscoDeExtincao: pontos >= 5, 
    emAlerta: pontos > 2 && pontos < 5 
  };
};

export const criarNovaRaca = (id, dados) => {
  const { nome, especie, pais } = dados;
  const analise = calcularRiscoExtincao(dados.c1, dados.c2, dados.c3, dados.c4);

  return {
    idRaca: id,
    nome: nome,
    especie: especie,
    paisDeOrigem: pais,
    ...analise
  };
};