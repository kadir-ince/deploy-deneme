const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3565;

// 1) Gzip sıkıştırılmış dosyaları doğru MIME türleriyle sun
app.get('*.gz', (req, res, next) => {
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Vary', 'Accept-Encoding');

  if (req.url.endsWith('.wasm.gz')) {
    res.setHeader('Content-Type', 'application/wasm');
  } else if (req.url.endsWith('.js.gz')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (req.url.endsWith('.data.gz')) {
    res.setHeader('Content-Type', 'application/octet-stream');
  }

  next();
});

// 2) Statik dosyaları servis et
app.use('/Build', express.static(path.join(__dirname, 'Build')));
app.use(express.static(path.join(__dirname)));

// 3) Tüm istekleri "index.html"e yönlendir
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4) Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});