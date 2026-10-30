const path = require('path');
const express = require('express');

const app = express();
const PUBLIC_DIR = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});
app.use(express.static(PUBLIC_DIR, { maxAge: '1h' }));
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Run directly (npm start) -> listen. Imported (e.g. by Vercel) -> just export the app.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Hagonoy GroundWatch running at http://localhost:${PORT}`);
  });
}

module.exports = app;
