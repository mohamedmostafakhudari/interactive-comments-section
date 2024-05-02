import { useState, useEffect, useReducer, createContext, useContext } from "react";
import { comments as data } from "../../data.js";

const Context = createContext();


const reducer = (state, action) => {
  switch(action.type) {
    case "add":
      const newComment = {
        id: crypto.randomUUID(),
        content: action.payload.content,
        createdAt: new Date(Date.now()).toString(),
        score: 1,
        user: action.payload.user,
        replies: [],
      }
      return [
        ...state,
        newComment,
      ];
    case "remove":
      if (action.payload.parentCommentId) {
        // another implementation but later when add sorting functionality
        // const comment = state.find(comment => comment.id === action.payload.parentCommentId);
        // return [
        //   ...state,
        //   {
        //     ...comment,
        //     replies: comment.replies.filter(reply => reply.id !== action.payload.id)
        //   }
        // ];
        const comments = state.map(comment => {
          if (comment.id === action.payload.parentCommentId) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== action.payload.id)
            }
          } else {
            return comment;
          }
        });

        return comments;
      } else {
        return state.filter(comment => comment.id !== action.payload.id);
      }
    case "reply":
      const newReply = {
        id: crypto.randomUUID(),
        content: action.payload.content,
        createdAt: new Date(Date.now()).toString(),
        score: 1,
        replyingTo: action.payload.replyingTo,
        user: action.payload.user,
      }
      if (action.payload.parentCommentId) {

        const comments = state.map(comment => {
          if (comment.id === action.payload.parentCommentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                newReply
              ]
            }
          } else {
            return comment;
          }
        });
  
        return comments;
      } else {
        const comments = state.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                newReply
              ]
            }
          } else {
            return comment;
          }
      });

      return comments;
      }
    case "edit":
      const updates = action.payload.updates;

      if (action.payload.parentCommentId) {
        const comments = state.map(comment => {
          if (comment.id === action.payload.parentCommentId) {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === action.payload.id) {
                  return {
                    ...reply,
                    ...updates,
                  }
                } else {
                  return reply;
                }
              })
            }
          } else {
            return comment;
          }
        });

        return comments;
      } else {
        const comments = state.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              ...updates,
            }
          } else {
            return comment;
          }
        });

        return comments;
      }
    default: 
      return state;
  }
};

const useCommentsProvider = () => {
  const initialState = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : data;
  const [comments, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  function handleAddComment({ content, user }) {
    dispatch({ type: "add", payload: { content, user }});
  }
  function handleRemove({ id, parentCommentId }) {
    dispatch({ type: "remove", payload: { id, parentCommentId }});
  }
  function handleReply({ id, parentCommentId, replyingTo, content, user }) {
    dispatch({ type: "reply", payload: { id, parentCommentId, replyingTo, content, user } });
  }
  function handleEdit({ id, parentCommentId, updates }) {
    dispatch({ type: "edit", payload: { id, parentCommentId, updates } });
  }
  function handleIncrementScore({ id, parentCommentId, updates }) {
    dispatch({ type: "edit", payload: { id, parentCommentId, updates } });
  }
  function handleDecrementScore({ id, parentCommentId, updates }) {
    dispatch({ type: "edit", payload: { id, parentCommentId, updates } });
  }
  
  return {
    comments,
    handleAddComment,
    handleRemove,
    handleReply,
    handleEdit,
    handleIncrementScore,
    handleDecrementScore
  }
}

export const CommentsDataProvider = ({ children }) => {
  // const [comments, setComments] = useState();
  // const [refetching, setRefetching] = useState(false);
  const { comments, ...rest } = useCommentsProvider();
  

  return (
    <Context.Provider value={{ comments, ...rest }}>
      {children}
    </Context.Provider>
  );
};

export const useComments = () => useContext(Context);