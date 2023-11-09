import { Article } from "../components/articles/model";
import { Source } from "../components/articles/types";

const mapArticlesFromApi = (articles: any[], source: string): Article[] => {
  if (source === Source.NewsAPI) {
    return articles.map((article: any) => {
      return {
        url: article.url,
        title: article.title,
        image: article.image,
        date: article.date,
        content: article.body,
        reporter: Source.NewsAPI,
      };
    });
  }

  if (source === Source.NewYorkTimes) {
    return articles.map((article: any) => {
      const image = article.multimedia.find(
        (item: any) => item.subtype === "popup"
      );
      const imagePath = image ? `https://www.nytimes.com/${image.url}` : " ";
      const date = article.pub_date.split("T")[0];

      return {
        url: article.web_url,
        title: article.abstract,
        image: imagePath,
        date,
        content: article.lead_paragraph,
        reporter: Source.NewYorkTimes,
      };
    });
  }

  return [];
};

export default mapArticlesFromApi;
