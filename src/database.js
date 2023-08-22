import fs from "node:fs/promises"

const databasepath = new URL('db.json', import.meta.url)

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasepath, "utf8")
      .then((data) => {
        // data recebe o que foi lido no databasepath
        this.#database = JSON.parse(data); // #database q é um objeto q fica na memoria temporaria, recebe de data o q foi lido no json
      })
      .catch(() => {
        // caso n exista arquivo para ler
        this.#persist(); // cria o arquivo baseado no #database existente que é só um objeto vazio
      });
  }

  #persist() {
    fs.writeFile(databasepath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  select(table, search) {
    let data = this.#database[table] ?? []; // "??" O operador de coalescência nula (??) é usado para fornecer um valor padrão caso o valor à esquerda do operador seja null ou undefined. Se o valor à esquerda não for null nem undefined, o operador retornará o valor à esquerda.

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }

  delete(table, rowIndex) {
    this.#database[table].splice(rowIndex, 1);
    this.#persist();
  }

  updateData(table, rowIndex, title, description, updated_at) {
    const dataToUpdate = this.#database[table][rowIndex];
    if (title) {
      dataToUpdate.title = title;
    }
    if (description) {
      dataToUpdate.description = description;
    }
    dataToUpdate.updated_at = updated_at;
    this.#persist();
  }

  completeTask(table, rowIndex, completed_at) {
    const dataToUpdate = this.#database[table][rowIndex];
    if (dataToUpdate.completed_at === null) {
      dataToUpdate.completed_at = completed_at;
    } else {
      dataToUpdate.completed_at = null;
    }
    
    this.#persist();
  }

  checkId(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row["id"] === id);
    if (rowIndex === -1) {
      return false;
    }
    return rowIndex;
  }
}