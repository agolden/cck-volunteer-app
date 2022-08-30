import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GraphQLClient } from 'graphql-request';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

import LayoutContainer from '@/components/layout-container';
import styles from './post.module.scss';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

const Post = ({ post }) => {
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
		const post = {
			slug: "posts",
			title: "post"
		};

		return {
			props: {
				post,
			},
			revalidate: 5,
		};
	} catch (error) {
		return { props: { post: { notFound: true } } };
	}
}

export async function getStaticPaths() {
	const posts = []

	const paths = [];

	return {
		paths,
		fallback: false,
	};
}

export default Post;
