// Library Imports
import React from 'react';
import { useSelector } from 'react-redux';

//Local Imports
import PreviewLayout from '../PreviewLayout/PreviewLayout';
import CampusPreviewPage from './PagePreviewComponent/CampusPreviewPage';
import BlogPreviewPage from './PagePreviewComponent/BlogPreviewPage';
import UnitPreviewPage from './PagePreviewComponent/UnitPreviewPage';

const PagePreview = () => {
  const state = useSelector((state) => state?.previewData?.previewData);
  return (
    <PreviewLayout>
      {state?.from === "campus" ? (
        <CampusPreviewPage data={state}/>
      ) : state?.from === "blog" ? (
          <BlogPreviewPage data={ state }/>
        ) : state?.from === "unit" ? (
            <UnitPreviewPage data={state} />
        ) : null}
    </PreviewLayout>
  );
};
export default PagePreview;
