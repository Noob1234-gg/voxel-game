// Perlin noise implementation for terrain generation

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function grad(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
  return ((h & 1 ? -u : u) + (h & 2 ? -v : v));
}

function perlin(x, y, z) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);

  const u = fade(x);
  const v = fade(y);
  const w = fade(z);

  const a = hash[X] + Y;
  const aa = hash[a] + Z;
  const ab = hash[a + 1] + Z;
  const b = hash[X + 1] + Y;
  const ba = hash[b] + Z;
  const bb = hash[b + 1] + Z;

  return lerp(w,
      lerp(v,
          lerp(u, grad(hash[aa], x, y, z), grad(hash[ba], x - 1, y, z)),
          lerp(u, grad(hash[ab], x, y - 1, z), grad(hash[bb], x - 1, y - 1, z))),
      lerp(v,
          lerp(u, grad(hash[aa + 1], x, y, z - 1), grad(hash[ba + 1], x - 1, y, z - 1)),
          lerp(u, grad(hash[ab + 1], x, y - 1, z - 1), grad(hash[bb + 1], x - 1, y - 1, z - 1)))
      )
  );
}

// Example hash array
const hash = [...Array(512)].map((_, i) => i).sort(() => Math.random() - 0.5);
for (let i = 0; i < 256; i++) {
  hash[i + 256] = hash[i];
}

// Export the perlin function for use
export default perlin;
