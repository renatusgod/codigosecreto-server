import express from 'express';
import { authController, expectationController, shareController } from '../config/injections';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

// router.post('/api/users', usersController.register);
// // router.post('/api/users/login', usersController.login);
router.post('/v1/auth/register', (req, res) => authController.register(req, res));
router.post('/v1/auth/login', (req, res) => authController.login(req, res));
router.get('/v1/auth/investor', authMiddleware, (req, res) => authController.investor(req, res));
router.post('/v1/shares', authMiddleware, (req, res) => shareController.save(req, res));
router.get('/v1/shares', authMiddleware, (req, res) => shareController.getShares(req, res));
router.post('/v1/shares/:shareId/expectations', authMiddleware, (req, res) => expectationController.save(req, res));
router.get('/v1/shares/expectations', authMiddleware, (req, res) => expectationController.getExpectations(req, res));
// // router.post('/api/boards', authMiddleware, boardsController.createBoard);
// // router.get('/api/boards/:boardId', authMiddleware, boardsController.getBoard);
// // router.get('/api/boards/:boardId/columns', authMiddleware, columnsController.getColumns);
// // router.get('/api/boards/:boardId/tasks', authMiddleware, tasksController.getTasks);

export default router;
