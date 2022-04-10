const { Op } = require("sequelize");
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
      const projects = await Projects.findAll({
        where: {
          title: {
            [Op.iLike] : titleMatch
          }
        }
      })
      res.json(projects);
    } catch (error) {
        res.json(error);
    }
  }
}

module.exports = new ProjectsController();
