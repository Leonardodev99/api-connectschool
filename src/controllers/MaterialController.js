import Material from '../models/Material.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

class MaterialController {
  /**
   * Criar material
   * POST /materials
   */
  async store(req, res) {
    try {
      const { teacher_id, title, description, file_url } = req.body;

      // Verifica se o professor existe
      const teacher = await Teacher.findByPk(teacher_id, {
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'nome', 'email']
        }
      });

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      const material = await Material.create({
        teacher_id,
        title,
        description,
        file_url
      });

      return res.status(201).json(material);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Listar todos os materiais
   * GET /materials
   */
  async index(req, res) {
    try {
      const materials = await Material.findAll({
        include: {
          model: Teacher,
          as: 'teacher',
          include: {
            model: User,
            as: 'user',
            attributes: ['id', 'nome', 'email']
          }
        }
      });

      return res.json(materials);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar materiais' });
    }
  }

  /**
   * Buscar material por ID
   * GET /materials/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;

      const material = await Material.findByPk(id, {
        include: {
          model: Teacher,
          as: 'teacher',
          include: {
            model: User,
            as: 'user',
            attributes: ['id', 'nome', 'email']
          }
        }
      });

      if (!material) {
        return res.status(404).json({ error: 'Material não encontrado' });
      }

      return res.json(material);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar material' });
    }
  }

  /**
   * Atualizar material
   * PUT /materials/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, file_url, ativo } = req.body;

      const material = await Material.findByPk(id);
      if (!material) {
        return res.status(404).json({ error: 'Material não encontrado' });
      }

      await material.update({
        title,
        description,
        file_url,
        ativo
      });

      return res.json(material);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Remover material
   * DELETE /materials/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const material = await Material.findByPk(id);
      if (!material) {
        return res.status(404).json({ error: 'Material não encontrado' });
      }

      await material.destroy();

      return res.json({ message: 'Material removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover material' });
    }
  }
}

export default new MaterialController();
