const db = require('../db');

class ProjectsController {
  async getProjects(req, res) {
    const projects = await db.query('SELECT * FROM projects');
    res.json(projects.rows);
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
