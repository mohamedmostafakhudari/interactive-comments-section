import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import PageLayout from "./components/PageLayout";
import CommentSection from "./components/CommentSection";

export default function App() {
	const { data: currentUser, error, loading } = useFetch("http://localhost:3000/currentUser");

	if (error) {
		console.log(error);
	}

	return (
		<PageLayout>
			<CommentSection currentUser={currentUser} />
		</PageLayout>
	);
}
