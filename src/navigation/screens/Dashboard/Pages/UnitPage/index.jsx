import { useState, useEffect } from 'react';
import UnitPageUI from './UnitPageUI';
import {
  unitPageColumnData,
  unitPageColumnExtensionsData,
} from '../../../../../components/Tables/dummyData';
import {
  CampusPageStatus as UnitPageStatus,
  EditAction,
  CampusPageDate,
} from '../../../../../components/Tables/utils';
import ApiController from '../../../../../utils/network/api';
import UnitPageEdit from './UnitPageEdit';

const UnitPage = () => {
  const [selectionIds, setSelectionIds] = useState([]);
  const [unitListing, setUnitListing] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [unitPageLoading, setUnitPageLoading] = useState(false);
  const [unitPageBtnLoading, setUnitPageBtnLoading] = useState(false);
  const [unitData, setUnitData] = useState({});
  const [error, setError] = useState({
    unitTitle: '',
    unitDescription: '',
    unitImages: '',
  });
  const [uriError, setUriError] = useState({});
  const [status, setStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [unitPageData, setUnitPageData] = useState({
    unitId: '',
    unitTitle: '',
    unitDescription: '',
    unitVisibility: '',
    unitDraft: '',
    unitPassword: '',
    url: 'https://luxelocker.com/',
    customURI: 'enter-uri',
  });
  const [pageEditModal, setPageEditModal] = useState(false);
  const [ColumnSetting1] = useState(['action']);
  const [ColumnSetting2] = useState(['status']);
  const [ColumnSetting3] = useState(['created']);

  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) =>
        EditAction(restProps, () => onEditActionClick(restProps?.row)),
    },
    {
      columnName: ColumnSetting2,
      func: UnitPageStatus,
    },
    {
      columnName: ColumnSetting3,
      func: CampusPageDate,
    },
  ];

  const getCampusesPageListing = (name) => {
    setUnitListLoading(true);
    ApiController.getUnitPageListCall(name, (response) => {
      if (response?.success) {
        const UnitList = response?.data?.map((item) => {
          return {
            id: item?.id,
            unit: item?.title,
            author: item?.author_name,
            date: item?.created_at,
            status: item?.publish,
            item: item,
          };
        });
        setUnitListing(UnitList);
        setUnitListLoading(false);
      } else {
        setUnitListing([]);
        setUnitListLoading(false);
      }
    });
  };

  useEffect(() => {
    getCampusesPageListing();
  }, []);

  const onSuccesfullyEditUnit = () => {
    setPageEditModal(false);
    setUnitPageData({
      unitId: '',
      unitTitle: '',
      unitDescription: '',
      unitVisibility: '',
      unitDraft: '',
      unitPassword: '',
    });
    getCampusesPageListing();
    setUnitPageBtnLoading(false);
  };

  const getUnitDetails = (id) => {
    setUnitPageLoading(true);
    setUnitPageBtnLoading(true);
    ApiController.unitDetailsCall(id, (response) => {
      const res = response?.data;
      if (response?.success) {
        setImages(res?.unit_image_url);
        setUnitData(res);
        setUnitPageData({
          unitId: res?.id,
          unitTitle: res?.unit_page?.title,
          unitDescription: res?.unit_page?.description,
          unitVisibility: res?.unit_page?.visibility,
          unitDraft: res?.unit_page?.publish ? false : true,
          unitPassword: res?.unit_page?.password,
          url: 'https://luxelocer.com/',
          customURI: res?.unit_page?.end_url ? res?.unit_page?.end_url : 'enter-uri',
        });
        setUnitPageLoading(false);
        setUnitPageBtnLoading(false);
      } else {
        setUnitPageLoading(false);
        setUnitPageBtnLoading(false);
      }
    });
  };

  const createUnitPayload = () => {
    let payload = {
      unit_info: {
        facility: unitData?.facility_id ? unitData?.facility_id : '',
        unit_number: unitData?.unit_number ? unitData?.unit_number : '',
        length: parseFloat(unitData?.length).toFixed(2)
          ? parseFloat(unitData?.length).toFixed(2)
          : '',
        width: parseFloat(unitData?.width).toFixed(2)
          ? parseFloat(unitData?.width).toFixed(2)
          : '',
        unit_description:
          unitData?.unit_description === '' ? '' : unitData?.unit_description,
        lease_price: unitData?.lease_price === '' ? 0 : unitData?.lease_price,
        buy_price: unitData?.buy_price === '' ? 0 : unitData?.buy_price,
        is_active: status,
        is_available_for_sale: unitData?.is_available_for_sale || false,
        is_available_for_lease: unitData?.is_available_for_lease || false,
        unit_type: unitData?.unit_type ? unitData?.unit_type : '',
        storage_feature: unitData?.storage_feature || [],
      },
      amenity_ids:
        unitData?.unit_amenities?.map((amenity) => amenity.amenity_id) || [],
      unit_page: {
        title: unitPageData?.unitTitle || '',
        description: unitPageData?.unitDescription || '',
        publish: unitPageData?.unitDraft ? false : true,
        visibility: unitPageData?.unitVisibility
          ? unitPageData?.unitVisibility
          : 'PUBLIC',
        password:
          unitPageData?.unitVisibility === 'PUBLIC'
            ? ''
            : unitPageData?.unitPassword,
        end_url: unitPageData?.customURI,
      },
    };
    return payload;
  };

  const createImagePayload = () => {
    let formData = new FormData();
    images?.map((item, index) => {
      return index === 0
        ? formData.append('image', item)
        : formData.append(`image${index}`, item);
    });
    return formData;
  };

  const uploadImages = (id) => {
    ApiController.addUnitsImagesCall(id, createImagePayload(), (response) => {
      if (response.success) {
      } else {
      }
    });
  };

  const deleteImages = (id) => {
    ApiController.deleteUnitsImagesCall({ ids: id }, (response) => {
      if (response.success) {
        setDeletedImages([]);
      }
    });
  };

  const checkforImageUpload = (id) => {
    if (
      images?.length > 0 &&
      images?.filter((item) => typeof item === 'object').length
    ) {
      uploadImages(id);
    }
    if (deletedImages?.length > 0) {
      deleteImages(deletedImages);
    }
  };

  const checkEmpty = (data) => {
    const obj = {
      unitTitle: data?.unitTitle,
      unitDescription: data?.unitDescription.replaceAll(/<[^>]*>/g, ''),
    };
    Object.keys(obj).forEach((item) => {
      if (!obj[item]) {
        if (error[item] !== undefined) {
          setError((prevError) => ({
            ...prevError,
            [item]: 'This field is required',
          }));
        }
      }
    });
  };

  const updateUnitPage = () => {
    setUnitPageBtnLoading(true);
    checkEmpty(unitPageData);
    setUriError({});
    let payload = createUnitPayload();
    if (
      error?.unitTitle === '' &&
      error?.unitDescription === '' &&
      error?.unitImages === ''
    ) {
      ApiController.updateUnitCall(unitData?.id, payload, (response) => {
        if (response?.success) {
          checkforImageUpload(unitData?.id);
          onSuccesfullyEditUnit();
          setUriError({});
        } else {
          const error = response?.data?.reduce(
            (curr, acc) => ({ ...curr, ...acc }),
            {}
          );
          setUriError(error);
          setUnitPageBtnLoading(false);
        }
      });
    } else {
      setUnitPageBtnLoading(false);
    }
  };

  const onEditActionClick = (unitData) => {
    setStatus(unitData?.status);
    setPageEditModal(true);
    getUnitDetails(unitData?.item?.unit_id);
  };

  //************************* Search Bar Start *******************************//

  //***** States *****//
  const [searchText, setSearchText] = useState('');

  // Search User Method
  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
    } else {
      setSearchText('');
      getCampusesPageListing();
    }
  };
  const onUnitsSearch = () => {
    if (searchText) {
      getCampusesPageListing(searchText);
    }
  };
  // onSearch Clear
  const onClear = () => {
    setSearchText('');
    getCampusesPageListing();
  };
  //************************* Search Bar End *******************************//

  return (
    <div>
      <UnitPageUI
        // Selestion State
        selectionIds={selectionIds}
        setSelectionIds={setSelectionIds}
        unitColumnData={unitPageColumnData}
        unitColumnExtensionsData={unitPageColumnExtensionsData}
        unitRowData={unitListing.length > 0 ? unitListing : []}
        loading={unitListLoading}
        // Table Methods
        dataProviders={dataProviders}
        // SearchBar States
        searchText={searchText}
        // SearchBar Method
        onChangeSearch={onChangeSearch}
        onUnitsSearch={onUnitsSearch}
        onClear={onClear}
      />
      <UnitPageEdit
        open={pageEditModal}
        close={() => {
          Object.keys(error).forEach((item) => {
            setError((prevError) => ({
              ...prevError,
              [item]: '',
            }));
          });
          setPageEditModal(false);
        }}
        title='Edit Unit Page'
        unitPageData={unitPageData}
        setunitPageData={setUnitPageData}
        loading={unitPageLoading}
        unitPageBtnLoading={unitPageBtnLoading}
        onUpdate={updateUnitPage}
        images={images}
        setImages={setImages}
        deletedImages={deletedImages}
        setDeletedImages={setDeletedImages}
        unitData={unitData}
        error={error}
        setError={setError}
        backendError={uriError}
      />
    </div>
  );
};

export default UnitPage;
