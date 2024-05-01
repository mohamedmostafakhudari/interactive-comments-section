import { forwardRef } from "react";

const TextArea = forwardRef(function({ name, id, value, className, onChange, ...props}, ref) {
  return (
    <textarea name={name} id={id} ref={ref} cols="30" value={value} onChange={onChange} className={`w-full min-h-[7rem] border border-slate-400 rounded-lg resize-none px-4 py-2 text-slate-600 focus:outline-none focus:border-slate-700 focus-visible:border-slate-700 ${className}`} {...props}>
    </textarea>
  );
});

export default TextArea;