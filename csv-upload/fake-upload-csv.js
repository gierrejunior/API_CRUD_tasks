import fs from "node:fs/promises";
import csvParser from "csv-parser";

const databasePath = new URL("upload.csv", import.meta.url);

fs.readFile(databasePath, "utf8").then((data) => {
  const jsonDataArray = []; // Array para armazenar os objetos JSON

  // Processa o arquivo CSV usando csv-parser
  const parser = csvParser({
    separator: ";", // Define o separador como ponto e vírgula
  });

  parser.write(data); // Escreve os dados do arquivo no csv-parser
  parser.end(); // Finaliza o processamento

  parser.on("data", (row) => {
    const csvData = {
      // Cria um objeto a partir dos dados do CSV
      title: row.title,
      description: row.description,
    };

    jsonDataArray.push(csvData); // Adicione o objeto ao array

    // Envia a requisição para o servidor com o objeto transformado em JSON
    fetch("http://localhost:3335/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(csvData), // Converte o objeto em JSON
    });
  });

});
