import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";

import { useCurrentUser } from "./contexts/CurrentUserProvider";

import PageLayout from "./components/PageLayout";
import CommentSection from "./components/CommentSection";
import CommentInput from "./components/CommentInput";

export default function App() {
	// const { data: currentUser, error, loading } = useFetch("http://localhost:3000/currentUser");
	const currentUser = useCurrentUser();

	if (!currentUser) return 'loading';

	return (
		<PageLayout>
			<CommentSection currentUser={currentUser} />
			<CommentInput currentUser={currentUser}/>
		</PageLayout>
	);
}
