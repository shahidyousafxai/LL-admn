// Library Imports
import React from 'react';
import Add from '@mui/icons-material/Add';

// Local Imports
import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import Button from '../../../../../components/button';
import BlogsTable from '../../../../../components/Tables/Table';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../components/serverError';

const BlogPageUI = ({
  selectionIds,
  setSelectionIds,
  blogsColumnData,
  blogsColumnExtensionsData,
  blogsRowData,
  dataProviders,
  onChangeSearch,
  searchText,
  loading,
  onClear,
  onSearch,
  networkError,
  onClickToNavigate,
  reCallListing,
}) => {
  return (
    <React.Fragment>
      <div className='main-container px-6 pt-3'>
        {/* Search Bar Row */}
        <div className='flex flex-row justify-between align-items-center py-3 gap-5'>
          <div className='flex-1'>
            <SearchBar
              disabled={selectionIds?.length > 0 ? true : false}
              onSearch={() => onSearch()}
              onClear={() => onClear()}
              onChange={onChangeSearch}
              value={searchText}
            />
          </div>
          <Button
            startIcon={
              <Add
                fontSize='small'
                color={`${loading ? 'secondary' : 'primary'}`}
              />
            }
            className={`text-sm !normal-case flex-2  ${
              loading ? 'text-gray-400' : 'text-black'
            }`}
            height={37}
            style={loading ? Styles?.disableBtn : Styles.activeBtn}
            component='span'
            variant='contained'
            disabled={loading}
            onClick={onClickToNavigate}
          >
            <p style={loading ? Styles?.disableBtnText : Styles.activeBtnText}>
              Add New Post
            </p>
          </Button>
        </div>

        {/* Campus Table */}
        {loading ? (
          <InsideSpinner />
        ) : networkError ? (
          <ServerError reCallListing={reCallListing} />
        ) : (
          <BlogsTable
            rows={blogsRowData}
            columns={blogsColumnData}
            tableColumnExtensions={blogsColumnExtensionsData}
            dataProviders={dataProviders}
            selectionIds={selectionIds}
            setSelectionIds={setSelectionIds}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default BlogPageUI;
