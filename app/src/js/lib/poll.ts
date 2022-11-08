export default interface Poll {
  id: number;
  title: string;
  options: Array<Option>;
  closed: boolean;
}

export interface Option {
  id: number;
  text: string;
}
