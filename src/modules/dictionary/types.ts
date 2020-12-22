/** Тип ценной бумаги */
export interface ISecurityType {
  id: number;
  name: string;
  title: string;
}

/** Торговая система */
export interface IEngine {
  id: number;
  name: string;
  title: string;
}
