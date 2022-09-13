import {
	Alert,
	AlertIcon,
	AlertDescription,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	Text,
	Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import styles from './Login.module.scss';
import OtpInput from 'react18-otp-input';
import { validateOTP } from '@/components/api';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

export default function OTPModal(props) {

	const OTPErrorMessage = Object.freeze({
		invalid: 'The validation code entered is invalid. Please try again.'
	});

	const [errorMessage, setErrorMessage] = useState('');
	const [otpEntryVal, setOTPEntryVal] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	
	const maskEmail = (email) => {
		if (email !== null) {
			return email.replace(/^(.)(.*)(.@.*)$/,
			(_, a, b, c) => a + b.replace(/./g, '*') + c
			);
		}
		return null;
	};

	const handleOTPChange = (otp) => {
		setOTPEntryVal(otp);
		setErrorMessage('');
	};

	const clearOTPEntry = () => {
		handleOTPChange('');
	};

	const handleOTPSubmit = async () => {
		let otp = otpEntryVal;
		setIsLoading(true);
		try {
			var res = await validateOTP({baseURL: router.basePath, email: props.email, otp});
			if (res.status == 401) {
				// OTP validation failed, prompt for re-entry
				clearOTPEntry();
				setErrorMessage(OTPErrorMessage.invalid);
				setIsLoading(false);
			} else if (res.status == 200) {
				// OTP validation succeeded, proceed to home screen
				var responseBody = await res.json();
				setCookie('AuthJWT', responseBody.jwt);
				router.push('/');
			}
		} catch (error) {
			console.log(error);
			// Our request failed for some reason.  Tell the user to try again later?
			setIsLoading(false);
		}
	};

	var modalBodyText = errorMessage.length > 0 ?
		<Alert status='error'>
			<AlertIcon />
			<AlertDescription>{errorMessage}</AlertDescription>
		</Alert>
		:
			(props.debug ?
				<Text>We&apos;re in debug mode! Check the console for your OTP</Text>
				:
				<Text>
					An email has been dispatched to <b>{maskEmail(props.email)}</b> with a verification code. Please enter that code below:
				</Text>
			);

	var newProps = {};
	for(var key in props){
		if (key !== "onClose") {
			newProps[key] = props[key];
		}
	}

	newProps.onClose = () => {
		clearOTPEntry();
		props.onClose();
	};

	const spinner = isLoading? <Spinner size='xs' marginLeft="1em;"/> : null;

	return (
			<Modal {...newProps}>
				<ModalOverlay />
				<ModalContent marginX="20px;">
					<ModalHeader textAlign="center">Enter Verification Code</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{modalBodyText}
						<div className={styles.otpContainer}>
							<OtpInput
								inputStyle={styles.inputStyle}
								isInputNum={true}
								value={otpEntryVal}
								onChange={handleOTPChange}
								numInputs={6}
								separator={<span>-</span>}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button marginRight="20px;" onClick={clearOTPEntry} disabled={otpEntryVal.length == 0 || isLoading}>Clear</Button>
						<Button colorScheme='orange' onClick={handleOTPSubmit} disabled={otpEntryVal.length < 6 || isLoading}>
							Submit {spinner}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
	);
}