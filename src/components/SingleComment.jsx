import { Button, ListGroup } from "react-bootstrap";

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDMyNTIxODEsImV4cCI6MTcwNDQ2MTc4MX0.r3PxuLxmYTTXDVc_Qd-K6W-KWsMQr6eGzwuWKKAQf5M";

const SingleComment = ({ comment }) => {
  const deleteComment = async (movieId) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + movieId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Strive_Api_Key}`,
          },
        }
      );
      if (response.ok) {
        alert("Comment was deleted successfully!");
      } else {
        alert("Error - comment was NOT deleted!");
      }
    } catch (error) {
      alert("Error - comment was NOT deleted!");
    }
  };

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant="danger"
        className="ml-2"
        onClick={() => deleteComment(comment._id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
