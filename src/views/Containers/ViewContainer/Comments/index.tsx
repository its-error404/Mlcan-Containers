import React, { useState, useEffect } from "react";
import { addComment, fetchCommentsData } from "../../../../services/ContainersService/viewcontainer.service";
import "./Comments.scss";
import { CommentsData } from "../../../../models/comments.model";
import { Button, Input, Pagination } from "antd";
const CommentsComponent = () => {
  const [commentsData, setCommentsData] = useState<CommentsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommentsData();
        setCommentsData(data as CommentsData | null);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddComment = async () => {
    const inputElement = document.querySelector(".comments-input") as HTMLInputElement;
    const commentText = inputElement.value;
      try {
        await addComment(commentText);
        const updatedData = await fetchCommentsData();
        setCommentsData(updatedData as CommentsData | null);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
  };

  return (
    <div className="comments-main">
      <div className="comments-flex">
       
        <Input
          about="comments"
          placeholder="Type your comment"
          size="large"
          className="comments-input"
        />
        <Button className="comments-add" onClick={handleAddComment}>Add Comment</Button>
      </div>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : commentsData && commentsData.docs && commentsData.docs.length > 0 ? (
        <div>
          
          {commentsData.docs?.map((comment, index: number) => (
            <div key={comment.id} className="comment-card">
              
              <div className="comment-header">
                
                <div
                  className="comment-initials"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  
                  {comment.commenter?.name
                    ?.split(" ")
                    .map((namePart: string) => namePart.charAt(0))
                    .join("")}{" "}
                </div>{" "}
                <div className="comment-info">
                  {" "}
                  <div className="comment-name">
                    {comment.commenter?.name}
                  </div>
                  <div className="comment-date">
                    
                    {comment.createdAt
                      ? formatDate(comment.createdAt)
                      : ""}
                  </div>
                </div>
              </div>
              <div className="comment-content"> {comment.comment} </div>
              <div className="comment-see-more"> </div> {<br />} {<hr />}
            </div>
          ))}
          <Pagination
            current={currentPage}
            total={commentsData.docs.length}
            pageSize={commentsPerPage}
            onChange={handlePageChange}
            className="comments-pagination"
          />
        </div>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};
export default CommentsComponent;
