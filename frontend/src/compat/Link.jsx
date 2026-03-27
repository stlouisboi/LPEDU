/**
 * compat/Link.jsx
 * Drop-in replacement for react-router-dom's <Link to="...">
 * Translates the `to` prop → Next.js `href`, preserving all other props.
 */
import NextLink from 'next/link';

export function Link({ to, href, children, ...props }) {
  return (
    <NextLink href={to || href || '/'} {...props}>
      {children}
    </NextLink>
  );
}

export default Link;
