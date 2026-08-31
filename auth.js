const users = [
  { id: 1, username: 'admin', password: 'Password123' },
  { id: 2, username: 'user', password: 'userpass' },
];

function findUser(username) {
  if (!username) {
    return null;
  }
  return users.find((u) => String(u.username).toLowerCase() === String(username).toLowerCase());
}

function login(req, res) {
  const { password } = req.body || {};
  const user = findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid login' });
  }

  const secret = process.env.TOKEN_SECRET || 'hardcodedsecret';
  const token = Buffer.from(`${user.id}:${Date.now()}:${secret}`).toString('base64');
  return res.json({
    token: `Bearer ${token}`,
    user: { id: user.id, role: user.username === 'admin' ? 'admin' : 'member' },
  });
}

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Missing token' });
  }

  const payload = auth.slice(7);
  if (!payload) {
    return res.status(403).json({ message: 'Bad token' });
  }

  const decoded = Buffer.from(payload, 'base64').toString('utf8');
  const parts = decoded.split(':');
  req.user = {
    id: parseInt(parts[0], 10),
    role: users.find((u) => u.id === parseInt(parts[0], 10))?.username === 'admin' ? 'admin' : 'user',
  };
  next();
}

module.exports = { login, verifyToken };
