import { useState, useRef } from "react";

import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { useComments } from "../contexts/CommentsProvider";

import ProfileImage from "./ProfileImage";
import Button from "./Button";
import DeleteCommentModal from "./DeleteCommentModal";
import Plus from "../assets/images/icon-plus.svg";
import Minus from "../assets/images/icon-minus.svg";
import TextArea from "./TextArea";
import { formatDate } from "../utils";
export default function CommentSection() {
	const currentUser = useCurrentUser();
	const { comments, handleRemove } = useComments();
	const [openModal, setOpenModal] = useState(false);
	if (!comments) {
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
				parentCommentId={null}
				currentUser={currentUser}
				setOpenModal={setOpenModal}
			/>
		);
	});

	return (
		<article>
			<ul className="space-y-6">{list}</ul>
			<DeleteCommentModal isOpen={openModal} setOpenModal={setOpenModal} onDeleteComment={({ id, parentCommentId }) => handleRemove({ id, parentCommentId})}/>
		</article>
	);
}

const Comment = ({ comment, parentCommentId, currentUser, setOpenModal }) => {
	// available modes ( read || reply || edit )
	const [mode, setMode] = useState("read");

	const { handleReply, handleEdit, handleIncrementScore, handleDecrementScore } = useComments();

	const isCurrentUser = comment.user.username === currentUser.username;
	const isReply = parentCommentId !== null;
	const replies = comment?.replies?.map((reply) => (
		<Comment
			key={reply.id}
			comment={reply}
			parentCommentId={comment.id}
			currentUser={currentUser}
			setOpenModal={setOpenModal}
		/>
	));

	function handleOpenDeleteModal(e) {
		const deleteModal = document.querySelector("#deleteModal");
		
		deleteModal.dataset.parentCommentId = "";
		deleteModal.dataset.id = "";

		deleteModal.dataset.parentCommentId = parentCommentId ? parentCommentId : "";
		deleteModal.dataset.id = comment.id;
		setOpenModal(true);
	}
	function onEdit(updatedComment) {
		
		let updates;

		if (parentCommentId) {
			const matchFound = updatedComment.match(/^@(\w+)/);
			const replyingTo = matchFound ? matchFound[1] : comment.replyingTo;
			const content = matchFound ? updatedComment.slice(updatedComment.indexOf(" ") + 1) : updatedComment;

			updates = {
				content,
				replyingTo
			}
		} else {
			updates = {
				content: updatedComment,
			}
		}
		handleEdit({ id: comment.id, parentCommentId, updates })
		setMode("read");
	}

	return (
		<li className="">
			<div className="relative z-10 bg-white space-y-4 text-slate-500 p-4 rounded-md">
				<div className="flex flex-col md:flex-row md:gap-6 md:items-start">
					<Score score={comment.score} className="hidden md:flex shrink-0" onIncrementScore={() => handleIncrementScore({ id: comment.id, parentCommentId, updates: { score : comment.score + 1}})} onDecrementScore={() => handleDecrementScore({ id: comment.id, parentCommentId, updates: { score : comment.score - 1}})} />
					<div className="space-y-4 flex-1">
						<CommentHeader imgSrc={comment.user.image.png} username={comment.user.username} createdAt={comment.createdAt} isCurrentUser={isCurrentUser} mode={mode} setMode={setMode} onOpenDeleteModal={handleOpenDeleteModal} />
						{mode === "edit" && isCurrentUser ? (
							<EditBox content={comment.content} isReply={isReply} replyingTo={comment.replyingTo} onEdit={onEdit}/>
						): (
							<CommentContent content={comment.content} replyingTo={comment.replyingTo} isReply={isReply} />
						)}
					</div>
				</div>
				<CommentFooter score={comment.score} isCurrentUser={isCurrentUser} mode={mode} setMode={setMode} className="md:hidden" onOpenDeleteModal={handleOpenDeleteModal} onIncrementScore={() => handleIncrementScore({ id: comment.id, parentCommentId, updates: { score : comment.score + 1}})} onDecrementScore={() => handleDecrementScore({ id: comment.id, parentCommentId, updates: { score : comment.score - 1}})} />
			</div>
			
			{!isCurrentUser && <ReplyBox comment={comment} currentUser={currentUser} mode={mode} setMode={setMode} onReply={({ replyingTo, content }) => handleReply({ id: comment.id, parentCommentId, replyingTo, content, user: currentUser})} />}
			{!isReply && (
				<div className="border-l border-slate-300">
					<ul className="mt-4 ml-4 space-y-4">{replies}</ul>
				</div>
			)}
		</li>
	);
};

function CommentHeader({ imgSrc, username, createdAt, isCurrentUser, mode, setMode, onOpenDeleteModal }) {
	const date = formatDate(createdAt);
	return (
		<div className="flex items-center justify-between">
			<div className={`flex items-center gap-2 flex-wrap`}>
				<ProfileImage url={imgSrc}/>
				<div className="flex items-center gap-2 flex-auto sm:flex-initial">
					<h4 className={`font-bold text-lg text-slate-700`}>{username}</h4>
					{isCurrentUser && <span className="bg-blue-700 text-white px-2 py-1 rounded-sm leading-[14px] text-sm font-bold">you</span>}
				</div>
				<span className={``}>{date}</span>
			</div>
			<div className="hidden md:flex">
				{!isCurrentUser ? (
					<Button variation="link" label="Reply" icon="./assets/images/icon-reply.svg" onClick={() => setMode(prev => prev === 'reply' ? 'read' : 'reply')} className={`text-blue-700`} data-state = {mode === "reply" ? "active" : "idle"} />
				) : (
						<div className="flex items-center gap-4 flex-col xs:flex-row">
							<Button variation="link" label="Delete" icon="./assets/images/icon-delete.svg" onClick={onOpenDeleteModal} className={`text-red-400`}/>
							<Button variation="link" label="Edit" icon="./assets/images/icon-edit.svg" onClick={() => setMode("edit")} className={`text-blue-700`}/>
						</div>
					)}
			</div>
		</div>
	)
}

function CommentContent({ content, replyingTo, isReply }) {
	return (
		<div className="relative">
			<p>
				{isReply && <span className="text-blue-700 font-bold mr-1">@{replyingTo}</span>}
				{content}
			</p>
	</div>

	)
}

function CommentFooter({ score, isCurrentUser, mode, setMode, onOpenDeleteModal, className, onIncrementScore, onDecrementScore }) {
	return (
		<div className={`flex items-center justify-between ${className}`}>
			<Score score={score} onIncrementScore={onIncrementScore} onDecrementScore={onDecrementScore}/>
			{!isCurrentUser ? (
				<Button variation="link" label="Reply" icon="./assets/images/icon-reply.svg" onClick={() => setMode(prev => prev === 'reply' ? 'read' : 'reply')} className={`text-blue-700`} data-state = {mode === "reply" ? "active" : "idle"}/>
			) : (
				mode === "edit" ? (
					<Button variation="regular" label="update" form="updateCommentForm" className={`bg-blue-700 text-white`}/>
				) : (
					<div className="flex items-center gap-4 flex-col xs:flex-row">
						<Button variation="link" label="Delete" icon="./assets/images/icon-delete.svg" onClick={onOpenDeleteModal} className={`text-red-400`}/>
						<Button variation="link" label="Edit" icon="./assets/images/icon-edit.svg" onClick={() => setMode("edit")} className={`text-blue-700`}/>
					</div>
				)
			)}
		</div>
	)
}
function ReplyBox({ comment, currentUser, mode, onReply}) {
	const [reply, setReply] = useState(`@${comment.user.username}, `);

	const slideDownStyling = "max-h-[300px] py-4 opacity-100";
	const slideUpStyling = "max-h-0 py-0 opacity-0";

	function handleSubmit(e) {
		e.preventDefault();
		const matchFound = reply.match(/^@(\w+)/);
		const replyingTo =  matchFound ? matchFound[1] : comment.user.username;
		const replyContent = matchFound ? reply.slice(reply.indexOf(" ") + 1) : reply;

		onReply({ replyingTo, content: replyContent });
	}
  return (
  <form onSubmit={handleSubmit} className={`bg-white flex flex-col gap-4 rounded-md px-4 mt-2 text-slate-700 duration-200 ease-in-out md:flex-row ${mode === 'reply' ? slideDownStyling : slideUpStyling }`}>
    <ProfileImage url={currentUser.image.png} />
		<TextArea name="newreply" id="newreply" value={reply} onChange={(e) => setReply(e.target.value)} className="" />
    <Button variation="regular" label="reply" className={`bg-blue-700 text-white self-start`} />
  </form>
  );
}

function EditBox({ content, isReply, replyingTo, onEdit }) {
	const [currentComment, setCurrentComment] = useState(`${isReply ? `@${replyingTo}` : ""} ${content}`);

	function handleSubmit(e) {
		e.preventDefault();
		onEdit(currentComment);
	}
	return (
		<form id="updateCommentForm" onSubmit={handleSubmit} className="md:space-y-3">
			<TextArea name="updateComment" id="updateComment" value={currentComment} onChange={(e) => setCurrentComment(e.target.value)} className="" />
			<Button variation="regular" label="update" className={`bg-blue-700 text-white hidden md:block md:ml-auto`}/>
		</form>
	)
}
const Score = ({ score, className, onIncrementScore, onDecrementScore }) => {
	return (
		<div className={`flex rounded-xl overflow-hidden bg-slate-100 w-fit text-lg md:flex-col ${className}`}>
			<button onClick={onIncrementScore} className="grid place-items-center group">
				<div className="text-slate-400 duration-200 ease-in-out px-6 group-hover:text-blue-700 md:px-4 md:py-4">
					<Plus fill="currentColor"/>
				</div>
			</button>
			<span className="font-bold text-blue-700 py-3 mx-auto md:py-0">{score}</span>
			<button onClick={onDecrementScore} className="grid place-items-center group">
				<div className="text-slate-400 duration-200 ease-in-out px-6 group-hover:text-blue-700 md:px-4 md:py-4">
					<Minus fill="currentColor"/>
				</div>
			</button>
		</div>
	);
};