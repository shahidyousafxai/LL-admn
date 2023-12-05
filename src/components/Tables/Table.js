// Library Imports
import React, { useState } from 'react';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import DescriptionIcon from '@mui/icons-material/Description';

// Local Imports
import CustomPagination from './CustomPagination';
import {
  gray,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/style/GlobalVariables';
import CheckBox from '../checkBox';
// import './table.css'

// For Exporting table anonymously without making it Const
export default ({
  id,
  onRowSelect,
  rows,
  columns,
  tableColumnExtensions,
  dataProviders,
  selectionIds,
  setSelectionIds,
  pagination,
  multiSelection,
  withoutTabs,
  fromAnnouncements,
  unitsSelectedCampus,
}) => {
  const [selection, setSelection] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageSizes] = useState([20, 50, 100]);

  const tableHeaderComponent = (restProps) => {
    if (selectionIds?.length) {
      //************************* Custom header component for table *******************************/
      if (
        restProps.column.name === 'fname' ||
        restProps.column.name === 'name' ||
        restProps.column.name === 'campusName' ||
        restProps.column.name === 'campus' ||
        restProps.column.name === 'unit' ||
        restProps.column.name === 'category' ||
        restProps.column.name === 'FAQs' ||
        restProps.column.name === 'announcement' ||
        restProps.column.name === 'blogTitle' ||
        restProps.column.name === 'facility'
      ) {
        return (
          <Table.Row>
            <div
              style={{ backgroundColor: secondaryColor }}
              className='flex flex-row  p-1 justify-content-between align-items-center rounded'
            >
              <div
                style={{ backgroundColor: primaryColor }}
                className='flex flex-row justify-content-between align-items-center border-end rounded mr-2 ml-1 p-1 px-3'
              >
                <div
                  onClick={() => {
                    setSelectionIds([]);
                    setSelection([]);
                  }}
                  className='cursor-pointer'
                  style={{
                    width: 18,
                    height: 18,
                    borderStyle: 'solid',
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: 'white',
                    textAlign: 'center',
                    backgroundColor: primaryColor,
                  }}
                >
                  <div
                    style={{ position: 'relative', top: -5 }}
                    className='text-white'
                  >
                    -
                  </div>
                </div>
                <div
                  style={{ fontSize: 13, marginLeft: 10, color: white }}
                  className='w-max'
                >
                  {selectionIds?.length} Selected
                </div>
              </div>

              {/* <div style={{ backgroundColor: primaryColor }} onClick={() => setIsopen(!isOpen)} className='flex flex-row pointer justify-content-between align-items-center rounded border-end p-1 mr-2 px-3'>
              <Add color="info" fontSize='small' />
              <div style={{ fontSize: 13, color: white, marginLeft: 10, width: 100 }}>Add to Facilities</div>
            </div>

            <div style={{ backgroundColor: primaryColor }} onClick={() => {
              setIsMultiDelete(true)
            }} className='flex flex-row pointer justify-content-between align-items-center rounded p-1 px-3'>
              <DeleteIcon color='danger' fontSize='small' />
              <div style={{ fontSize: 13, color: white, marginLeft: 10 }}>Delete</div>
            </div> */}
            </div>
          </Table.Row>
        );
      }
    } else {
      return (
        <Table.Cell
          {...restProps}
          sx={{
            '& .css-gxs2o2.Content-content': {
              ...(restProps.column.name === 'action' && {
                justifyContent: 'flex-end !important',
                paddingRight: '40px !important',
              }),
              ...(restProps.column.name === 'action' &&
                fromAnnouncements && {
                  justifyContent: 'flex-end !important',
                  paddingRight: '82px !important',
                }),
            },
          }}
          style={{
            paddingLeft:
              (restProps.column.name === 'name' ||
                restProps.column.name === 'Sr#' ||
                restProps.column.name === 'zone' ||
                restProps.column.name === 'facility' ||
                restProps.column.name === 'campus' ||
                restProps.column.name === 'unit' ||
                restProps.column.name === 'category' ||
                restProps.column.name === 'FAQs' ||
                restProps.column.name === 'announcement') &&
              23,
            borderTop: '0px #85878D',
            borderColor: secondaryColor,
            fontSize: 11,
            color: gray,
            fontFamily: 'Inter-Medium',
          }}
        />
      );
    }
  };

  const rowComponent = (restProps) => {
    const odd = !!(restProps.tableRow.rowId % 2);
    return (
      <Table.Row
        {...restProps}
        style={{ background: odd ? secondaryColor : null }}
      />
    );
  };

  const cellComponent = (restProps) => {
    return (
      <Table.Cell
        {...restProps}
        onClick={() => {
          onRowSelect &&
            restProps.column.name !== 'action' &&
            onRowSelect(restProps.row);
        }}
        style={{
          color: white,
          border: 'none',
          fontFamily: 'Inter-Regular',
          fontSize: 13,
          cursor:
            onRowSelect && restProps.column.name !== 'action' && 'pointer',
        }}
      />
    );
  };

  //************************* Custom selection component for facilities table *******************************/

  const selectionCellComponent = (restProps) => {
    let id = restProps.row.id;

    return (
      <div className='form-check form-check-sm form-check-custom form-check-solid ml-6 ms-4 mt-3'>
        <CheckBox
          checked={restProps.selected}
          onChange={() => {
            if (selectionIds.includes(id)) {
              const array = selectionIds.filter(function (ele) {
                return ele !== id;
              });
              setSelectionIds(array);
            } else {
              setSelectionIds([...selectionIds, id]);
            }
            restProps.onToggle();
          }}
        />
      </div>
    );
  };

  //************************* Custom selection header component for facilities table *******************************/

  const selectionHeaderCellComponent = (restProps) => {
    let array = [];
    let indexArray = [];
    rows.map((item, index) => {
      return indexArray.push(index), array.push(item.id);
    });
    if (selectionIds?.length) {
      return null;
    } else {
      return (
        <Table.Cell {...restProps} style={{ borderColor: secondaryColor }}>
          <div
            onClick={() => {
              setSelection(indexArray);
              setSelectionIds(array);
            }}
            style={{
              cursor: 'pointer',
              width: 16,
              height: 16,
              borderStyle: 'solid',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: gray,
              textAlign: 'center',
              justifyContent: 'center',
              marginLeft: -2,
            }}
          ></div>
        </Table.Cell>
      );
    }
  };

  // Empty Table Component
  const emptyTableComponent = (props) => (
    <Table.NoDataRow {...props}>
      <div className='flex flex-col w-screen items-center mt-5 -ml-48'>
        <DescriptionIcon fontSize='large' color='info' />
        <p
          className='mt-2'
          style={{ color: white, fontFamily: 'Inter-Regular', fontSize: 13 }}
        >
          No data found.
        </p>
      </div>
    </Table.NoDataRow>
  );

  return (
    <div
      style={{ display: 'flex', height: '86%', minWidth: 300 }}
      className='overflow-x-auto overflow-y-hidden'
    >
      <Grid rows={rows} columns={columns}>
        <VirtualTable />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        {dataProviders?.map((dataProvider, index) => {
          return (
            <DataTypeProvider
              key={index}
              for={dataProvider.columnName}
              formatterComponent={dataProvider.func}
            />
          );
        })}
        {!multiSelection && (
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
        )}
        {!pagination && <IntegratedPaging />}
        {!multiSelection && <IntegratedSelection />}
        {!pagination ? (
          <Table
            // FIXME: Later fix this code
            containerComponent={(props) => {
              return (
                <Table.Container
                  {...props}
                  style={{
                    height: withoutTabs
                      ? window.innerHeight * 0.8
                      : unitsSelectedCampus
                      ? window.innerHeight * 0.7
                      : window.innerHeight * 0.725,
                  }}
                />
              );
            }}
            noDataRowComponent={emptyTableComponent}
            columnExtensions={
              tableColumnExtensions ? tableColumnExtensions : []
            }
            rowComponent={rowComponent}
            cellComponent={cellComponent}
          />
        ) : (
          <Table
            containerComponent={(props) => {
              return (
                <Table.Container
                  {...props}
                  style={{ height: window.innerHeight * 0.5 }}
                />
              );
            }}
            noDataRowComponent={emptyTableComponent}
            columnExtensions={
              tableColumnExtensions ? tableColumnExtensions : []
            }
            rowComponent={rowComponent}
            cellComponent={cellComponent}
          />
        )}
        <TableHeaderRow cellComponent={tableHeaderComponent} />
        {!multiSelection && (
          <TableSelection
            showSelectAll
            headerCellComponent={selectionHeaderCellComponent}
            cellComponent={selectionCellComponent}
          />
        )}
        {!pagination && (
          <PagingPanel
            pageSizes={pageSizes}
            containerComponent={
              rows?.length
                ? CustomPagination
                : () => {
                    return null;
                  }
            }
          />
        )}
      </Grid>
    </div>
  );
};
