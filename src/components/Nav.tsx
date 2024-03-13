import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <ul>
      <li>
        <Link href="/about">about</Link>
      </li>
      <li>
        <Link href="/report">report</Link>
      </li>
      <li>
        <Link href="/csr">todos-csr</Link>
      </li>
      <li>
        <Link href="/ssr">todos-ssr</Link>
      </li>
    </ul>
  );
};

export default Nav;
