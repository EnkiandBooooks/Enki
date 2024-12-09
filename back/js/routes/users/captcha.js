import { Router } from 'express';
import { login } from '../../controllers/users/captcha.js';

const router = Router();

router.post('/login', login);

export default router;
