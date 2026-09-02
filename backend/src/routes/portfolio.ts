import { Router } from 'express';
import * as c from '../controllers/portfolio';
import { auth } from '../middleware/auth';

const r = Router();

r.get('/public/:slug', c.publicPortfolio);

r.get('/', auth, c.getPortfolio);
r.post('/', auth, c.createPortfolio);
r.put('/', auth, c.updatePortfolio);

r.post('/publish', auth, c.publish);
r.post('/unpublish', auth, c.unpublish);

export default r;