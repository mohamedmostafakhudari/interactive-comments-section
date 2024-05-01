export default function PageLayout({ children }) {
	return (
		<>
		<main className="">
			<div className="container mx-auto p-4 pt-8 max-w-screen-md">{children}</div>
		</main>
		</>
	);
}
