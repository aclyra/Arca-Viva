// Tradução direta da lógica de raca.c para JS
export const calcularRiscoExtincao = (c1, c2, c3, c4) => {
  // c1 e c2 valem 1 ponto | c3 e c4 valem 2 pontos
  const pontos = (Number(c1) * 1) + (Number(c2) * 1) + (Number(c3) * 2) + (Number(c4) * 2);

  return {
    pontuacao: pontos,
    riscoDeExtincao: pontos >= 5, // Regra cont >= 5 do seu código C
    emAlerta: pontos > 2 && pontos < 5 // Estado de alerta do seu código C
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