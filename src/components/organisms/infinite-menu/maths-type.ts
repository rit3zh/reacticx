type Brand<T, B extends string> = T & { readonly __brand: B };

type Radians = Brand<number, "radians">;

interface Vec3 extends Readonly<{
  x: number;
  y: number;
  z: number;
}> {}

interface UnitVec3 extends Brand<Vec3, "unit-vec3"> {}

interface Quat extends Readonly<{
  x: number;
  y: number;
  z: number;
  w: number;
}> {}

interface UnitQuat extends Brand<Quat, "unit-quat"> {}

export type { Quat, UnitQuat, Vec3, UnitVec3, Radians };
