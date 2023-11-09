import React, { useState, useEffect } from "react";
import axios from "axios";
import mapArticlesFromApi from "../../mappers/articlesFromApi";
import { ENDPOINTS } from "../../constants/endpoints";
import { Source } from "./types";
import { Article, ArticlesModel } from "./model";
import "./articles.scss";

const Articles = ({ search, source, category, date }: ArticlesModel) => {
  const [hint, setHint] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const CHOOSE_FILTERS = "Select a source and category to load news";
  const LOADING = "Loading...";
  const NO_ARTICLES = "No articles match these filters";

  useEffect(() => {
    fetchArticles();
  }, [source, category, date, search]);

  const fetchArticles = () => {
    if (!source && !category) {
      setHint(CHOOSE_FILTERS);
      return;
    }

    setHint(LOADING);

    setTimeout(() => {
      if (source === Source.NewsAPI) {
        fetchNewsAPIArticles();
      } else if (source === Source.NewYorkTimes) {
        fetchNewYorkTimesArticles();
      }
    }, 1000);
  };

  async function fetchNewsAPIArticles() {
    console.log("fetchNewsAPIArticles");
    try {
      let params = {
        keyword: search || " ",
        apiKey: ENDPOINTS.NEWS_API.KEY,
        dateStart: date || null,
        dateEnd: date || null,
        page: 0,
      };

      const response = await axios.get(ENDPOINTS.NEWS_API.URL, { params });
      const articles = mapArticlesFromApi(
        response.data.articles.results,
        source
      );
      console.log({ articles });
      setArticles(articles);

      if (articles.length === 0) {
        setHint(NO_ARTICLES);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  async function fetchNewYorkTimesArticles() {
    const params = {
      q: search || null,
      section_name: category || null,
      begin_date: date || null,
      end_date: date || null,
      page: 0,
      "api-key": ENDPOINTS.NEW_YORK_TIME.KEY,
    };

    try {
      const response = await axios.get(ENDPOINTS.NEW_YORK_TIME.URL, { params });
      const articles = mapArticlesFromApi(response.data.response.docs, source);
      setArticles(articles);

      if (!articles.length) {
        setHint(NO_ARTICLES);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  const getTrimedText = (text: string, limit: number) => {
    const words = text.split(" ");
    let str = "";

    for (const word of words) {
      if ((str + word).length < limit) {
        str += " " + word;
      } else {
        return str.trim() + "...";
      }
    }

    return str.trim() + "...";
  };

  return (
    <div id="articles">
      {articles && (
        <ul>
          {articles.map((article: Article, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setExpandedItem(idx)}
              onMouseLeave={() => setExpandedItem(null)}
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={article.image}
                  alt=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://placehold.co/300x200?text=IMAGE+NOT+FOUND";
                  }}
                />
                <small className="reporter">{article.reporter}</small>
                <div>
                  <span className="date">{article.date}</span>
                  <h2 className="title">{article.title}</h2>
                  <p>
                    {getTrimedText(
                      article.content,
                      expandedItem === idx ? 350 : 150
                    )}
                  </p>
                  <button>read more</button>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
      {!articles.length && <div id="hint">{hint}</div>}
    </div>
  );
};

export default Articles;
