import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import UnitTable from "../../../../../components/Tables/Table"

const UnitPageUI = ({
    loading,
    selectionIds,
    setSelectionIds,
    unitColumnData,
    unitColumnExtensionsData,
    unitRowData,
    dataProviders,
    onChangeSearch,
    onUnitsSearch,
    onClear,
    searchText,
}) => {
    return (
        <div className='main-container px-6 pt-3'>
            <div className='flex flex-row justify-between align-items-center py-3 gap-5'>
                <div className='flex-1'>
                    <SearchBar
                      disabled={selectionIds.length > 0 ? true : false}
                      onSearch={() => onUnitsSearch()}
                      onClear={() => onClear()}
                      onChange={onChangeSearch}
                      value={searchText}
                    />
                </div>
            </div>

            {loading ? (
                <InsideSpinner />
            ) : (
                <UnitTable
                    rows={unitRowData}
                    columns={unitColumnData}
                    tableColumnExtensions={unitColumnExtensionsData}
                    dataProviders={dataProviders}
                    selectionIds={selectionIds}
                    setSelectionIds={setSelectionIds}
                />
            )}
        </div>
    )
}

export default UnitPageUI