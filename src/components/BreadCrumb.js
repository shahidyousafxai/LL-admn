// Library Imports
import React from 'react';

// Local Imports

const BreadCrumb = (props) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center m-0 p-0">
        {
          props?.routes.map((route, index) => {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <a className='breadCrumbsYellowText' href={route.route}>{route.name}</a>
                </div>
              </li>
            )
          })
        }
      </ol>
    </nav>
  );
};

export default BreadCrumb;
