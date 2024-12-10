export const loginFetch = async (data) => {
	try {
		const url = 'http://localhost:3977/api/v8/auth/login';
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		};

		const response = await fetch(url, params);
		const request = await response.json();

		if (response.status !== 200) throw response;

		return request;
	} catch (error) {
		throw error;
	}
};
