import styles from './Login.module.scss';
import {
	Image,
	Button,
	Box,
	Text,
	Input,
	Heading,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Flex,
} from '@chakra-ui/react';
import { useState, setInput } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router'

import { requestOTP } from '@/components/api';

export default function Login(props) {

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (email) => {
		setIsLoading(true);
    	try {
	      await requestOTP({baseURL: router.basePath, email});
	    } catch (error) {
	    	console.log(error)
	    	// Our request failed for some reason.  Tell the user to try again later?
	    } finally {
	    	setIsLoading(false);
	    }
	};

	return (
		<div className={styles.login}>
			<div className={styles.centerColumn}>
				<Image
					alt={'Hero Image'}
					fit="contain"
					align={'center'}
					src={'/cck-simple.png'}
					className={styles.headerImage}
				/>
				<Flex direction="column" className={styles.loginForm} boxShadow="lg">
					<Heading size='lg'>Volunteer sign in</Heading>
					<Formik
						initialValues={{
					        email: '',
					    }}
						onSubmit={async (values) => {
        					//await sleep(500);
        					//alert(values.email);
        					await handleSubmit(values.email);
      					}}
					>
					{(props) => (
				       	<Form>
          					<Field name='email' type='email'>
            					{({ field, form }) => (
									<FormControl isRequired>
										<FormLabel>Email</FormLabel>
										<Input {...field} type='email'/>
									</FormControl>
            					)}
          					</Field>

        					<Button type='submit' colorScheme='orange' className={styles.button}>Continue</Button>
        				</Form>
					)}
					</Formik>
				</Flex>
				<div className={styles.newVolunteer}>New to CCK?</div>
				<Button filter='auto' contrast='100%' colorScheme='blackAlpha' className={styles.volunteerButton}>Register to volunteer</Button>
				
			</div>
		</div>
		);
}