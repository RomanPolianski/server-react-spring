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
      const titleMatch = `%${title}`;
      const projects = await db.query(
        'SELECT * FROM projects WHERE title iLIKE $1',
        [titleMatch]
      );
      res.json(projects.rows);
    } catch (error) {
        res.json(error);
    }
  }
}

module.exports = new ProjectsController();
