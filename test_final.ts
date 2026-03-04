async function test() {
  const routes = ['/api/images', '/images/profile.png'];
  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      console.log(`${route} Status:`, res.status);
    } catch (e) {
      console.error(`${route} Error:`, e.message);
    }
  }
}
test();
