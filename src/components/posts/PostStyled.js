import styled from "styled-components";

export const User = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserContext = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const FollowButton = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: rgb(90, 130, 242);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: rgb(119, 153, 247);
  }
`;

export const ImageInput = styled.input`
  display: block;
  width: 180px;
  margin: auto;
  text-align: center;
  color: white;
`;

export const Textarea = styled.textarea`
  margin: auto;
  display: block;
  width: calc(100% - 20px);
  resize: none;
  outline: none;
  border: none;
  font-family: "Work Sans", sans-serif;
  font-size: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: #5f6e78;
  color: white;
  margin-bottom: 20px;
  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : "#bbb"};
  }
`;

export const PostButton = styled.button`
  background-color: white;
  border: none;
  width: 100%;
  padding: 10px;
  font-weight: bold;
  font-size: 17px;
  color: #455966;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ddd;
  }
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
  margin: 0;
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form``;

export const PostImage = styled.img`
  width: 100%;
  max-height: 450px;
  min-height: 200px;
  object-fit: cover;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
export const Profile = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: 20px;
  cursor: pointer;
`;

export const Info = styled.div``;

export const Name = styled.p`
  cursor: pointer;

  font-size: 20px;
  color: white;
  font-weight: 500;
  margin: 0;
`;
export const Date = styled.p`
  font-size: 14px;
  color: #ddd;
  font-weight: 500;
  margin: 0;
  margin-top: 7px;
`;

export const Interaction = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperInteraction = styled.div`
  display: flex;
  align-items: center;
`;

export const PostDescription = styled.p`
  color: white;
  font-size: 17px;
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const Count = styled.p`
  color: white;
  margin: 0;
  text-align: center;
`;

// Comment section
export const CommentsOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.31);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const CommentField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CommentProfile = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: 20px;
`;

export const ErrMessage = styled.p`
  color: white;
`;

export const CommentsList = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const CommentContext = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`;

export const Block = styled.div``;

export const CommentorProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const CommentorSubProfile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export const InfoBlock = styled.p`
  width: 250px;
  margin: 0;
`;

export const Username = styled.span`
  color: white;
`;

export const Time = styled.span`
  color: #bbb;
  font-size: 13px;
`;

export const CommentDesc = styled.p`
  margin: 0;
  font-size: 15px;
  width: 250px;
  color: #ddd;
`;

export const SubCommentDescript = styled.p`
  margin: 0;
  font-size: 15px;
  width: 190px;
  color: #ddd;
`;

export const CommentButtons = styled.div`
  color: #ccc;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 7px;
  margin-right: 10px;
`;

export const Xmark = styled.p`
  position: absolute;
  top: -30px;
  right: -15px;
  background: #707180;
  padding: 7px 11px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  color: white;
`;

export const ReplyCommentCreator = styled.form``;

export const ReplyLine = styled.div`
  display: flex;
  justify-content: space-between;
  background: #b2b3c2;
  color: #4b4b4d;
  padding: 6px;
  border-radius: 10px;
  align-items: center;
`;

export const ReplyInput = styled.input`
  width: 80%;
  background: transparent;
  border: none;
  outline: none;
`;

export const SubCommentsList = styled.div`
  margin-left: 55px;
`;

export const Grouper = styled.div`
  display: flex;
`;
