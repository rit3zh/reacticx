import { vec3Normalize, vec3Scale } from "./maths";
import type { Vec3 } from "./maths-type";

const generateIcosahedronVertices = <T extends number, R extends number>(
  subdivisions: T,
  radius: R,
): Vec3[] => {
  const t = (1 + Math.sqrt(5)) / 2;
  const vertices: Vec3[] = [
    { x: -1, y: t, z: 0 },
    { x: 1, y: t, z: 0 },
    { x: -1, y: -t, z: 0 },
    { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t },
    { x: 0, y: 1, z: t },
    { x: 0, y: -1, z: -t },
    { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 },
    { x: t, y: 0, z: 1 },
    { x: -t, y: 0, z: -1 },
    { x: -t, y: 0, z: 1 },
  ];

  let faces: number[][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const midPointCache: Record<string, number> = {};

  const getMidPoint = (a: number, b: number): number => {
    const key = a < b ? `${a}_${b}` : `${b}_${a}`;
    if (midPointCache[key] !== undefined) return midPointCache[key];
    const va = vertices[a],
      vb = vertices[b];
    vertices.push({
      x: (va.x + vb.x) / 2,
      y: (va.y + vb.y) / 2,
      z: (va.z + vb.z) / 2,
    });
    midPointCache[key] = vertices.length - 1;
    return vertices.length - 1;
  };

  for (let i = 0; i < subdivisions; i++) {
    const newFaces: number[][] = [];
    for (const f of faces) {
      const a = getMidPoint(f[0], f[1]);
      const b = getMidPoint(f[1], f[2]);
      const c = getMidPoint(f[2], f[0]);
      newFaces.push([f[0], a, c], [f[1], b, a], [f[2], c, b], [a, b, c]);
    }
    faces = newFaces;
  }

  return vertices.map((v) => {
    const n = vec3Normalize(v);
    return vec3Scale(n, radius);
  });
};

export { generateIcosahedronVertices };
