import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const currentDate = new Date().toLocaleString("pt-BR", {
  timeZone: "America/Sao_Paulo",
});
const db = new Database() // instanciando o database

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (title && description) {
        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: currentDate,
          updated_at: null,
        };
        db.insert("tasks", task);
        return res.writeHead(201).end();
      } else {
        return res.writeHead(400).end();
      }
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler(req, res) {
      const { search } = req.query;
      const tasks = db.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler(req, res) {
      const { id } = req.params;

      //verificação de ID
      const rowIndex = db.checkId("tasks", id);
      if (rowIndex === false) {
        return res.writeHead(404).end("id não encontrado");
      }

      db.delete("tasks", rowIndex);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler(req, res) {
      const { id } = req.params;

      //verificação de ID
      const rowIndex = db.checkId("tasks", id)
      if (rowIndex === false) {
        return res.writeHead(404).end("id não encontrado");
      }

      if (req.body){
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;

      const updated_at = currentDate;

      db.updateData("tasks", rowIndex, title, description, updated_at);
      } else {
        return res.writeHead(400).end();
      }
      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler(req, res) {
      const { id } = req.params;

      //verificação de ID
      const rowIndex = db.checkId("tasks", id);
      if (rowIndex === false) {
        return res.writeHead(404).end("id não encontrado");
      }

      const completed_at = currentDate;

      db.completeTask("tasks", rowIndex, completed_at);
      return res.writeHead(204).end();
    },
  },
];