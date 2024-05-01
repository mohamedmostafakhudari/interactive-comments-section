export default function ProfileImage({ url }) {
  return (
    <div className="max-w-[40px]">
        <img
          src={url}
          alt=""
        />
		</div>
  )
}