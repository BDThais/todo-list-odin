# Todo List

A simple todo list application built with vanilla JavaScript. This project was created while learning JavaScript, so it does not use a frontend framework. The interface is built with standard DOM APIs and bundled with webpack.

## Features

- Create, edit, and delete projects
- Add, edit, complete, and delete todo tasks
- Set a task priority: Low, Medium, High, or Urgent
- Set a due date or make a task Daily
- Move completed tasks to the bottom of the list
- Reset completed tasks when a new calendar day begins
- Persist projects and tasks in the browser's `localStorage`
- Responsive layout for desktop and mobile screens

## Data Storage

The app stores data locally in the browser, so projects and tasks are specific to the browser and device being used. No backend or account is required.

The app uses these `localStorage` entries:

- `projectList`: serialized projects and their todo tasks
- `todoLastResetDate`: the last calendar date on which completed tasks were reset

Completed tasks with due date = "Daily" are reset to `isCompleted: false` when the app is opened on a new local calendar day. The reset is based on the day changing, not on the time an individual task was completed.

When `projectList` is empty, the app loads example personal, work, and home tasks as seed data. Existing local data is not replaced by the seed data.

## Project Structure

```text
src/
	controllers/    Event handlers and page initialization
	data_model/     Projects, todos, persistence, and daily reset logic
	views/          DOM creation and rendering functions
	index.js        Application entry point
	style.css       Application and responsive styles
	template.html   HTML shell used by webpack
```

The application uses ES modules and separates responsibilities across controllers, the data model, and views without relying on React, Vue, or another frontend framework.

## Technologies

- JavaScript (ES modules)
- HTML and CSS
- webpack
- `localStorage`
- `date-fns` for date utilities

