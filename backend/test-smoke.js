(async () => {
  const base = 'http://localhost:3000';
  const log = (label, r, body) => console.log(label, r.status || r, JSON.stringify(body));
  try {
    // GET /
    let r = await fetch(base + '/');
    let j = await r.text();
    console.log('GET / ->', r.status, j);

    // GET /vejboder
    r = await fetch(base + '/vejboder');
    j = await r.json();
    console.log('GET /vejboder ->', r.status, Array.isArray(j) ? `${j.length} items` : j);

    // POST /vejboder
    r = await fetch(base + '/vejboder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ navn: 'smoke-test', lat: 0.1, lng: 0.2, produkter: ['smoke'], åbningstider: 'Man-fre 09:00-17:00', ejer_id: 1 }),
    });
    j = await r.json();
    console.log('POST /vejboder ->', r.status, j);
    const id = j.id;

    // PUT /vejboder/:id
    r = await fetch(base + '/vejboder/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ navn: 'smoke-updated', lat: 0.3, lng: 0.4, produkter: ['smoke','updated'], åbningstider: 'Lør-søn 10:00-14:00' }),
    });
    j = await r.json();
    console.log('PUT /vejboder/:id ->', r.status, j);

    // DELETE /vejboder/:id
    r = await fetch(base + '/vejboder/' + id, { method: 'DELETE' });
    j = await r.json();
    console.log('DELETE /vejboder/:id ->', r.status, j);

  } catch (err) {
    console.error('Smoke test error', err);
    process.exit(2);
  }
})();
