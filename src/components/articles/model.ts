export interface ArticlesModel {
  search: string;
  source: string;
  category: string;
  date: string;
}

export interface Article {
  url: string;
  title: string;
  image: string;
  date: string;
  content: string;
  reporter: string;
}
