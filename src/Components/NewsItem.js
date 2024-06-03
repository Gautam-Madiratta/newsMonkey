import React from "react";

// export default class NewsItem extends Component {
export default function NewsItem(props){
  let { title, description, imageUrl, newsUrl, author, date,source } = props;
  // render() {
    return (
      <div className="card my-2">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <span className="badge rounded-pill text-bg-danger">{source}</span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toUTCString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
// }
