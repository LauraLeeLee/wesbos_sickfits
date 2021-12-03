import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

// place any styles you want to apply globally here
const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2')format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09); //bs is box-shadow
    box-sizing: border-box;
    font-size: 62.5%; // this is used to set 10px as it allows the user to override this value in their browser settings
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    // setting the font globally on the body doesn't set the font on 
    // the button tag for some reason. need to add it
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  } 
`;

// this styles the 'children'. we're constraining the width
const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

// need to destructure props into the actual children that you need
export default function Page({ children, cool }) {
  return (
    <div>
      {/* add GlobalStyles tag to use in all pages */}
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any, // 'any' can be used when not sure what the prop type will be. Its easier than using -PropTypes.oneOf(PropTypes.node),PropTypes.node
};
