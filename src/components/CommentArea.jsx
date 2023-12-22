import { Component } from "react";
import CommentList from "./CommentList";
import AggiungiComment from "./AggiungiComment";
import Loading from "./Loading";

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDMyNTIxODEsImV4cCI6MTcwNDQ2MTc4MX0.r3PxuLxmYTTXDVc_Qd-K6W-KWsMQr6eGzwuWKKAQf5M";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.imdbID,
        {
          headers: {
            Authorization: `Bearer ${Strive_Api_Key}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        console.log("error");
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        <AggiungiComment imdbID={this.props.imdbID} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
