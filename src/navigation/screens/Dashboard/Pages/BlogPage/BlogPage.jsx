// Library Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Local Imports
import BlogPageUI from './BlogPageUI';
import {
  blogPageColumnData,
  blogPageColumnExtensionsData,
  blogPageRowData,
} from '../../../../../components/Tables/dummyData';
import {
  Action,
  CampusPageDate as BlogsPageDate,
  CampusPageStatus as BlogsPageStatus,
  tags,
} from '../../../../../components/Tables/utils';
import ApiController from '../../../../../utils/network/api';
import DeleteBlogPage from './DeleteBlogUI';

const Blog = () => {
  // All States
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [blogData, setBlogData] = useState([]);

  // Loading States
  const [loading, setLoading] = useState(false);
  // **** Table States **** //
  const [selectionIds, setSelectionIds] = useState([]);
  const [ColumnSetting1] = useState(['action']);
  const [ColumnSetting2] = useState(['status']);
  const [ColumnSetting3] = useState(['created']);
  const [ColumnSetting4] = useState(['tags']);

  // Delete Modal States
  const [deleteBlogData, setDeleteBlogData] = useState({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  //***** Table Methods *****//
  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Action(restProps, onActionClick),
    },
    {
      columnName: ColumnSetting2,
      func: BlogsPageStatus,
    },
    {
      columnName: ColumnSetting3,
      func: BlogsPageDate,
    },
    {
      columnName: ColumnSetting4,
      func: tags,
    },
  ];
  // Actoin Click Manage
  const onActionClick = (type, blogData) => {
    if (type === 'edit') {
      navigate(`/edit-new-post/${blogData?.id}`, {
        state: { blogData: blogData },
      });
    } else if (type === 'delete') {
      setDeleteBlogData(blogData);
      setIsOpenDeleteModal(true);
    }
  };

  // OnClick To Navigate
  const handleNavigate = () => {
    // Add your navigation logic here
    navigate('/add-new-post');
  };

  // ***************** FETCH BLOGS LIST ******************************//
  const fetchBlogPageList = async (name) => {
    setLoading(true);
    ApiController.getBlogPageListCall(name, (response) => {
      if (response.success) {
        const data = response?.data;
        const blogPosts = data?.map((item) => {
          return {
            id: item?.id,
            blogTitle: item?.title,
            author: item?.author_name,
            tags: item?.tags,
            created: item?.created_at,
            status: item?.publish,
          };
        });
        setBlogData(blogPosts);
        setLoading(false);
      } else {
        setLoading(false);
        setBlogData([]);
        setNetworkError(true);
      }
    });
  };

  // Search User Method
  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
    } else {
      setSearchText('');
      fetchBlogPageList();
    }
  };

  // on Search
  const onBlogSearch = () => {
    if (searchText) {
      fetchBlogPageList(searchText);
    }
  };
  const onClear = () => {
    setSearchText('');
    fetchBlogPageList();
  };

  // UseEffect For Getting Blogs
  useEffect(() => {
    fetchBlogPageList();
  }, []);

  //************************* DELETE CAMPUS START *******************************//
  const handleOnDelete = (id) => {
    console.log('id', id);
    setDeleteLoading(true);
    ApiController.deleteBlogPageCall(id, (response) => {
      if (response?.success) {
        setDeleteLoading(false);
        setDeleteError('');
        setIsOpenDeleteModal(false);
        fetchBlogPageList();
      } else {
        setDeleteLoading(false);
        setDeleteError(response?.message);
      }
    });
  };

  // Handle Close Delete Modal
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setDeleteError('');
    setDeleteLoading(false);
    setDeleteBlogData({});
  };

  // Recal Listing If Network Error
  const reCallListing = () => {
    setNetworkError(false);

    fetchBlogPageList('');
  };

  return (
    <React.Fragment>
      <BlogPageUI
        // Selection States
        selectionIds={selectionIds}
        setSelectionIds={setSelectionIds}
        // Table Data
        blogsColumnExtensionsData={blogPageColumnExtensionsData}
        blogsColumnData={blogPageColumnData}
        blogsRowData={blogData.length > 0 ? blogData : []}
        // Table Methods
        dataProviders={dataProviders}
        // SearchBar States
        searchText={searchText}
        networkError={networkError}
        onChangeSearch={onChangeSearch}
        onSearch={onBlogSearch}
        onClear={onClear}
        loading={loading}
        // Handle Navigate
        onClickToNavigate={handleNavigate}
        reCallListing={reCallListing}
      />

      {/* Delete Blog Page Modal */}
      <DeleteBlogPage
        open={isOpenDeleteModal}
        data={deleteBlogData}
        close={closeDeleteModal}
        onDelete={handleOnDelete}
        loading={deleteLoading}
        error={deleteError}
      />
    </React.Fragment>
  );
};

export default Blog;
