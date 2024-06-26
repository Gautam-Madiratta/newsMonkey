import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// export default class News extends Component {
export default function News(props){

  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(false);
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0);

  const capitalizeFirstLetter = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true)
    props.setProgress(10);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  
    props.setProgress(100);
  }

 useEffect(()=>
  {
    document.title = `${capitalizeFirstLetter(
      props.category
    )} | NewsMonkey`;
  updateNews();
  },[])

  //input: when the input changes the use effect works

  // async componentDidMount() {
  //   this.updateNews();
  // }

  // handleNextPage = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // handlePreviousPage = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    // this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  };

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{marginTop: "90px"}}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Category Headlines
        </h2>
        {loading && <Spinner/>}

        {/* !this.state.loading && */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://img.icons8.com/?size=50&id=12452&format=png&color=000000"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousPage}
          >
            &larr; Previous Page
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            &rarr; Next Page
          </button>
        </div> */}

      </div>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: "8",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
