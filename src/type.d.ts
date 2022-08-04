/*
 * @Author: tackchen
 * @Date: 2022-08-03 21:45:10
 * @Description: Coding something
 */
export interface IJson<T = any> {
  [prop: string]: T;
}

export interface IShape {
  draw(): void;
}

export class Shape implements IShape {
  draw(): void;
}

export interface IColor {
  fill(): void;
}