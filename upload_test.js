const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

(async () => {
  const form = new FormData();
  form.append('image', fs.createReadStream('test_image.png'));

  const res = await fetch('http://localhost:3000/api/upload', { method: 'POST', body: form });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log(text);
})();
