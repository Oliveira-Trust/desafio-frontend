import type { User } from "@/types/user.type";

export function exportUsersToCSV (data: User[]) {
  const csvString = [
    [
      "ID",
      "Nome",
      "Sobrenome",
      "Email",
      "Endereço",
      "Data de Nascimento",
      "Data de Abertura",
      "Valor da Carteira",
      "Endereço da Carteira",
    ],
    ...data.map(user => [
      user.id,
      user.nome,
      user.sobrenome,
      user.email,
      user.endereco,
      user.data_nascimento,
      user.data_abertura,
      user.valor_carteira,
      user.endereco_carteira,
    ])
  ]
  .map(e => e.join(",")) 
  .join("\n");

  const today = new Date();

  const a = document.createElement('a');
  const mimeType = 'text/csv;encoding:utf-8';
  const fileName = `carteira-usuarios-${today.toISOString()}.csv`

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(new Blob([csvString], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) {
    a.href = URL.createObjectURL(new Blob([csvString], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.assign('data:text/csv;encoding:utf-8,' + encodeURIComponent(csvString));
  }
}
