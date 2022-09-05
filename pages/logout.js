import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogoutPage = () => {
	setCookie('AuthJWT', '', { maxAge: 0 });
	const router = useRouter();
	useEffect(() => {
		const timeout = setTimeout(() => {
			router.push('/login');
		}, 100);

		return () => clearTimeout(timeout);
	});

	return (
		<div>Redirecting...</div>
	);
};

export default LogoutPage;