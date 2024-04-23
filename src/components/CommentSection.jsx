import React from "react";
import useFetch from "../hooks/useFetch";
const CommentSection = ({ currentUser }) => {
	const { data: comments, error, loading } = useFetch("http://localhost:3000/comments");
	if (error) {
		console.log(error);
	}

	if (loading) {
		return (
			<article>
				<p>Loading...</p>
			</article>
		);
	}
	const list = comments.map((comment) => {
		return (
			<Comment
				key={comment.id}
				comment={comment}
				currentUser={currentUser}
			/>
		);
	});
	return (
		<article>
			<ul>{list}</ul>
		</article>
	);
};

const Comment = ({ comment, currentUser }) => {
	return (
		<li>
			<div>
				<img
					src={comment.user.image.png}
					alt=""
				/>
			</div>
		</li>
	);
};
export default CommentSection;
