import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import User from '../models/User.js';

class ClassController {

  /**
   * 📌 Criar Turma
   * POST /classes
   */
  async store(req, res) {
    try {
      const { nome, ano_letivo, curso, teacher_id } = req.body;

      const newClass = await Class.create({
        nome,
        ano_letivo,
        curso,
        teacher_id
      });

      const classWithRelations = await Class.findByPk(newClass.id, {
        include: [
          {
            model: Teacher,
            as: 'teacher',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ]
      });

      return res.status(201).json(classWithRelations);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * 📌 Listar Turmas
   * GET /classes
   */
  async index(req, res) {
    try {
      const classes = await Class.findAll({
        where: { ativo: true },
        include: [
          {
            model: Teacher,
            as: 'teacher',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'nome']
              }
            ]
          }
        ]
      });

      return res.json(classes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar turmas' });
    }
  }

  /**
   * 📌 Buscar Turma por ID
   * GET /classes/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;

      const turma = await Class.findByPk(id, {
        include: [
          {
            association: 'teacher',
            include: [
              {
                association: 'user',
                attributes: ['id', 'nome', 'email']
              }
            ]
          },
          {
            association: 'students',
            attributes: ['id', 'matricula'],
            include: [
              {
                association: 'user',
                attributes: ['id', 'nome']
              }
            ]
          }
        ]
      });

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      return res.json(turma);

    } catch (error) {
      console.error(error); // 👈 coloca isso para ver o erro real
      return res.status(500).json({ error: 'Erro ao buscar turma' });
    }
  }

  /**
   * 📌 Atualizar Turma
   * PUT /classes/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, ano_letivo, curso, teacher_id, ativo } = req.body;

      const turma = await Class.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.update({
        nome,
        ano_letivo,
        curso,
        teacher_id,
        ativo
      });

      return res.json(turma);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * 📌 Desativar Turma (Soft Delete)
   * DELETE /classes/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const turma = await Class.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.update({ ativo: false });

      return res.json({ message: 'Turma desativada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar turma' });
    }
  }
}

export default new ClassController();
