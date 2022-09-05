import styles from './Registration.module.scss';
import {
	Image,
	Button,
	Input,
	Heading,
	FormLabel,
	FormControl,
	Flex,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialog,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';

import { registerUser } from '@/components/api';

export default function Login() {

	const RegistrationErrorMessage = Object.freeze({
		duplicate: 'A volunteer with this email or nickname already exists. Please try again.'
	});

	const router = useRouter();

	var initialEmail = (typeof router.query.email !== "undefined" ? router.query.email : '');
	
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [registrationSucceeded, setRegistrationSucceeded] = useState(false);
	
	const handleSubmit = async (values) => {
		setIsLoading(true);
		setErrorMessage('');
		try {
			var res = await registerUser({baseURL: router.basePath, email: values.email, nickname: values.nickname}) ;
			if (res.status == 400) {
				setErrorMessage(RegistrationErrorMessage.duplicate);
			} else if (res.status == 200) {
				setRegistrationSucceeded(true);
			}
		} catch (error) {
			console.log(error);
			// Our request failed for some reason.  Tell the user to try again later?
		} finally {
			setIsLoading(false);
		}
	};

	const errorContent = errorMessage.length > 0 ?
		<Alert status='error'>
			<AlertIcon />
			<AlertDescription>{errorMessage}</AlertDescription>
		</Alert>
		:
		null;

	
	
	return (
		<div className={styles.fullScreenPage}>

			<div className={styles.centerColumn}>
				<Image
					alt={'Hero Image'}
					fit="contain"
					align={'center'}
					src={'/cck-simple.png'}
					className={styles.logoHeader}
				/>
				<Flex direction="column" className={styles.form} boxShadow="lg">
					<Heading size='lg'>Volunteer registration</Heading>
					{errorContent}
					<Formik
						enableReinitialize
						initialValues={{
							email: initialEmail,
							nickname: ''
						}}
						onSubmit={async (values) => {
							await handleSubmit(values);
						}}
					>
					{({
						values,
					}) => (
						<Form>
							<Field name='email' type='email'>
								{({ field }) => (
									<FormControl isRequired>
										<FormLabel>Email</FormLabel>
										<Input {...field} type='email'/>
									</FormControl>
								)}
							</Field>
							<Field name='nickname' type='email'>
								{({ field }) => (
									<FormControl isRequired>
										<FormLabel>Your CCK name!</FormLabel>
										<Input {...field} type='text'/>
									</FormControl>
								)}
							</Field>

							<Button type='submit' colorScheme='orange' disabled={isLoading} className={styles.button}>Register</Button>
							<AlertDialog
								isOpen={registrationSucceeded}
								onClose={() => router.push('/')}
							>
								<AlertDialogOverlay>
									<AlertDialogContent>
										<AlertDialogHeader fontSize='lg' fontWeight='bold'>
											Success!
										</AlertDialogHeader>

										<AlertDialogBody>
											You&apos;ve successfully registered as a volunteer.
										</AlertDialogBody>

										<AlertDialogFooter>
											<Button colorScheme='orange' onClick={() => router.push({
												pathname: '/login',
												query: { email: values.email }
											}, '/login')}>
												Proceed to Login
											</Button>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialogOverlay>
							</AlertDialog>
						</Form>
					)}
					</Formik>
				</Flex>				
			</div>
		</div>
	);
}