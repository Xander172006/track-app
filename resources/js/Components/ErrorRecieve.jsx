import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

function MyComponent() {
  const { flash } = usePage();

  return (
    <div>
      {flash.error && (
        <div className="alert alert-danger">
          {flash.error}
        </div>
      )}

      {/* Your component content */}
    </div>
  );
}

export default MyComponent;
