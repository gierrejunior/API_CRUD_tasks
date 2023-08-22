# API_CRUD_tasks

API, made in NODEJs, with where it has with

The API contains the following features:

- Creating a task
- List of all tasks
- Update a task by `id`
- Remove a task by `id`
- Mark a task as complete by `id`

### Routes and business rules

   structure and properties of a task:

- `id` - Unique identifier of each task
- `title` - Title of the task
- `description` - Detailed description of the task
- `completed_at` - Data when a task was completed. The initial value is `null`
- `created_at` - Data when a task was created.
- `updated_at` - It is always changed to the date when a task was updated.

Routes:

- `POST - /tasks`
    
   Creates a task in the database, sending the fields `title` and `description` through the `body` of the request.
    
      When creating a task, the fields: `id`, `created_at`, `updated_at` and `completed_at` are filled in automatically, according to the orientation of the properties above.
    
- `GET - /tasks`
    
     It is possible to list all tasks saved in the database.
    
      It is also possible to perform a search, filtering tasks by `title` and `description`
    
- `PUT - /tasks/:id`
    
     It is possible to update a task by `id`.
    
      In the `body` of the request, it should only receive the `title` and/or `description` to be updated.
    
      If only the `title` is sent, it means that the `description` will not be updated and vice versa.
    
      Before carrying out the update, a validation is made if the `id` belongs to a task saved in the database.
    
- `DELETE - /tasks/:id`
    
      It is possible to remove a task by `id`.
    
      Before performing the removal, a validation must be made if the `id` belongs to a task saved in the database.
    
- `PATCH - /tasks/:id/complete`
    
      You can mark the task as complete or not. This means that if the task is complete, it should return to its "normal" state.
          
      Before the change, a validation is made if the 'id' belongs to a task saved in the database.
