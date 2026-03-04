import Schedule from '../models/Schedule.js';
import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';

class ScheduleController {

  /**
   * 📌 Criar horário
   * POST /schedules
   */
  async store(req, res) {
    try {
      const {
        class_id,
        teacher_id,
        disciplina,
        dia_semana,
        hora_inicio,
        hora_fim,
        sala
      } = req.body;

      const schedule = await Schedule.create({
        class_id,
        teacher_id,
        disciplina,
        dia_semana,
        hora_inicio,
        hora_fim,
        sala
      });

      return res.status(201).json(schedule);

    } catch (error) {

      // 🔥 Tratamento elegante de conflito
      if (error.message.includes('Conflito de horário')) {
        return res.status(400).json({
          error: error.message
        });
      }

      return res.status(400).json({
        error: error.message
      });
    }
  }

  /**
   * 📌 Listar todos horários
   * GET /schedules
   */
  async index(req, res) {
    try {
      const schedules = await Schedule.findAll({
        where: { ativo: true },
        include: [
          {
            association: 'class',
            attributes: ['id', 'nome']
          },
          {
            association: 'teacher',
            attributes: ['id']
          }
        ],
        order: [
          ['dia_semana', 'ASC'],
          ['hora_inicio', 'ASC']
        ]
      });

      return res.json(schedules);

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar horários'
      });
    }
  }

  /**
   * 📌 Buscar horário por ID
   * GET /schedules/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;

      const schedule = await Schedule.findByPk(id, {
        include: [
          {
            association: 'class',
            attributes: ['id', 'nome']
          },
          {
            association: 'teacher',
            attributes: ['id']
          }
        ]
      });

      if (!schedule) {
        return res.status(404).json({
          error: 'Horário não encontrado'
        });
      }

      return res.json(schedule);

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar horário'
      });
    }
  }

  /**
   * 📌 Atualizar horário
   * PUT /schedules/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const schedule = await Schedule.findByPk(id);

      if (!schedule) {
        return res.status(404).json({
          error: 'Horário não encontrado'
        });
      }

      await schedule.update(req.body);

      return res.json(schedule);

    } catch (error) {

      if (error.message.includes('Conflito de horário')) {
        return res.status(400).json({
          error: error.message
        });
      }

      return res.status(400).json({
        error: error.message
      });
    }
  }

  /**
   * 📌 Desativar horário (soft delete)
   * DELETE /schedules/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const schedule = await Schedule.findByPk(id);

      if (!schedule) {
        return res.status(404).json({
          error: 'Horário não encontrado'
        });
      }

      await schedule.update({ ativo: false });

      return res.json({
        message: 'Horário desativado com sucesso'
      });

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao desativar horário'
      });
    }
  }
}

export default new ScheduleController();
