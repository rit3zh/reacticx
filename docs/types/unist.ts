export interface UnistNode {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __src__?: string;
    __style__?: string;
    className?: string[];
    [key: string]: unknown;
  };
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}

export interface UnistTree {
  type: string;
  children: UnistNode[];
}
