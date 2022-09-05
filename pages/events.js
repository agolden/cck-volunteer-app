// import { GraphQLClient } from 'graphql-request';

const Events = (/*{ events }*/) => {
	// console.log(events);
	return (
		<>
			TBD
		</>
	);
};

export async function getStaticProps() {
	// const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

	const events = [];

	return {
		props: {
			events,
		},
		revalidate: 10,
	};
}

export default Events;
