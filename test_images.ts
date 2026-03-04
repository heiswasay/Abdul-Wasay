async function test() {
  const routes = ['/images/profile.png', '/images/agnleads.PNG'];
  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      console.log(`${route} Status:`, res.status);
      console.log(`${route} Content-Type:`, res.headers.get('content-type'));
    } catch (e) {
      console.error(`${route} Error:`, e.message);
    }
  }
}
test();
