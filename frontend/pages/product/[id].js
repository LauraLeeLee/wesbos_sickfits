import SingleProduct from '../../components/SingleProduct';

// this creates dynamic way to get the id of 'whatever' product to
// display a single item on its own page.
// it gives a query parem of id that it looks up.
export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
