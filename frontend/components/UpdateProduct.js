import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import FormStyles from './styles/FormStyles';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    # the above in turn calls updateProduct() from graphQL
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price } # then it returns -->
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. we need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  console.log(data);

  // 2. we need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 2.5 Create some state for the form inputs
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  console.log('inputs:', inputs);
  if (loading) return <p>Loading...</p>;
  // 3. we need the form to handle the updates
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          // in this example variables were passed on call instead of upon definition
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log('update product res:', res);
        // submit the input fields to the backend
        // TODO: handle submit!!!!
        // clearForm();
        // // Go to that products page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      {/* to disable ALL the inputs while backend is working  need to use a fieldset 
      fieldset allows you to group together multiple fields */}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </FormStyles>
  );
}
