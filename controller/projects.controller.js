const db = require('../db'); 

class ProjectsController {
    async getProjects(req, res) {
       const projects = await db.query('SELECT * FROM projects');
       res.json(projects.rows);
    }
    async getSearchProjects(req, res){
        const id = req.params.id;
        const projects = await db.query("SELECT * FROM projects WHERE id = $1", [id])
        res.json(projects.rows);
    }
}

module.exports = new ProjectsController();