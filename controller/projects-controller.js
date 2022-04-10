const db = require('../db');
const Projects = db.projects;

class ProjectsController {
  async getProjects(req, res) {
    const projects = await Projects.findAll();
    res.json(projects);
  }
  async getSearchProjects(req, res) {
    try {
      const title = req.params.title;
      const projects = await Projects.findOne({ where: { title: title }}
      );
      res.json(projects);
    } catch (error) {
        res.json(error);
    }
  }
}

module.exports = new ProjectsController();
