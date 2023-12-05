import { useEffect, useState } from 'react';
import PageCampusesUI from './CampusesPageUI';
import {
  pageCampusesColumnData,
  pageCampusesColumnExtensionsData,
} from '../../../../../components/Tables/dummyData';
import {
  Action,
  CampusPageStatus,
  CampusPageDate,
} from '../../../../../components/Tables/utils';
import { useNavigate } from 'react-router-dom';
import ApiController from '../../../../../utils/network/api';
import DeleteModal from '../../../../../components/DeleteModal';

const PageCampuses = () => {
  const navigate = useNavigate();
  const [campusesListLoading, setCampusesLoading] = useState(false);
  const [campusesList, setCampusesList] = useState([]);
  const [campusPageList, setCampusPageList] = useState([]);
  const [campusPageListLoading, setCampusPageListLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [selectionIds, setSelectionIds] = useState([]);
  const [ColumnSetting1] = useState(['action']);
  const [ColumnSetting2] = useState(['status']);
  const [ColumnSetting3] = useState(['created']);

  // Delete Modal States
  const [deleteCampusData, setDeleteCampusData] = useState({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  //***** Methods *****//
  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Action(restProps, onActionClick),
    },
    {
      columnName: ColumnSetting2,
      func: CampusPageStatus,
    },
    {
      columnName: ColumnSetting3,
      func: CampusPageDate,
    },
  ];

  const onActionClick = (type, campuseData) => {
    if (type === 'edit') {
      navigate('/edit-campus-page/' + campuseData?.id, {
        state: { campusData: campuseData?.item, campusList: campusesList },
      });
    } else if (type === 'delete') {
      setDeleteCampusData(campuseData);
      setIsOpenDeleteModal(true);
    }
  };

  useEffect(() => {
    getCampusesListing();
  }, []);

  const getCampusesListing = (name, zones, status) => {
    setCampusesLoading(true);
    ApiController.fetchCampusesCall(name, zones, status, (response) => {
      if (response?.success) {
        const sortArray = response?.data?.sort(function (a, b) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });
        setCampusesList(sortArray);
        setCampusesLoading(false);
      } else {
        setNetworkError(true);
        setCampusesLoading(false);
      }
    });
  };

  // Again Call For Listing
  const reCallListing = () => {
    setNetworkError(false);

    getCampusesListing();
  };

  //************************* Search Bar Start *******************************//

  //***** States *****//
  const [searchText, setSearchText] = useState('');

  //***** Methods *****//

  // Search User Method
  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
    } else {
      setSearchText('');
      getCampusesPageListing();
    }
  };
  const onCampusSearch = () => {
    if (searchText) {
      getCampusesPageListing(searchText);
    }
  };
  // onSearch Clear
  const onClear = () => {
    setSearchText('');
    getCampusesListing();
  };

  const navToAddCampus = () => {
    navigate('/add-new-campus-page', { state: campusesList });
  };
  //************************* Search Bar End *******************************//

  //************************* FETCH CAMPUS PAGE LISTING START *******************************//

  const getCampusesPageListing = (name) => {
    setCampusPageListLoading(true);
    ApiController.getCampusPageListCall(name, (response) => {
      if (response?.success) {
        setCampusPageListLoading(false);
        const data = response?.data;
        const campuseList = data?.map((item) => {
          return {
            id: item?.id,
            campus: item?.campus_title,
            author: item?.author_name,
            date: item?.created_at,
            status: item?.publish_campus,
            item: item,
            endUrl: item?.end_url,
          };
        });
        setCampusPageList(campuseList);
      } else {
        setCampusPageListLoading(false);
        setCampusPageList([]);
      }
    });
  };

  useEffect(() => {
    getCampusesPageListing();
  }, []);

  //************************* FETCH CAMPUS PAGE LISTING END *******************************//

  //************************* DELETE CAMPUS START *******************************//
  const handleOnDelete = (id) => {
    console.log('id', id);
    setDeleteLoading(true);
    ApiController.deleteCampusPageCall(id, (response) => {
      if (response?.success) {
        setDeleteLoading(false);
        setDeleteError('');
        setIsOpenDeleteModal(false);
        getCampusesPageListing();
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
    setDeleteCampusData({});
  };
  //************************* DELETE CAMPUS START *******************************//

  return (
    <div>
      <PageCampusesUI
        // Selestion State
        selectionIds={selectionIds}
        setSelectionIds={setSelectionIds}
        // Table Data
        campusesColumnData={pageCampusesColumnData}
        campusesColumnExtensionsData={pageCampusesColumnExtensionsData}
        campusesRowData={campusPageList.length > 0 ? campusPageList : []}
        // Table Methods
        dataProviders={dataProviders}
        // SearchBar States
        searchText={searchText}
        // SearchBar Method
        onChangeSearch={onChangeSearch}
        onCampusSearch={onCampusSearch}
        onClear={onClear}
        // Loading to show view after API Call
        loading={campusesListLoading}
        networkError={networkError}
        navToAddCampus={navToAddCampus}
        // Campuse List Page Loading
        campusPageListLoading={campusPageListLoading}
        //Recal Listing
        reCallListing={reCallListing}
      />
      {/* Delete Campus Page */}
      <DeleteModal
        id={deleteCampusData?.id}
        title='Delete Campus Page'
        open={isOpenDeleteModal}
        close={closeDeleteModal}
        data={deleteCampusData}
        onDelete={handleOnDelete}
        loading={deleteLoading}
        error={deleteError}
      />
    </div>
  );
};

export default PageCampuses;
