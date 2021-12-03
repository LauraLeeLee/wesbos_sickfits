import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { ALL_PRODUCTS_QUERY } from './Products.js';

// this is graphql notation! not JS!
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in and what types are they
    # a bang(!) on the end is how you say 'required' in graphql
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # these are what get returned to us
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice Shoes',
    price: 72628,
    description: 'these are the best shoes',
  });
  // the first thing it returns it the actual function that will run the mutation.
  // the second thing that it returns is the same thing as the query - loading state, error state, data
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // this will tell the network to refresh the page to add the new product
      // that was created.
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  console.log(createProduct);

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend
        // if you don't know the inputs until the time of submit, they can be defined here
        // await createProduct({
        //   variables: inputs
        // })
        const res = await createProduct();
        clearForm();
        // Go to that products page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      {/* to disable ALL the inputs while backend is working  need to use a fieldset 
      fieldset allows you to group together multiple fields */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            required
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
}
