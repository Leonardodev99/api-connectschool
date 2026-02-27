import User from '../models/User.js';

class UserController {
  /**
   * Criar utilizador
   * POST /users
   */
  async store(req, res) {
    try {
      const { nome, email, senha, tipo } = req.body;

      // Verificar se email já existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const user = await User.create({
        nome,
        email,
        senha,
        tipo
      });

      return res.status(201).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        ativo: user.ativo
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Listar todos utilizadores
   * GET /users
   */
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email', 'tipo', 'ativo', 'created_at']
      });

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar utilizadores' });
    }
  }

  /**
   * Mostrar um utilizador
   * GET /users/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'tipo', 'ativo', 'created_at']
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar utilizador' });
    }
  }

  /**
   * Atualizar utilizador
   * PUT /users/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, tipo, ativo } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado' });
      }

      // Verificar email duplicado
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ error: 'Email já está em uso' });
        }
      }

      await user.update({
        nome,
        email,
        senha,
        tipo,
        ativo
      });

      return res.json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        ativo: user.ativo
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Remover utilizador
   * DELETE /users/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado' });
      }

      await user.destroy();

      return res.json({ message: 'Utilizador removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover utilizador' });
    }
  }
}

export default new UserController();
