// Library Imports
import { useEffect, useState } from 'react';
import { PagingPanel } from '@devexpress/dx-react-grid-material-ui';

import './style.css';
import { gray, secondaryColor, white } from '../../utils/style/GlobalVariables';

const CustomPagination = (restProps) => {
  const [pages, setPages] = useState([]);
  const [pagesNextState, setPagesNextState] = useState(false);
  const [pagesPreviouseState, setPagesPreviousState] = useState(false);
  const [lastLimit, setLastLimit] = useState(false);
  const [startingRecords, setStartingRecords] = useState(1);
  const [endingRecords, setEndingRecords] = useState(restProps.pageSize);

  let goToPageArray = [];

  for (let i = 1; i <= restProps.totalPages; i++) {
    goToPageArray.push(i);
  }
  useEffect(() => {
    if (restProps.totalPages === 1) {
      setPages([1]);
      restProps.onCurrentPageChange(restProps.currentPage);
    } else if (restProps.totalPages === 2) {
      setPages([1, 2]);
      restProps.onCurrentPageChange(restProps.currentPage - 1);
    } else if (restProps.totalPages === 3) {
      setPages([1, 2, 3]);
      restProps.onCurrentPageChange(restProps.currentPage - 1);
    } else if (restProps.totalPages === 4) {
      setPages([1, 2, 3, 4]);
      restProps.onCurrentPageChange(restProps.currentPage - 1);
    } else if (restProps.totalPages > 4) {
      restProps.onCurrentPageChange(restProps.currentPage - 1);
      setPages([1, 2, restProps.totalPages - 1, restProps.totalPages]);
    }
    // eslint-disable-next-line
  }, [restProps.totalPages, restProps.pageSize]);

  useEffect(() => {
    if (pagesNextState) {
      if (restProps.currentPage + 2 > pages[1]) {
        if (
          restProps.currentPage + 2 !== restProps.totalPages - 1 &&
          restProps.currentPage + 2 !== restProps.totalPages
        ) {
          setPages([
            pages[0] + 1,
            pages[0] + 2,
            restProps.totalPages - 1,
            restProps.totalPages,
          ]);
        }
      }
      restProps.onCurrentPageChange(restProps.currentPage + 1);
      setPagesNextState(false);
    }
    // eslint-disable-next-line
  }, [pagesNextState]);

  useEffect(() => {
    if (lastLimit) {
      if (restProps.currentPage + 1 === restProps.totalPages - 1) {
        setPages([
          restProps.totalPages - 3,
          restProps.totalPages - 2,
          restProps.totalPages - 1,
          restProps.totalPages,
        ]);
        restProps.onCurrentPageChange(restProps.currentPage);
        setLastLimit(false);
      } else if (restProps.currentPage + 1 === restProps.totalPages) {
        setPages([
          restProps.totalPages - 3,
          restProps.totalPages - 2,
          restProps.totalPages - 1,
          restProps.totalPages,
        ]);
        restProps.onCurrentPageChange(restProps.currentPage + 1);
        setLastLimit(false);
      }
    }
    // eslint-disable-next-line
  }, [lastLimit]);

  useEffect(() => {
    if (pagesPreviouseState) {
      if (restProps.currentPage < pages[0]) {
        setPages([
          pages[1] - 2,
          pages[1] - 1,
          restProps.totalPages - 1,
          restProps.totalPages,
        ]);
      }
      restProps.onCurrentPageChange(restProps.currentPage - 1);
      setPagesPreviousState(false);
    }
    // eslint-disable-next-line
  }, [pagesPreviouseState]);

  let totalPages = [];

  for (let i = 1; i <= restProps.totalPages; i++) {
    totalPages.push(i);
  }

  var custoPagingProps = { ...restProps };
  custoPagingProps.totalPages = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: secondaryColor,
        borderTopStyle: 'solid',
        height: 40,
        marginTop: 1,
      }}
    >
      <PagingPanel.Container
        style={{
          color: white,
          fontFamily: 'Inter-Regular',
          fontSize: 13,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '97%',
        }}
        {...custoPagingProps}
        sx={{
          '& .MuiInputBase-root': {
            color: white,
          },
          '& .MuiSvgIcon-root': {
            color: white,
          },
          '& .MuiButtonBase-root': {
            display: 'none',
          },
        }}
      />

      <div
        className='w-auto float-end'
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: -8,
          marginLeft: -20,
        }}
      >
        <ul className='pagination mt-2 flex flex-row'>
          <li
            className={
              restProps.currentPage > 0
                ? 'page-item next cursor-pointer'
                : 'page-item next disabled'
            }
          >
            <div
              style={{ borderWidth: 0, cursor: 'pointer' }}
              onClick={() => {
                setStartingRecords(startingRecords - restProps.pageSize);
                if (endingRecords - startingRecords <= 3) {
                  setEndingRecords(endingRecords - restProps.pageSize + 1);
                } else {
                  setEndingRecords(endingRecords - restProps.pageSize);
                }
                if (restProps.currentPage - 1 < pages[0]) {
                  setPagesPreviousState(true);
                } else {
                  restProps.onCurrentPageChange(
                    restProps.currentPage === 0
                      ? restProps.currentPage
                      : restProps.currentPage - 1
                  );
                }
              }}
              className='page-link'
            >
              <div style={{ color: gray }} className='mr-5'>
                {'<'}
              </div>
            </div>
          </li>
          <li
            className={
              restProps.currentPage !== restProps.totalPages - 1
                ? 'page-item next cursor-pointer'
                : 'page-item next disabled'
            }
          >
            <div
              style={{ borderWidth: 0, cursor: 'pointer' }}
              onClick={() => {
                setStartingRecords(startingRecords + restProps.pageSize);
                if (restProps.totalCount - endingRecords < 5) {
                  setEndingRecords(
                    restProps.totalCount -
                      endingRecords +
                      startingRecords +
                      restProps.pageSize -
                      1
                  );
                } else {
                  setEndingRecords(endingRecords + restProps.pageSize);
                }
                if (restProps.currentPage + 2 > pages[0]) {
                  setPagesNextState(true);
                } else {
                  restProps.onCurrentPageChange(
                    restProps.currentPage === restProps.totalPages - 1
                      ? restProps.currentPage
                      : restProps.currentPage + 1
                  );
                }
              }}
              className='page-link'
            >
              <div style={{ color: gray }}>{'>'}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomPagination;
