import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const currentDate = new Date();
const db = new Database() // instanciando o database

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const {title, description} = req.body
      const task = {
        id : randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: currentDate,
        updated_at: null,
      }
      db.insert("tasks", task)
      return res.writeHead(201).end();
    }
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler(req, res) {
      const {search} = req.query
      const tasks = db.select("tasks", search ? {
        title : search,
        description: search
       }: null)
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler(req,res) {
      const { id } = req.params;
      db.delete("tasks", id )
      return res.writeHead(204).end();
    }
  },
  {
    method:"PUT",
    path: buildRoutePath("/tasks/:id"),
    handler(req,res) {
      const {id} = req.params

      const {title,description} = req.body
      const updated_at = currentDate

      db.updateData("tasks", id, title, description, updated_at)
      return res.writeHead(204).end()
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler(req,res) {
      const {id} = req.params
      const completed_at = currentDate

      db.completeTask("tasks", id, completed_at)
      return res.writeHead(204).end()
    }
  }
]