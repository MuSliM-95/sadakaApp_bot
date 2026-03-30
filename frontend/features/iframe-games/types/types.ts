
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Game = {
  id: number;
  title: string;
  url: string;
  img: string;
  description?: string;
  categories: Category[];
};

export interface IGameAdd {

  title: string;

  url: string;

  description: string;

  category: string;

  img: string;
}
