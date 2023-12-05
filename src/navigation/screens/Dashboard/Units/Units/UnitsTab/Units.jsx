// Library Imports
import React, { useState, useEffect } from 'react';

// Local Imports
import UnitsUI from './UnitsUI';
import {
  Action,
  ForLease,
  ForSale,
  Status,
} from '../../../../../../components/Tables/utils';
import {
  unitsColumnData,
  unitsColumnExtensionsData,
} from '../../../../../../components/Tables/dummyData';
import ApiController from '../../../../../../utils/network/api';
import DeleteUnit from '../DeleteUnit/DeleteUnit';
import AddEditUnitUI from '../AddEditUnit/AddEditUnitUI';
import {
  toUpperCase,
  validateInput,
} from '../../../../../../utils/validations/localValidations';
import UnitDetails from '../UnitDetails/UnitDetails';
import ImportUnitsModal from './ImportData';

const UnitsTab = ({
  openAddEditUnit,
  toggleAddEditUnitModal,
  closeAddEditUnit,
  openCSVModal,
  closeImportDataModal,
}) => {
  //************************* Unit Main Screen Start *******************************//

  //***** States *****//
  const [ColumnSetting1] = useState(['action']);
  const [ColumnSetting2] = useState(['forSale']);
  const [ColumnSetting3] = useState(['forLease']);
  const [ColumnSetting4] = useState(['status']);
  const [selectionIds, setSelectionIds] = useState([]);
  const [units, setunits] = useState([]);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [unitsListLoading, setunitsLoading] = useState(false);
  const [storageSelectAll, setStorageSelectAll] = useState(false);
  const [storageList] = React.useState([
    {
      id: 1,
      name: 'RV and CARS',
    },
    {
      id: 2,
      name: 'PERSONAL ITEMS',
    },
    {
      id: 3,
      name: 'BOATS and PWC',
    },
    {
      id: 4,
      name: 'TOOLS and MATERIALS',
    },
  ]);

  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    getUnitsListing();
    getCampusesListing();
    // eslint-disable-next-line
  }, []);

  //***** Methods *****//
  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Action(restProps, onActionClick),
    },
    {
      columnName: ColumnSetting2,
      func: ForSale,
    },
    {
      columnName: ColumnSetting3,
      func: ForLease,
    },
    {
      columnName: ColumnSetting4,
      func: Status,
    },
  ];
  // Action Click From Table
  const onActionClick = (type, unitData) => {
    if (type === 'edit') {
      setEditDataLoading(true);
      setEditUnitData(unitData);
      ApiController.unitDetailsCall(unitData.id, (response) => {
        if (response.success) {
          setImages(response?.data?.unit_image_url);
          setUnitDetails({ rawData: response?.data });
          const unit = response?.data;
          const amenityIds = unit?.unit_amenities.map(
            (amenity) => amenity?.amenity_id
          );
          unit?.storage_feature === 'ALL TYPES'
            ? setStorageSelectAll(true)
            : setStorageSelectAll(false);
          setNewUnit({
            title: 'Edit Unit',
            id: unitData?.id,
            description: unitData?.description,
            url: 'https://luxelocker.com/',
            customURI: response?.data?.unit_page?.end_url ? response?.data?.unit_page?.end_url : 'enter-uri',
            publishDate:
              response?.data?.unit_page?.unit_publish_date?.split('T')[0],
            facilityId: unitData?.facilityId,
            facilityName: unitData?.facility,
            unitNum: unitData?.unitNumber,
            length: unitData?.length,
            width: unitData?.width,
            sqFeet: unitData?.sqFt,
            maintenanceFee: unitData?.maintenanceFee,
            availableForSale: unitData?.forSale,
            availableForLease: unitData?.forLease,
            leasePrice: unitData?.leasePrice,
            buyPrice: unitData?.buyPrice,
            status: unitData?.status,
            newUnitType: unit?.unit_type,
            unitTitle: unit?.unit_page?.title,
            unitId: unit?.unit_page?.id,
            unitDescription: unit?.unit_page?.description,
            unitPassword: unit?.unit_page?.password,
            unitVisibility: unit?.unit_page?.visibility,
            unitDraft: unit?.unit_page?.publish ? false : true,
            storage:
              unit?.storage_feature !== null
                ? unit?.storage_feature[0] === 'ALL TYPES'
                  ? storageList
                  : storageList?.filter((item) =>
                      unit?.storage_feature?.includes(item?.name)
                    )
                : null,
            amenities: amenityIds,
            ...(typeof unit?.unit_owner === 'object' && {
              owner: unit?.unit_owner,
              ownerId: unit?.unit_owner?.owner_id,
              ownerName: `${unit?.unit_owner?.first_name} ${unit?.unit_owner?.last_name}`,
              ownerEmail: unit?.unit_owner?.email,
              ownerPhone:
                unit?.unit_owner?.phone_no !== null
                  ? unit?.unit_owner?.phone_no
                  : 'No phone number linked with selected user',
              purchaseDate: unit?.unit_owner?.purchase_date,
              sellDate: unit?.unit_owner?.sell_date,
            }),
            ...(typeof unit?.unit_lessee === 'object' && {
              lessee: unit?.unit_lessee,
              lesseeId: unit?.unit_lessee?.lessee_id,
              lesseeName: `${unit?.unit_lessee?.first_name} ${unit?.unit_lessee?.last_name}`,
              lesseeEmail: unit?.unit_lessee?.email,
              lesseePhone:
                unit?.unit_lessee?.phone_no !== null
                  ? unit?.unit_lessee?.phone_no
                  : 'No phone number linked with selected user',
              startDate: unit?.unit_lessee?.start_date,
              endDate: unit?.unit_lessee?.end_date,
            }),
          });
          setEditDataLoading(false);
        } else {
          setEditDataLoading(false);
        }
      });
      toggleAddEditUnitModal(true);
    } else {
      setDeleteUnit(unitData);
      toggledeleteUnitModal(true);
    }
  };

  const getCampusesListing = (name, zones, status) => {
    ApiController.fetchCampusesCall(name, zones, status, (response) => {
      if (response?.success) {
        // sort response array
        const sortArray = response.data.sort(function (a, b) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });
        // Set Facilities List for Modal
        setFacilitiesList(response?.data);
        let data = sortArray.map((item) => {
          let obj = {
            id: item.id,
            title: item.name,
            value: false,
            status: item.is_active,
            maintenanceFee: item.maintenance_fee,
          };
          return obj;
        });
        let status = filters.Status.slice();
        let campus = data;
        setFilters(() => {
          const newObj = { Campus: campus, Status: status };
          return newObj;
        });
      }
    });
  };

  // Fetching And Setting Unit Listing Data
  const filterString = (campus, status) => {
    let campusStr, statusStr;
    // making string for campus filter
    if (campus) {
      // eslint-disable-next-line
      campus.map((item) => {
        if (item.value) {
          campusStr = campusStr ? campusStr + ',' + item.title : item.title;
        }
      });
    }
    // making string for status filter
    if (status) {
      // eslint-disable-next-line
      status.map((item) => {
        if (item.value) {
          statusStr = item.title.toLowerCase();
        }
      });
    }

    let obj = {
      campus: campusStr,
      status: statusStr,
    };
    return obj;
  };
  const getUnitsListing = (name, campus, status, buyPrice, leasePrice) => {
    let filters = filterString(campus, status);
    setunitsLoading(true);

    ApiController.fetchUnitsCall(
      name,
      filters.campus,
      filters.status,
      buyPrice,
      leasePrice,
      (response) => {
        if (response?.success) {
          // sort response array
          const sortArray = response.data.sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
          });
          // create object to render table
          let data = sortArray.map((item) => {
            let obj = {
              id: item.id,
              facility: item.facility_name,
              facilityId: item.facility,
              maintenanceFee: item.maintenance_fee,
              owner:
                typeof item.unit_owner_name === 'object'
                  ? `${
                      item?.unit_owner_name?.first_name
                        ? item?.unit_owner_name?.first_name
                        : 'LuxeLocker'
                    } ${
                      item?.unit_owner_name?.last_name
                        ? item?.unit_owner_name?.last_name
                        : ''
                    }`
                  : item.unit_owner_name
                  ? item.unit_owner_name
                  : 'LuxeLocker',
              ownerObject:
                typeof item.unit_owner_name === 'object' &&
                item.unit_owner_name,
              lessee:
                typeof item.unit_lessee_name === 'object'
                  ? `${
                      item?.unit_lessee_name?.first_name
                        ? item?.unit_lessee_name?.first_name
                        : ''
                    } ${
                      item?.unit_lessee_name?.last_name
                        ? item?.unit_lessee_name?.last_name
                        : ''
                    }`
                  : item.unit_lessee_name
                  ? item.unit_lessee_name
                  : '',
              lesseeObject:
                typeof item.unit_lessee_name === 'object' &&
                item.unit_lessee_name,
              unitNumber: item.unit_number,
              length: item.length,
              width: item.width,
              sqFt: item.length * item.width,
              buyPrice: item.buy_price,
              leasePrice: item.lease_price,
              forSale: item.is_available_for_sale,
              forLease: item.is_available_for_lease,
              status: item.is_active,
              description: item?.unit_description,
            };
            return obj;
          });
          setunits(data);
          setunitsLoading(false);
        } else {
          setunitsLoading(false);
          setNetworkError(true);
        }
      }
    );
  };
  // Again Call For Listing
  const reCallListing = () => {
    setNetworkError(false);

    getUnitsListing();
  };

  //************************* Unit Main Screen End *******************************//

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
      getUnitsListing();
    }
  };
  const onUnitsSearch = () => {
    if (searchText) {
      getUnitsListing(searchText);
    }
  };
  // onSearch Clear
  const onClear = () => {
    setSearchText('');
    getUnitsListing();
  };
  //************************* Search Bar End *******************************//

  //************************* Filter Start *******************************//
  //***** States *****//
  // Filter Modal States
  const [listOpen, setListOpen] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [filters, setFilters] = useState({
    Campus: [],
    Status: [
      {
        title: 'Active',
        value: false,
      },
      {
        title: 'Inactive',
        value: false,
      },
    ],
  });

  // Range Buy Price
  const [buyValue, setBuyValue] = useState([0, 0]);
  const [leaseValue, setLeaseValue] = useState([0, 0]);
  const buyHandleChanges = (event, newValue) => {
    setBuyValue(newValue);
  };
  const leaseHandleChanges = (event, newValue) => {
    setLeaseValue(newValue);
  };

  //***** Methods *****//

  const listingCallWithPriceRange = (from) => {
    if (from === 'buyEmpty') {
      getUnitsListing('', filters.Campus, filters.Status, [0, 0], leaseValue);
    } else if (from === 'leaseEmpty') {
      getUnitsListing('', filters.Campus, filters.Status, buyValue, [0, 0]);
    } else {
      getUnitsListing('', filters.Campus, filters.Status, buyValue, leaseValue);
    }
  };
  const clearPriceRange = (from) => {
    if (from === 'buy') {
      setBuyValue([0, 0]);
      listingCallWithPriceRange('buyEmpty');
    } else {
      setLeaseValue([0, 0]);
      listingCallWithPriceRange('leaseEmpty');
    }
  };

  const handleClick = (event) => {
    if (!unitsListLoading) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickAwayHandler = () => {
    setAnchorEl(false);
  };
  // Closing Filter  Modal DropDown
  const handleClickForParent = (title) => {
    setListOpen({
      ...listOpen,
      [title]: !listOpen[title],
    });
  };
  // onChange Filter States
  const onChangeFilter = (item, index) => {
    if (item.title === 'Active' || item.title === 'Inactive') {
      let status = filters.Status.slice();
      let campus = filters.Campus.slice();

      setFilters(() => {
        if (index === 0) {
          status[index] = { title: item.title, value: true };
          status[index + 1] = { title: status[index + 1].title, value: false };
        } else {
          status[index] = { title: item.title, value: true };
          status[index - 1] = { title: status[index - 1].title, value: false };
        }

        const newObj = { Status: status, Campus: campus };
        return newObj;
      });
      // Calling Listing
      getUnitsListing('', campus, status, buyValue, leaseValue);
    } else {
      let status = filters.Status.slice();
      let campus = filters.Campus.slice();
      setFilters(() => {
        // eslint-disable-next-line
        campus.map((gItem) => {
          if (item.id === gItem.id) {
            return (gItem.value = !gItem.value);
          }
        });

        const newObj = { Campus: campus, Status: status };
        return newObj;
      });
      // Calling Listing
      getUnitsListing('', campus, status, buyValue, leaseValue);
    }
  };

  // OnClear Filters
  const onClearFilter = () => {
    setFilters(() => {
      let status = filters.Status.slice();
      let campus = filters.Campus.slice();

      status[0] = { title: status[0].title, value: false };
      status[1] = { title: status[1].title, value: false };

      campus?.map((item) => {
        return (item.value = false);
      });

      const newObj = { Campus: campus, Status: status };
      return newObj;
    });
    setBuyValue([0, 0]);
    setLeaseValue([0, 0]);

    // Calling Listing
    getUnitsListing();

    // Closing Filter Modal
    handleClose();

    // To Close DropDown
    setListOpen([]);
  };
  //************************* Filter End *******************************//

  //************************* Add Unit Start *******************************//

  // initial Values
  const initUnit = {
    newUnit: {
      id: '',
      facilityId: '',
      facilityName: '',
      unitNum: '',
      length: '',
      width: '',
      sqFeet: 'Please enter length and width of unit to calculate the Sq Ft',
      maintenanceFee: 'Please select campus to autofill maintenance fee',
      description: '',
      availableForSale: false,
      availableForLease: false,
      leasePrice: '',
      buyPrice: '',
      status: false,
      owner: '',
      ownerId: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      purchaseDate: '',
      lessee: '',
      lesseeId: '',
      lesseeName: '',
      lesseeEmail: '',
      lesseePhone: '',
      monthlyLeaseAmount: '',
      startDate: '',
      endDate: '',
      rentalFee: '',
      amenities: [],
      newUnitType: '',
      unitTitle: '',
      unitDescription: '',
      unitPassword: '',
      unitVisibility: 'PUBLIC',
      unitPublished: true,
      unitDraft: false,
      storage: [],
      url: 'https://luxelocker.com/',
      customURI: 'enter-uri',
      publishDate: '',
    },
    unitError: {
      name: '',
      msg: '',
    },
    isEmpty: {
      userInfo: '',
      ownerInfo: '',
      lesseeInfo: '',
      unitPage: '',
    },
  };

  //***** States *****//
  const [isEmpty, setIsEmpty] = useState({
    userInfo: '',
    ownerInfo: '',
    lesseeInfo: '',
    unitPage: '',
  });

  const [newUnit, setNewUnit] = useState(initUnit.newUnit);
  const [editUnitData, setEditUnitData] = useState('');
  const [editDataLoading, setEditDataLoading] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);
  const [uriError, setUriError] = useState('');
  const [error, setError] = useState('');

  //***** Methods *****//
  // setting Sq feet values on Width and Length onChange
  useEffect(() => {
    if (newUnit?.length !== '' && newUnit?.width !== '') {
      setNewUnit({
        ...newUnit,
        sqFeet: newUnit?.length * newUnit?.width,
      });
    } else {
      setNewUnit({
        ...newUnit,
        sqFeet: 'Please enter length and width of unit to calculate the Sq Ft',
      });
    }
  }, [newUnit?.length, newUnit?.width]);
  const onChangeUnits = (e) => {
    const unitNumReg = /^\S*$/;
    if (
      e.target.name === 'width' ||
      e.target.name === 'length' ||
      e.target.name === 'leasePrice' ||
      e.target.name == 'buyPrice'
    ) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '');
      setNewUnit({
        ...newUnit,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'unitNum') {
      if (unitNumReg.test(e.target.value)) {
        setNewUnit({
          ...newUnit,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setNewUnit({
        ...newUnit,
        [e.target.name]: e.target.value,
      });
    }
    setError('');
    setIsEmpty(initUnit?.isEmpty);
  };

  // Handle onChange URL
  const handleOnChangeURL = (event) => {
    if (event.target.name === 'publishDate') {
      setNewUnit((prev) => ({
        ...prev,
        publishDate: event.target.value,
      }));
    }
    const inputValue = event.target.value;
    const prefix = newUnit.url;
    const regex = /[^a-zA-Z0-9-]+/g;
    const value = inputValue.split('/')[3];
    if (!regex.test(value) || value === '') {
      if (inputValue.startsWith(prefix)) {
        const cleanedValue = value.replace(/-+/g, '-');
        setNewUnit((prev) => ({
          ...prev,
          customURI: inputValue
            .substring(prefix.length)
            .replace(value, cleanedValue),
        }));
      }
      setUriError('');
    } else {
      setUriError("You can't use underscores and special characters");
    }
  };

  const onCloseAddEditUnit = () => {
    setNewUnit(initUnit.newUnit);
    setIsEmpty(initUnit?.isEmpty);
    setAddEditLoading(false);
    closeAddEditUnit();
    setError('');
    setImages([]);
    setDeletedImages([]);
  };

  // eslint-disable-next-line
  const onEmptyCheck = () => {
    let payload = createUnitPayload();

    let isUnitInfoEmpty = checkObjectEmpty(
      payload?.unit_info,
      'isUnitInfoEmpty'
    );
    let isOwnerInfoEmpty =
      payload?.owner_info &&
      payload?.owner_info !== null &&
      payload.owner !== undefined
        ? checkObjectEmpty(payload?.owner_info, 'isOwnerInfoEmpty')
        : {};
    let isLesseeInfoEmpty =
      payload?.lessee_info &&
      payload?.lessee_info !== null &&
      payload.lessee !== undefined
        ? checkObjectEmpty(payload?.lessee_info, 'isLesseeInfoEmpty')
        : {};

    let isUnitPageEmpty = checkObjectEmpty(
      {
        ...payload?.unit_page?.title,
        description: payload?.unit_page?.description?.replaceAll(
          /<[^>]*>/g,
          ''
        ),
      },
      'isUnitPageEmpty'
    );

    if (
      Object.values(isUnitInfoEmpty).length > 0 ||
      Object.values(isOwnerInfoEmpty).length > 0 ||
      Object.values(isLesseeInfoEmpty).length > 0 ||
      Object.values(isUnitPageEmpty).length > 0
    ) {
      setIsEmpty({
        userInfo: isUnitInfoEmpty,
        ownerInfo: isOwnerInfoEmpty,
        lesseeInfo: isLesseeInfoEmpty,
        unitPage: isUnitPageEmpty,
      });
      return true;
    } else {
      return false;
    }
  };

  const checkObjectEmpty = (arrayToCheck, name) => {
    let obj = {};

    // eslint-disable-next-line
    Object.values(arrayToCheck).map((item, index) => {
      if (!newUnit.availableForSale && !newUnit.availableForLease) {
        if (
          (item === null || item === '' || item === 0 || item === undefined) &&
          Object.keys(arrayToCheck)[index] !== 'buy_price' &&
          Object.keys(arrayToCheck)[index] !== 'lease_price'
        ) {
          obj = {
            ...obj,
            [Object.keys(arrayToCheck)[index]]: true,
            [name]: true,
          };
        }
      } else if (!newUnit.availableForSale) {
        if (
          (item === null || item === '' || item === 0 || item === undefined) &&
          Object.keys(arrayToCheck)[index] !== 'buy_price'
        ) {
          obj = {
            ...obj,
            [Object.keys(arrayToCheck)[index]]: true,
            [name]: true,
          };
        }
      } else if (!newUnit.availableForLease) {
        if (
          (item === null || item === '' || item === 0 || item === undefined) &&
          Object.keys(arrayToCheck)[index] !== 'lease_price'
        ) {
          obj = {
            ...obj,
            [Object.keys(arrayToCheck)[index]]: true,
            [name]: true,
          };
        }
      } else {
        if (item === null || item === '' || item === 0 || item === undefined) {
          obj = {
            ...obj,
            [Object.keys(arrayToCheck)[index]]: true,
            [name]: true,
          };
        }
      }
    });

    return obj;
  };

  const createUnitPayload = () => {
    const newStorage = newUnit?.storage?.map((item) => item.name);
    let payload = {
      unit_info: {
        facility: newUnit.facilityId,
        unit_number: newUnit?.unitNum,
        length: parseFloat(newUnit?.length)?.toFixed(2),
        width: parseFloat(newUnit?.width)?.toFixed(2),
        // sq_ft: newUnit.sqFeet,
        // maintenance_fee: newUnit.maintenanceFee,
        unit_description:
          newUnit?.description === '' ? '' : newUnit?.description,
        lease_price: newUnit?.leasePrice === '' ? 0 : newUnit?.leasePrice,
        buy_price: newUnit?.buyPrice === '' ? 0 : newUnit?.buyPrice,
        is_active: newUnit?.status,
        is_available_for_sale: newUnit?.availableForSale,
        is_available_for_lease: newUnit?.availableForLease,
        unit_type: newUnit?.newUnitType,
        storage_feature:
          newStorage?.length === storageList?.length
            ? ['ALL TYPES']
            : newStorage,
      },
      amenity_ids: newUnit?.amenities,
      ...(((editUnitData?.ownerObject &&
        (editUnitData?.ownerObject?.owner_id !== newUnit.ownerId ||
          editUnitData?.ownerObject?.purchase_date !== newUnit.purchaseDate)) ||
        (!editUnitData?.ownerObject && newUnit.ownerId !== '')) && {
        owner_info:
          newUnit.availableForSale && newUnit.ownerId !== ''
            ? {
                owner: newUnit.ownerId,
                purchase_date: newUnit.purchaseDate,
              }
            : null,
      }),
      ...(((editUnitData?.lesseeObject &&
        (editUnitData?.lesseeObject?.lessee_id !== newUnit.lesseeId ||
          editUnitData?.lesseeObject?.start_date !== newUnit.startDate ||
          editUnitData?.lesseeObject?.end_date !== newUnit.endDate)) ||
        (!editUnitData?.lesseeObject && newUnit.lesseeId !== '')) && {
        lessee_info:
          newUnit.availableForLease && newUnit.lesseeId !== ''
            ? {
                lessee: newUnit.lesseeId,
                start_date: newUnit.startDate,
                end_date: newUnit.endDate,
              }
            : null,
      }),
      unit_page: {
        title: newUnit?.unitTitle,
        description: newUnit?.unitDescription,
        publish: newUnit?.unitDraft ? false : true,
        visibility: newUnit?.unitVisibility
          ? newUnit?.unitVisibility
          : 'PUBLIC',
        password: newUnit?.unitPassword,
        end_url: newUnit?.customURI,
        unit_publish_date: `${newUnit.publishDate}T00:00:00Z`,
      },
    };

    return payload;
  };

  const onDeleteUnitPage = () => {
    setAddEditLoading(true);
    ApiController.deleteUnitPageCall(newUnit?.unitId, (response) => {
      if (response.success) {
        onSuccesfullyEditUnit();
        setAddEditLoading(false);
        setIsEmpty(initUnit?.isEmpty);
      } else {
        setIsEmpty(initUnit?.isEmpty);
        setAddEditLoading(false);
      }
    });
  };
  const onSavePressFromAddEdit = (from) => {
    setAddEditLoading(true);
    let payload = createUnitPayload();
    Object.keys(payload).forEach((key) => {
      if (payload[key] === null) {
        delete payload[key];
      }
    });

    if (from === 'Add') {
      if (!onEmptyCheck()) {
        ApiController.addNewUnitCall(payload, (response) => {
          if (response.success) {
            if (Images.length > 0) {
              uploadImages(response?.data?.Unit_id);
            }
            setAddEditLoading(false);
            setNewUnit(initUnit.newUnit);
            setIsEmpty(initUnit?.isEmpty);
            onCloseAddEditUnit();
            getUnitsListing();
          } else {
            {
              response?.data?.[0]?.unit_number &&
                setError(response?.data?.[0]?.unit_number);
            }
            {
              response?.data?.[0]?.unit && setError(response?.data?.[0]?.unit);
            }
            setAddEditLoading(false);
            {
              response?.data?.[0]?.Stripe &&
                setError(
                  toUpperCase(response?.data?.[0]?.Stripe?.toLowerCase())
                );
            }
            setIsEmpty(initUnit?.isEmpty);
          }
        });
      } else {
        setAddEditLoading(false);
      }
    } else {
      if (!onEmptyCheck()) {
        ApiController.updateUnitCall(newUnit?.id, payload, (response) => {
          if (response.success) {
            if (Images?.length > 0 || deletedImages?.length > 0) {
              checkforImageUploadAndDelete();
              onSuccesfullyEditUnit();
            } else {
              onSuccesfullyEditUnit();
            }
          } else {
            {
              response?.data?.[0]?.unit_number &&
                setError(response?.data?.[0]?.unit_number);
            }
            {
              response?.data?.[0]?.unit_description &&
                setError(
                  response?.data?.[0]?.unit_description?.replace(
                    'this',
                    'description'
                  )
                );
            }
            {
              response?.data[0]?.non_field_errors &&
                setError(response?.data[0]?.non_field_errors?.split(':')[0]);
            }
            {
              response?.data[0]?.end_url &&
                setError(
                  response?.data[0]?.end_url?.replace('unit_page', 'Unit page')
                );
            }
            setIsEmpty(initUnit?.isEmpty);
            setAddEditLoading(false);
          }
        });
      } else {
        setAddEditLoading(false);
      }
    }
  };
  const checkforImageUploadAndDelete = () => {
    if (
      Images.length > 0 &&
      Images?.filter((item) => typeof item === 'object')
    ) {
      // Images?.map((item) => {
      // 	if (typeof item === "object" && item?.name) {
      uploadImages(newUnit?.id);
      // 	}
      // });
    }
    if (deletedImages?.length > 0) {
      deleteImages(deletedImages);
    }
  };
  const onSuccesfullyEditUnit = () => {
    setAddEditLoading(false);
    setNewUnit(initUnit.newUnit);
    setIsEmpty(initUnit?.isEmpty);
    onCloseAddEditUnit();
    getUnitsListing();
  };

  //////////// Image Related Tasks ////////////
  const [Images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const createImagePayload = () => {
    let formData = new FormData();
    Images?.map((item, index) => {
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
      } else {
      }
    });
  };

  //************************* Add Unit End *******************************//

  //************************* Unit Details Start *******************************//

  const unitDetailsInitValue = {
    campus: '',
    unitNumber: '',
    owner: '',
    accessDigitalOutput: '',
    accessPort: '',
    length: '',
    width: '',
    deviceSerialNumber: '',
    maintenanceFee: '',
    documents: '',
    availableForSale: '',
    buyPrice: '',
    availableForLease: '',
    leasePrice: '',
    insuranceType: '',
    policyNumber: '',
    policyStartDate: '',
    policyEndDate: '',
  };
  //***** States *****//
  const [unitDetailsModal, toggleUnitDetailsModal] = useState(false);
  const [unitDetails, setUnitDetails] = useState(unitDetailsInitValue);
  const [unitDetailsLoading, setUnitDetailsLoading] = useState(false);

  //***** Methods *****//
  const onClickEdit = (unit) => {
    toggleUnitDetailsModal(false);

    const unitData = unit?.rawRowData;
    const rawData = unit?.rawData;
    setEditUnitData(unitData);
    setImages(unit?.rawData?.unit_image_url);
    setNewUnit({
      title: 'Edit Unit',
      id: unitData?.id,
      description: unitData?.description,
      facilityId: unitData?.facilityId,
      facilityName: unitData?.facility,
      unitNum: unitData?.unitNumber,
      length: unitData?.length,
      width: unitData?.width,
      sqFeet: unitData?.sqFt,
      maintenanceFee: unitData?.maintenanceFee,
      availableForSale: unitData?.forSale,
      availableForLease: unitData?.forLease,
      leasePrice: unitData?.leasePrice,
      buyPrice: unitData?.buyPrice,
      status: unitData?.status,
      ...(typeof rawData?.unit_owner === 'object' && {
        owner: rawData?.unit_owner,
        ownerId: rawData?.unit_owner?.owner_id,
        ownerName: `${rawData?.unit_owner?.first_name} ${rawData?.unit_owner?.last_name}`,
        ownerEmail: rawData?.unit_owner?.email,
        ownerPhone:
          rawData?.unit_owner?.phone_no !== null
            ? rawData?.unit_owner?.phone_no
            : 'No phone number linked with selected user',
        purchaseDate: rawData?.unit_owner?.purchase_date,
        sellDate: rawData?.unit_owner?.sell_date,
      }),
      ...(typeof rawData?.unit_lessee === 'object' && {
        lessee: rawData?.unit_lessee,
        lesseeId: rawData?.unit_lessee?.lessee_id,
        lesseeName: `${rawData?.unit_lessee?.first_name} ${rawData?.unit_lessee?.last_name}`,
        lesseeEmail: rawData?.unit_lessee?.email,
        lesseePhone:
          rawData?.unit_lessee?.phone_no !== null
            ? rawData?.unit_lessee?.phone_no
            : 'No phone number linked with selected user',
        startDate: rawData?.unit_lessee?.start_date,
        endDate: rawData?.unit_lessee?.end_date,
      }),
    });

    setTimeout(() => {
      toggleAddEditUnitModal(true);
    }, 100);
  };
  const fetchUnitDetails = (unitData) => {
    setUnitDetailsLoading(true);

    ApiController.unitDetailsCall(unitData.id, (response) => {
      if (response.success) {
        const unitDatails = response?.data;
        let insuranceDoc, agreementDoc;

        if (unitDatails?.unit_lessee?.insurance_documents) {
          insuranceDoc = {
            type: 'Insurance Policy',
            name: unitDatails?.unit_number + ' Insurance',
            viewUrl: unitDatails?.unit_lessee?.insurance_documents?.replace(
              'download',
              'view'
            ),
            downloadUrl: unitDatails?.unit_lessee?.insurance_documents,
          };
        }
        if (unitDatails?.unit_lessee?.agreement_documents) {
          agreementDoc = {
            type: 'Lease Agreement',
            name: unitDatails?.unit_number + ' Lease',
            viewUrl: unitDatails?.unit_lessee?.agreement_documents?.replace(
              'download',
              'view'
            ),
            downloadUrl: unitDatails?.unit_lessee?.agreement_documents,
          };
        }

        const obj = {
          rawData: unitDatails,
          rawRowData: unitData,
          campus: unitDatails?.facility_name ? unitDatails?.facility_name : '-',
          unitNumber: unitDatails?.unit_number ? unitDatails?.unit_number : '-',
          owner: unitData?.owner ? unitData?.owner : '-',
          accessDigitalOutput: unitDatails?.access_digital_output
            ? unitDatails?.access_digital_output
            : '-',
          accessPort: unitDatails?.access_port ? unitDatails?.access_port : '-',
          length: unitDatails?.length ? unitDatails?.length : '-',
          width: unitDatails?.width ? unitDatails?.width : '-',
          deviceSerialNumber: unitDatails?.device_serial_number
            ? unitDatails?.device_serial_number
            : '-',
          maintenanceFee: unitData?.maintenanceFee
            ? unitData?.maintenanceFee
            : '-',
          insuranceDocument: insuranceDoc ? insuranceDoc : '',
          leaseDocument: agreementDoc ? agreementDoc : '',
          availableForSale: unitDatails?.is_available_for_sale
            ? unitDatails?.is_available_for_sale
            : '-',
          buyPrice: unitDatails?.buy_price ? unitDatails?.buy_price : '-',
          availableForLease: unitDatails?.is_available_for_lease
            ? unitDatails?.is_available_for_lease
            : '-',
          leasePrice: unitDatails?.lease_price ? unitDatails?.lease_price : '-',
          insuranceType: unitDatails?.unit_lessee
            ? unitDatails?.unit_lessee?.self_insurance_policy_number !== null
              ? 'Self'
              : 'LuxeLocker'
            : '-',
          policyNumber: unitDatails?.unit_lessee?.self_insurance_policy_number
            ? unitDatails?.unit_lessee?.self_insurance_policy_number
            : '-',
          policyStartDate: unitDatails?.unit_lessee?.start_date
            ? unitDatails?.unit_lessee?.start_date
            : '-',
          policyEndDate: unitDatails?.unit_lessee?.end_date
            ? unitDatails?.unit_lessee?.end_date
            : '-',
        };

        setUnitDetails(obj);
        setUnitDetailsLoading(false);
      } else {
        setUnitDetailsLoading(false);
        setNetworkError(true);
      }
    });
  };

  const onRowSelect = (unitData) => {
    fetchUnitDetails(unitData);
    toggleUnitDetailsModal(true);
  };

  //************************* Unit Details End *******************************//

  //************************* Amenities Listing Start *******************************//

  const getAmenityListing = (name, callback) => {
    ApiController.fetchCampusesCall(name, '', newUnit?.status, (response) => {
      if (response?.success) {
        const amenitiesData = response?.data[0]?.amenities;
        callback(amenitiesData);
      } else {
        setNetworkError(true);
        callback([]);
      }
    });
  };

  //************************* Amenities Listing End *******************************//

  //************************* Delete Unit Start *******************************//

  //***** States *****//
  const [deleteUnitModal, toggledeleteUnitModal] = useState(false);
  const [deleteUnitLoading, setDeleteUnitLoading] = useState(false);

  const [deleteUnit, setDeleteUnit] = useState({});

  //***** Methods *****//

  const onDelete = (id) => {
    setDeleteUnitLoading(true);

    ApiController.deleteUnitCall(id, (response) => {
      if (response.success) {
        setDeleteUnit({});
        getUnitsListing();
        setDeleteUnitLoading(false);
        toggledeleteUnitModal(false);
      } else {
        setDeleteUnitLoading(false);
        {
          response?.data[0]?.['UNIT HAVE ACTIVE ALLOTMENT'] &&
            setError(response?.data[0]?.['UNIT HAVE ACTIVE ALLOTMENT']);
        }
      }
    });
  };

  //************************* Delete Unit End *******************************//

  return (
    <>
      <UnitsUI
        // Selestion State
        selectionIds={selectionIds}
        setSelectionIds={setSelectionIds}
        // Table Data
        unitColumnData={unitsColumnData}
        unitColumnExtensionsData={unitsColumnExtensionsData}
        // unitRowData={unitsRowData}
        unitRowData={units?.length > 0 ? units : []}
        // Table Methods
        dataProviders={dataProviders}
        // Open Unit Details Modal
        onRowSelect={(userDate) => onRowSelect(userDate)}
        // SearchBar States
        searchText={searchText}
        // SearchBar Method
        onChangeSearch={onChangeSearch}
        onUnitsSearch={onUnitsSearch}
        onClear={onClear}
        // Filter Modal States
        anchorEl={anchorEl}
        id={id}
        open={open}
        listOpen={listOpen}
        filters={filters}
        selectedCampusString={'Spanish Springs, Boise, ID Phase 2'}
        // Filter Modal Methods
        handleClick={handleClick}
        handleClose={handleClose}
        clickAwayHandler={clickAwayHandler}
        handleClickForParent={handleClickForParent}
        onChangeFilter={onChangeFilter}
        onClearFilter={onClearFilter}
        clearPriceRange={clearPriceRange}
        listingCallWithPriceRange={listingCallWithPriceRange}
        // Filter Buy Range
        buyValue={buyValue}
        buyHandleChanges={buyHandleChanges}
        leaseValue={leaseValue}
        leaseHandleChanges={leaseHandleChanges}
        // Loading to show view after API Call
        loading={unitsListLoading}
        networkError={networkError}
        reCallListing={reCallListing}
      />

      {/************************* Modals *******************************/}

      {/* Add / Edit Unit Modal */}
      <AddEditUnitUI
        open={openAddEditUnit}
        close={onCloseAddEditUnit}
        campuses={filters?.Campus}
        newUnit={newUnit}
        setNewUnit={setNewUnit}
        onChange={onChangeUnits}
        loading={addEditLoading}
        onSave={onSavePressFromAddEdit}
        onDeleteUnitPage={onDeleteUnitPage}
        isEmpty={isEmpty}
        setIsEmptyToInit={() => setIsEmpty(initUnit?.isEmpty)}
        error={error}
        Images={Images}
        setImages={setImages}
        data={unitDetails}
        deletedImages={deletedImages}
        setDeletedImages={setDeletedImages}
        editDataLoading={editDataLoading}
        getAmenityListing={getAmenityListing}
        storageList={storageList}
        storageSelectAll={storageSelectAll}
        setStorageSelectAll={setStorageSelectAll}
        uriError={uriError}
        onChangeURI={handleOnChangeURL}
      />

      {/* Unit Details */}
      <UnitDetails
        open={unitDetailsModal}
        close={() => {
          setUnitDetails(unitDetailsInitValue);
          toggleUnitDetailsModal(false);
        }}
        data={unitDetails}
        onClickEdit={onClickEdit}
        loading={unitDetailsLoading}
      />

      {/* Delete Unit */}
      <DeleteUnit
        open={deleteUnitModal}
        close={() => {
          setError(''), toggledeleteUnitModal(false);
        }}
        data={deleteUnit}
        onDelete={onDelete}
        loading={deleteUnitLoading}
        error={error}
      />

      {/* Import Data CSV Modal */}
      <ImportUnitsModal
        open={openCSVModal}
        closeImportDataModal={closeImportDataModal}
        listingCall={getUnitsListing}
        facilitiesList={facilitiesList}
      />
    </>
  );
};

export default UnitsTab;
