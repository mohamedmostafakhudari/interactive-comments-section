import { useState, useRef } from "react";


import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { useComments } from "../contexts/CommentsProvider";

import ProfileImage from "./ProfileImage";
import Button from "./Button";
import TextArea from "./TextArea";

export default function CommentInput() {

	const inputRef = useRef(null);
	const currentUser = useCurrentUser();
	const { handleAddComment } = useComments();
	function handleChange(e) {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!inputRef.current) return;
		handleAddComment({ user: currentUser, content: inputRef.current.value});
		inputRef.current.value = "";
	}
	return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md mt-4 space-y-4">
			<TextArea ref={inputRef} name="newcomment" id="newcomment" className="text-lg font-medium placeholder-slate-500 no-scroll" onChange={handleChange} placeholder="Add a comment..." />
			<div className="flex items-center justify-between">
				<ProfileImage url={currentUser?.image?.png}/>
        <Button variation="regular" label="send" className="text-white bg-blue-700" />
			</div>
		</form>
  )
}
// async function addNewComment(newComment) {
// 	try {
// 		const response = await fetch(`http://localhost:3000/comments`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(newComment),
// 		});
// 	} catch(err) {
// 		console.log(err);
// 	}
// }