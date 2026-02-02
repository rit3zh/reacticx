type Brand<T, B extends string> = T & { readonly __brand: B };

type IRadians = Brand<number, "radians">;

interface IVec3 extends Readonly<{
  x: number;
  y: number;
  z: number;
}> {}

interface IUnitVec3 extends Brand<IVec3, "unit-vec3"> {}

interface IQuat extends Readonly<{
  x: number;
  y: number;
  z: number;
  w: number;
}> {}

interface IUnitQuat extends Brand<IQuat, "unit-quat"> {}

export type { IQuat, IUnitQuat, IVec3, IUnitVec3, IRadians };
