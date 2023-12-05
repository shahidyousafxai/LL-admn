import React from 'react';
import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import Add from '@mui/icons-material/Add';
import Button from '../../../../../components/button';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import TeamTable from '../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';

const MeetTheTeamUI = ({
    selectionIds,
    setSelectionIds,
    teamColumnData,
    teamColumnExtensionsData,
    dataProviders,
    teamRowData,
    onChangeSearch,
    onTeamSearch,
    onClear,
    searchText,
    setMeetTheTeamType,
    setMeetTheTeamModal,
    teamListLoading,
}) => {
    return (
        <div className='main-container px-6 pt-3'>
            <div className='flex flex-row justify-between align-items-center py-3 gap-5'>
                <div className='flex-1'>
                    <SearchBar
                        disabled={selectionIds.length > 0 ? true : false}
                        onSearch={() => onTeamSearch()}
                        onClear={() => onClear()}
                        onChange={onChangeSearch}
                        value={searchText}
                    />
                </div>
                <Button
                    startIcon={<Add fontSize='small' color={`${teamListLoading ? 'secondary' : 'primary'}`} />}
                    className={`text-sm !normal-case flex-2  ${teamListLoading ? 'text-gray-400' : 'text-black'}`}
                    height={37}
                    style={teamListLoading ? Styles?.disableBtn : Styles.activeBtn}
                    component='span'
                    variant='contained'
                    disabled={teamListLoading}
                    onClick={() => {
                        setMeetTheTeamModal(true);
                        setMeetTheTeamType('add');
                    }}
                >
                    <p style={teamListLoading ? Styles?.disableBtnText : Styles.activeBtnText}>
                        {'Add Team Member'}
                    </p>
                </Button>
            </div>

            {teamListLoading ? (
                <InsideSpinner />
            ) : (
                <TeamTable
                    rows={teamRowData}
                    columns={teamColumnData}
                    tableColumnExtensions={teamColumnExtensionsData}
                    dataProviders={dataProviders}
                    selectionIds={selectionIds}
                    setSelectionIds={setSelectionIds}
                />
            )}
        </div>
    )
}

export default MeetTheTeamUI