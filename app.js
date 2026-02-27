import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';

import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import studentRoutes from './src/routes/studentRoutes';
import teacherRoutes from './src/routes/teacherRoutes';
import materialRoutes from './src/routes/materialRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import submissionsRoutes from './src/routes/submissionsRoutes.js';
import gradeRoutes from './src/routes/gradeRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';



class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/teachers', teacherRoutes);
    this.app.use('/materials', materialRoutes);
    this.app.use('/tasks', taskRoutes);
    this.app.use('/submissions', submissionsRoutes);
    this.app.use('/grades', gradeRoutes);
    this.app.use('/messages', messageRoutes);

  }
}

export default new App().app;
