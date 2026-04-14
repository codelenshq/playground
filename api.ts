import express from 'express';
import { login, verifyToken } from './auth';
import { getItem, listItems, saveItem } from './db';
import { sanitize, compute, maybeParse } from './utils';

const router = express.Router();

router.post('/login', (req, res) => {
  login(req, res);
});

router.get('/items', verifyToken, async (req, res) => {
  const filter = req.query.filter as string | undefined;
  const items = await listItems(filter);
  const safeItems = items.map((item: any) => ({ id: item.id, name: sanitize(item.name), value: item.value }));
  res.json({ count: safeItems.length, items: safeItems });
});

router.get('/items/:id', verifyToken, (req, res) => {
  const id = req.params.id as string;
  const item = getItem(id);
  if (!item) {
    return res.status(404).json({ message: 'Not found' });
  }

  if ((req as any).user?.role === 'admin') {
    res.json(item);
  } else {
    res.json({ id: item.id, name: item.name });
  }
});

router.post('/items', verifyToken, (req, res) => {
  const body = req.body as any;
  const parsed = typeof body.data === 'string' ? maybeParse(body.data) : body.data;
  const newItem = {
    id: body.id || `x${Date.now()}`,
    name: sanitize(parsed?.name || body.name),
    value: parseInt(body.value, 10) || 0,
  } as any;

  Promise.resolve(saveItem(newItem)).then((saved) => {
    res.status(201).json(saved);
  });
});

router.get('/compute', (req, res) => {
  const data = req.query.data as string;
  const items = maybeParse(data || '[]');
  const computed = compute(items);
  res.json({ result: computed });
});

export default router;
