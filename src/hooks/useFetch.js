import { useEffect, useState } from "react";

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);

				setLoading(false);
			} catch (err) {
				setError(err);
			}
		}

		fetchData();
		return () => {};
	}, [url]);

	return { data, error, loading };
}
