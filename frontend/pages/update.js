import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}

// global layout to wrap something in so that everytime a Page is created it is wrapped in that
// two special files:
// _app.js
