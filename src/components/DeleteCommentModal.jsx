import { createPortal } from "react-dom";

import Button from "./Button";

export default function DeleteCommentModal({ isOpen, setOpenModal, onDeleteComment }) {

  function handleCancel() {
    setOpenModal(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { commentId, replyId } = e.target.dataset; 
    onDeleteComment({ commentId, replyId });
    setOpenModal(false);
  }
  return createPortal(
    <div className={`fixed z-10 inset-0 bg-black/50 ${isOpen ? "block" : "hidden"}`}>
      <div className="container mx-auto px-4 grid place-items-center min-h-full">
        <form id="deleteModal" onSubmit={handleSubmit} className="bg-white p-6 rounded-md space-y-4">
          <h3 className="text-xl font-bold text-slate-700">Delete comment</h3>
          <p className="text-slate-500">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="flex items-center justify-center gap-3">
            <Button variation="regular" label="no, cancel" className={`text-white bg-slate-500`} onClick={handleCancel} type="button"/>
            <Button variation="regular" label="yes, delete" className={`text-white bg-red-400`} />
          </div>
        </form>
      </div>
    </div>,
    document.body.querySelector("#portal")
  )
}