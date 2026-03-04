import Guardian from '../models/Guardian';
import User from '../models/User';
import Student from '../models/Student';

class GuardianController {
  // 📌 Listar todos
  async index(req, res) {
    try {
      const guardians = await Guardian.findAll({
        where: { ativo: true },
        attributes: ['id', 'telefone', 'ativo', 'created_at'],
        include: [
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'matricula'],
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

      return res.json(guardians);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 📌 Buscar por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      const guardian = await Guardian.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nome', 'email', 'tipo']
          },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'matricula'],
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

      if (!guardian) {
        return res.status(404).json({ error: 'Encarregado não encontrado' });
      }

      return res.json(guardian);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 📌 Criar
  // 📌 Criar Guardian e associar estudantes
  async store(req, res) {
    try {
      const { user_id, telefone, students } = req.body;

      // Cria o Guardian
      const guardian = await Guardian.create({ user_id, telefone });

      // Associa estudantes se forem fornecidos
      if (students && students.length > 0) {
        await guardian.setStudents(students); // students = array de IDs
      }

      // Recarrega Guardian com estudantes associados
      const guardianWithStudents = await Guardian.findByPk(guardian.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nome', 'email', 'tipo']
          },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'matricula'],
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

      return res.status(201).json(guardianWithStudents);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 📌 Atualizar
  // 📌 Atualizar Guardian e estudantes associados
  async update(req, res) {
    try {
      const { id } = req.params;
      const { telefone, ativo, students } = req.body;

      const guardian = await Guardian.findByPk(id);

      if (!guardian) {
        return res.status(404).json({ error: 'Encarregado não encontrado' });
      }

      // Atualiza telefone e ativo
      await guardian.update({ telefone, ativo });

      // Atualiza associação de estudantes se fornecida
      if (students) {
        await guardian.setStudents(students); // students = array de IDs
      }

      // Recarrega Guardian com estudantes
      const guardianWithStudents = await Guardian.findByPk(guardian.id, {
        include: [
          { model: User, as: 'user', attributes: ['id', 'nome', 'email', 'tipo'] },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'matricula'],
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

      return res.json(guardianWithStudents);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 📌 Soft Delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      const guardian = await Guardian.findByPk(id);

      if (!guardian) {
        return res.status(404).json({ error: 'Encarregado não encontrado' });
      }

      await guardian.update({ ativo: false });

      return res.json({ message: 'Encarregado desativado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new GuardianController();
