import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ id }) {
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
