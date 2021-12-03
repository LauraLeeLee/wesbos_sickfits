import Link from 'next/link';
import NavStyles from './styles/NavStyles';

// anytime you want to link to something that is PART of your website,
// you use the Link tag. Anytime you want to link to something OUTSIDE of your
// website, you use a regular <a href></a>
export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </NavStyles>
  );
}
