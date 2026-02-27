import Message from '../models/Message.js';
import User from '../models/User.js';

class MessageController {
  /**
   * 📤 Enviar mensagem
   * POST /messages
   */
  async store(req, res) {
    try {
      const { sender_id, receiver_id, content } = req.body;

      if (!sender_id || !receiver_id || !content) {
        return res.status(400).json({
          error: 'sender_id, receiver_id e content são obrigatórios',
        });
      }

      // Validação extra (opcional, mas clara)
      if (sender_id === receiver_id) {
        return res.status(400).json({
          error: 'Não é possível enviar mensagem para si mesmo',
        });
      }

      const message = await Message.create({
        sender_id,
        receiver_id,
        content,
      });

      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  /**
   * 📥 Inbox (mensagens recebidas)
   * GET /messages/inbox/:userId
   */
  async inbox(req, res) {
    try {
      const { userId } = req.params;

      const messages = await Message.findAll({
        where: { receiver_id: userId },
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'nome', 'email'],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      if (messages.length === 0) {
        return res.json({
          message: 'Nenhuma mensagem recebida',
          data: [],
        });
      }

      return res.json(messages);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar inbox',
        details: error.message,
      });
    }
  }

  /**
   * ✅ Marcar mensagem como lida
   * PUT /messages/:id/read
   */
  async markAsRead(req, res) {
    try {
      const { id } = req.params;

      const message = await Message.findByPk(id);

      if (!message) {
        return res.status(404).json({
          error: 'Mensagem não encontrada',
        });
      }

      if (message.read === true) {
        return res.json({
          message: 'Mensagem já estava marcada como lida',
        });
      }

      await message.update({ read: true });

      return res.json({
        message: 'Mensagem marcada como lida com sucesso',
        data: message,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao marcar mensagem como lida',
        details: error.message,
      });
    }
  }
}

export default new MessageController();
