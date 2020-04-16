const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const reposity = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };

  repositories.push(reposity);

  return response.status(200).json(reposity);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((rep) => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json("Repository not found.");
  }

  const updatedRep = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = updatedRep;

  return response.status(200).json(updatedRep);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((rep) => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json("Repository not found.");
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((rep) => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json("Repository not found.");
  }

  repositories[repositoryIndex].likes++;

  return response
    .status(200)
    .json({ likes: repositories[repositoryIndex].likes });
});

module.exports = app;
