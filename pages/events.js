import { NextSeo } from 'next-seo';
import { GraphQLClient } from 'graphql-request';
import {
	Heading,
	VStack,
	useBreakpointValue,
	Flex,
	Container,
} from '@chakra-ui/react';

import LayoutContainer from '@/components/layout-container';
import Card from '@/components/events/card';

function SafeHydrate({ children }) {
	// This prevents the app from rendering on the server
	// done because of some layout bugs caused by server rendering
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : children}
		</div>
	);
}

const Events = ({ events }) => {
	// console.log(events);
	return (
		<>
			TBD
		</>
	);
};

export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

	const events = [];

	return {
		props: {
			events,
		},
		revalidate: 10,
	};
}

export default Events;
