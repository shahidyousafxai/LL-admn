import { useState, useEffect } from 'react';
import MeetTheTeamUI from './MeetTheTeamUI';
import {
  teamColumnData,
  teamColumnExtensionsData,
  teamRowData,
} from '../../../../../components/Tables/dummyData';
import { Action } from '../../../../../components/Tables/utils';
import ApiController from '../../../../../utils/network/api';
import DeleteModal from '../../../../../components/DeleteModal';
import MeetTheTeamModal from './MeetTheTeamModal';

const MeetTheTeam = () => {
  const [meetTheTeamModal, setMeetTheTeamModal] = useState(false);
  const [meetTheTeamType, setMeetTheTeamType] = useState('');
  const [selectionIds, setSelectionIds] = useState([]);
  const [ColumnSetting1] = useState(['summary']);
  const [ColumnSetting2] = useState(['action']);
  const [addNewMemberLoading, setAddNewMemberLoading] = useState(false);
  const [teamListLoading, setTeamListLoading] = useState(false);
  const [teamListing, setTeamListing] = useState([]);
  const [meetTeam, setMeetTeam] = useState({
    id: '',
    name: '',
    title: '',
    summary: '',
    order: '',
    teamImage: [],
  });

  // Delete Modal States
  const [deleteTeamMemberData, setDeleteTeamMemberData] = useState({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const Summary = (restProps) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: restProps?.value,
        }}
      ></div>
    );
  };

  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Summary(restProps),
    },
    {
      columnName: ColumnSetting2,
      func: (restProps) => Action(restProps, onActionClick),
    },
  ];

  const getTeamListing = (name) => {
    setTeamListLoading(true);
    ApiController.getMeetTheTeamListCall((response) => {
      if (response?.success) {
        setTeamListing([...response?.data]);
        setTeamListLoading(false);
      } else {
        setTeamListing([]);
        setTeamListLoading(false);
      }
    });
  };

  useEffect(() => {
    getTeamListing();
  }, []);

  const createPayload = () => {
    let formData = new FormData();
    formData.append('name', meetTeam?.name);
    formData.append('title', meetTeam?.title);
    formData.append('summary', meetTeam?.summary);
    formData.append(
      'image',
      typeof meetTeam?.teamImage === 'object' ? meetTeam?.teamImage[0] : ''
    );
    formData.append('order', meetTeam?.order);
    return formData;
  };

  const handleAddNewTeamMember = () => {
    setAddNewMemberLoading(true);

    if (meetTheTeamType === 'edit') {
      ApiController.updateMeetTheTeamMemberCall(
        meetTeam?.id,
        createPayload(),
        (response) => {
          if (response?.success) {
            setAddNewMemberLoading(false);
            setMeetTheTeamModal(false);
            setMeetTeam({
              id: '',
              name: '',
              title: '',
              summary: '',
              teamImage: [],
            });
            getTeamListing();
          } else {
            setAddNewMemberLoading(false);
            setMeetTheTeamModal(false);
            getTeamListing();
          }
        }
      );
    } else if (meetTheTeamType === 'add') {
      ApiController.addNewTeamMemberCall(createPayload(), (response) => {
        if (response?.success) {
          setAddNewMemberLoading(false);
          setMeetTheTeamModal(false);
          setMeetTeam({
            id: '',
            name: '',
            title: '',
            summary: '',
            teamImage: [],
          });
          getTeamListing();
        } else {
          setAddNewMemberLoading(false);
          setMeetTheTeamModal(false);
          getTeamListing();
        }
      });
    }
  };

  const onActionClick = (type, teamData) => {
    if (type === 'edit') {
      setMeetTheTeamType('edit');
      setMeetTheTeamModal(true);
      setMeetTeam({
        id: teamData?.id,
        name: teamData?.name,
        title: teamData?.title,
        summary: teamData?.summary,
        teamImage: teamData?.image,
        order: teamData?.order,
      });
    } else if (type === 'delete') {
      setDeleteTeamMemberData(teamData);
      setIsOpenDeleteModal(true);
    }
  };

  // =================  Search Bar Methods Start ================= //

  //***** States *****//
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
    } else {
      setSearchText('');
      // getCampusesPageListing();
    }
  };
  const onCampusSearch = () => {
    if (searchText) {
      // getCampusesPageListing(searchText);
    }
  };
  // onSearch Clear
  const onClear = () => {
    setSearchText('');
    // getCampusesListing();
  };

  // =================  Search Bar Methods End ================= //

  // =================  Delete Modal Methods Start ================= //
  const handleOnDelete = (id) => {
    setDeleteLoading(true);
    ApiController.deleteMeetTheTeamMemberCall(id, (response) => {
      if (response?.success) {
        setDeleteLoading(false);
        setDeleteError('');
        setIsOpenDeleteModal(false);
        getTeamListing();
      } else {
        setDeleteLoading(false);
        setDeleteError(response?.message);
      }
    });
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setDeleteError('');
    setDeleteLoading(false);
    setDeleteTeamMemberData({});
  };

  // =================  Delete Modal Methods End ================= //

  return (
    <div>
      <MeetTheTeamUI
        // Selestion State
        selectionIds={selectionIds}
        setSelectionIds={setSelectionIds}
        // Table Data
        teamColumnData={teamColumnData}
        teamColumnExtensionsData={teamColumnExtensionsData}
        teamRowData={teamListing.length > 0 ? teamListing : []}
        // Table Methods
        dataProviders={dataProviders}
        // SearchBar States
        searchText={searchText}
        // SearchBar Method
        onChangeSearch={onChangeSearch}
        onCampusSearch={onCampusSearch}
        onClear={onClear}
        meetTheTeamType={meetTheTeamType}
        setMeetTheTeamType={setMeetTheTeamType}
        setMeetTheTeamModal={setMeetTheTeamModal}
        teamListLoading={teamListLoading}
      />
      <MeetTheTeamModal
        open={meetTheTeamModal}
        meetTeam={meetTeam}
        setMeetTeam={setMeetTeam}
        onAddNewTeamMember={handleAddNewTeamMember}
        loading={addNewMemberLoading}
        meetTheTeamType={meetTheTeamType}
        close={() => {
          setMeetTheTeamModal(false);
          setAddNewMemberLoading(false);
          setMeetTeam({
            id: '',
            name: '',
            title: '',
            summary: '',
            teamImage: [],
          });
        }}
      />
      <DeleteModal
        id={deleteTeamMemberData?.id}
        title='Delete Team Member'
        open={isOpenDeleteModal}
        close={closeDeleteModal}
        deleteTitle={deleteTeamMemberData?.title}
        onDelete={handleOnDelete}
        loading={deleteLoading}
        error={deleteError}
        data={deleteTeamMemberData}
      />
    </div>
  );
};

export default MeetTheTeam;
