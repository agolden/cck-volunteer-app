import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GraphQLClient } from 'graphql-request';
import {
	Box,
	Button,
	Heading,
	Flex,
	Text,
	Icon,
	Link,
	useBreakpointValue,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import LayoutContainer from '@components/layout-container';
import styles from './event.module.scss';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

const Event = ({ event }) => {
	const router = useRouter();

	const boxBreakpointValue = useBreakpointValue({ base: '90%', md: '650px' });

	if (router.isFallback) {
		return (
			<LayoutContainer>
				<h1>Please wait…</h1>
			</LayoutContainer>
		);
	}

	return (
			<LayoutContainer>
				<Head>
					<meta name="robots" content="noindex" />
				</Head>
				<Error statusCode={404} />
			</LayoutContainer>
		);
};

export async function getStaticProps({ params }) {
	try {
		const event = [];

		return {
			props: {
				event,
			},
			revalidate: 5,
		};
	} catch (error) {
		return { props: { event: { notFound: true } } };
	}
}

export async function getStaticPaths() {
	const events = []

	const paths = [];

	return {
		paths,
		fallback: false,
	};
}

export default Event;
