//Library Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { Box, Typography } from '@mui/material';
import Papa from 'papaparse';

// Local Imports
import CustomModal from '../../../../../../components/Modal/Modal';
import Button from '../../../../../../components/button';
import {
  secondaryColor,
  yellow,
  primaryColor,
  white,
  gray,
} from '../../../../../../utils/style/GlobalVariables';
import { staticHeaders } from '../../../../../../components/Tables/dummyData';
import ApiController from '../../../../../../utils/network/api';
import { Styles } from '../../../../../../utils/style/GlobalStyles';

const ImportUnitsModal = ({
  open,
  closeImportDataModal,
  listingCall,
  facilitiesList,
}) => {
  //States For Handling file
  const [fileName, setFileName] = useState('');
  const [extraHeaders, setExtraHeaders] = useState([]);
  const [missingHeaders, setMissingHeaders] = useState([]);
  const [emptyFieldsVal, setEmptyFieldsVal] = useState([]);
  const [csvFile, setCSVFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [headersErr, setHeadersErr] = useState(false);
  const [fileTypeErr, setFileTypeErr] = useState(false);
  const [fileSizeErr, setFileSizeErr] = useState(false);
  const [emptyFile, setEmptyFile] = useState(false);

  // Handle Input OnChange
  const handleFileonChange = (e) => {
    const file = e.target.files[0];
    if (file.type === 'text/csv') {
      if (file.size <= 50000000 && file.size !== 0) {
        handleCSV(file);
        setFileName(file.name);
      } else {
        setFileSizeErr(true);
      }
    } else {
      setFileTypeErr(true);
    }
  };

  // Match Headers of File
  const matchHeadersCSV = (result) => {
    const commingHeaders = result?.meta?.fields.map((string) => {
      if (string.trim() === '') {
        return string;
      } else {
        return string.replace(/\s/g, '');
      }
    });

    let missingHeader = staticHeaders.filter(
      (item) => commingHeaders.indexOf(item) === -1
    );

    let extraHeader = commingHeaders.filter(
      (item) => staticHeaders.indexOf(item) === -1
    );

    if (missingHeader.length > 0 || extraHeader.length > 0) {
      setHeadersErr(true);
      setMissingHeaders(missingHeader);
      setExtraHeaders(extraHeader);
      return false;
    } else {
      return true;
    }
  };

  // Handle Onchange Inner Fucntion
  const handleCSV = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const isMatched = matchHeadersCSV(result);
        if (isMatched) {
          const data = result?.data;
          console.log('🚀 ~ file: ImportData.jsx:89 ~ handleCSV ~ data:', data);
          const array1 = [];
          const array2 = [];
          const duplicateUnits = [];
          const unitNumbers = new Set();

          const duplicateEndUrls = [];
          const endUrls = new Set();

          if (data?.length > 0) {
            data.map((rowItem, rowIndex) => {
              const {
                is_available_for_sale,
                is_available_for_lease,
                lease_price,
                buy_price,
                ...otherFields
              } = rowItem;
              console.log('rowitem', rowItem);
              //Check Lease Price Is Required
              if (
                is_available_for_lease?.toLowerCase()?.trim() === 'true' &&
                lease_price === ''
              ) {
                array1.push({
                  rowNumber: rowIndex + 1,
                  fieldName: 'lease_price',
                });
              }
              //Check Buy Price Is Required
              if (
                is_available_for_sale?.toLowerCase()?.trim() === 'true' &&
                buy_price === ''
              ) {
                array1.push({
                  rowNumber: rowIndex + 1,
                  fieldName: 'buy_price',
                });
              }
              // Check if Visibility is Protected
              if (
                rowItem?.visibility?.toLowerCase()?.trim() ===
                  'password_protected' &&
                rowItem?.password === ''
              ) {
                console.log('here is exe');
                array1.push({
                  rowNumber: rowIndex + 1,
                  fieldName: 'password',
                });
              }
              // Check Other Fields Is Empty Except Lease Price && Buy Price
              staticHeaders.map((colItem, colIndex) => {
                if (
                  colItem !== 'buy_price' &&
                  colItem !== 'lease_price' &&
                  colItem !== 'visibility' &&
                  colItem !== 'password'
                ) {
                  if (rowItem[colItem] === '') {
                    array2.push({
                      rowNumber: rowIndex + 1,
                      fieldName: colItem,
                    });
                  }
                }

                // Check Here Unit_Number Is Unique
                if (colItem === 'unit_number') {
                  const unitItem = rowItem[colItem]?.toLowerCase();
                  if (unitNumbers.has(unitItem)) {
                    duplicateUnits.push({
                      rowNumber: rowIndex + 1,
                      fieldName: 'unit_number',
                      value: unitItem,
                    });
                  } else {
                    unitNumbers.add(unitItem);
                  }
                }

                // Check Here End Url Is Unique
                if (colItem === 'end_url') {
                  const endUrl = rowItem[colItem]?.toLowerCase();
                  if (endUrls.has(endUrl)) {
                    duplicateEndUrls.push({
                      rowNumber: rowIndex + 1,
                      fieldName: 'end_url',
                      value: endUrl,
                    });
                  } else {
                    endUrls.add(endUrl);
                  }
                }
              });
            });
            const checkFacilityNames = data?.reduce((result, item, index) => {
              const facility = facilitiesList.find(
                (facility) =>
                  facility.name?.toLowerCase()?.trim() ===
                  item.facility?.toLowerCase()?.trim()
              );

              if (!facility) {
                result.push({
                  rowNumber: index + 1,
                  fieldName: 'facility',
                  facility: true,
                });
              }

              return result;
            }, []);
            console.log('array1', array1);
            console.log('array2', array2);
            console.log('duplicateUnits', duplicateUnits);
            setEmptyFieldsVal(
              [
                ...array1,
                ...array2,
                ...duplicateUnits,
                ...duplicateEndUrls,
                ...checkFacilityNames,
              ].sort((a, b) => a.rowNumber - b.rowNumber)
            );
            const finalEmptyRowsFields = array1
              .concat(array2)
              .concat(duplicateUnits)
              .concat(duplicateEndUrls)
              .concat(checkFacilityNames);
            console.log(
              '🚀 ~ file: ImportData.jsx:202 ~ handleCSV ~ finalEmptyRowsFields:',
              finalEmptyRowsFields
            );

            if (finalEmptyRowsFields?.length === 0) {
              setCSVFile(file);
            } else {
              setCSVFile('');
            }
          } else {
            setEmptyFile(true);
          }
        }
      },
    });
  };

  // Handle onDrop File
  const handleonDropFile = (e) => {
    setExtraHeaders([]);
    setMissingHeaders([]);
    setHeadersErr(false);
    setFileName('');
    setEmptyFieldsVal([]);
    setCSVFile('');
    e.preventDefault();
    const file = Object.values(e.dataTransfer.files)[0];
    if (file.type === 'text/csv') {
      if (file.size <= 50000000 && file.size !== 0) {
        handleCSV(file);
        setFileName(file.name);
      } else {
        setFileSizeErr(true);
      }
    } else {
      setFileTypeErr(true);
    }
    const ele = document.getElementById('dropzone-label-area');
    ele.style.backgroundColor = '';
  };

  // Handle onDragOver
  const handleonDragOver = (e) => {
    e.preventDefault();
    const ele = document.getElementById('dropzone-label-area');
    ele.style.backgroundColor = secondaryColor;
  };
  // Handle onDragLeave
  const handleonDragLeave = (e) => {
    e.preventDefault();
    const ele = document.getElementById('dropzone-label-area');
    ele.style.backgroundColor = '';
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    closeImportDataModal();
    setExtraHeaders([]);
    setMissingHeaders([]);
    setHeadersErr(false);
    setFileName('');
    setEmptyFieldsVal([]);
    setCSVFile('');
  };

  //Handle CSV File Template Download
  const handleCSVFileTemplate = () => {
    ApiController.csvFileTemplate((response) => {
      if (response.success) {
        let url = response?.data?.file_url;
        window.open(url, '_blank');
      }
    });
  };

  //Handle Upload CSV File

  const handleUploadCSVFile = () => {
    if (csvFile !== '') {
      setLoading(true);
      const payload = new FormData();
      payload.append('csv_file', csvFile);
      ApiController.uploadCSVFile(payload, (response) => {
        if (response.success) {
          setLoading(false);
          handleCloseModal();
          listingCall();
        }
      });
    } else {
      console.log('select csv file');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFileTypeErr(false);
      setFileSizeErr(false);
      setEmptyFile(false);
    }, 2000);
  }, [fileTypeErr, fileSizeErr, emptyFile]);

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        close={handleCloseModal}
        title='Import Units'
        width={550}
      >
        <Box
          component='div'
          className='rounded-lg w-full h-[200px] flex flex-col items-center cursor-pointer pt-[20px]'
        >
          <div class='flex items-center justify-center w-full '>
            <label
              for='dropzone-file'
              id='dropzone-label-area'
              class='flex flex-col items-center justify-center w-full h-[180px] border-2 border-[#CDA950] border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              onDragOver={handleonDragOver}
              onDragLeave={handleonDragLeave}
              onDrop={handleonDropFile}
            >
              <div class='flex flex-col items-center justify-center pt-5 pb-6'>
                <GetAppRoundedIcon sx={{ color: yellow }} />
                {fileName && (
                  <p className=' font-semibold text-white'>{fileName}</p>
                )}
                <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  Drag and Drop your files here or{' '}
                  <span class={`font-semibold text-[#CDA950]`}>browse</span>
                </p>
                <p class='text-xs text-gray-500 dark:text-gray-400'>
                  CSV format only. Max size: 50MB
                </p>
              </div>
              <input
                id='dropzone-file'
                type='file'
                class='hidden'
                onChange={handleFileonChange}
                onClick={(e) => {
                  e.target.value = '';
                  setFileName('');
                  setEmptyFieldsVal([]);
                  setExtraHeaders([]);
                  setMissingHeaders([]);
                  setHeadersErr(false);
                  setCSVFile('');
                }}
              />
            </label>
          </div>
        </Box>
        <Box component='div'>
          {fileTypeErr && (
            <div className='py-3'>
              <Typography
                variant='h1'
                fontSize={13}
                fontWeight='medium'
                color={'red'}
              >
                Please select the CSV file only.
              </Typography>
            </div>
          )}
          {fileSizeErr && (
            <div className='py-3'>
              <Typography
                variant='h1'
                fontSize={13}
                fontWeight='medium'
                color={'red'}
              >
                Please select the CSV file only.
              </Typography>
            </div>
          )}
          {emptyFile && (
            <div className='py-3'>
              <Typography
                variant='h1'
                fontSize={13}
                fontWeight='medium'
                color={'red'}
              >
                There are no records in the file.
              </Typography>
            </div>
          )}

          {headersErr && (
            <div
              className={`max-h-[200px] w-[100%] mt-4 overflow-y-auto !overflow-x-hidden bg-[${secondaryColor}] p-3 rounded-md`}
            >
              <Typography
                variant='h1'
                fontSize={12}
                fontWeight='medium'
                color={'red'}
                className='!w-[50%] pb-1'
              >
                Please check the file and try again.
                <br />
              </Typography>
              <Box severity='error' icon={true}>
                <div className='flex flex-row overflow-x-hidden !justify-between !w-[100%] gap-1'>
                  {missingHeaders?.[0] !== '' ? (
                    <Typography
                      variant='h1'
                      fontSize={12}
                      fontWeight='medium'
                      color={'red'}
                      className='!w-[50%]'
                    >
                      <span className='text-red-600 font-bold text-xs'>
                        Missing Headers are:
                      </span>
                      <br />
                      {missingHeaders?.map((item) => {
                        return (
                          <span style={{ color: 'red' }}>
                            {item} <br />
                          </span>
                        );
                      })}
                    </Typography>
                  ) : null}
                  {extraHeaders?.[0] !== '' ? (
                    <Typography
                      fontSize={12}
                      fontWeight='medium'
                      color={'red'}
                      className='!w-[50%]'
                    >
                      <span className='text-red-600 font-bold text-xs'>
                        Extra Headers are:
                      </span>
                      <br />
                      {extraHeaders?.map((item) => {
                        return (
                          <span style={{ color: 'red' }}>
                            {item}, <br />
                          </span>
                        );
                      })}{' '}
                    </Typography>
                  ) : null}
                </div>
              </Box>
            </div>
          )}

          {emptyFieldsVal.length > 0 && (
            <div
              className={`max-h-[200px] w-[100%] mt-4 overflow-y-auto !overflow-x-hidden bg-[${secondaryColor}] p-3 rounded-md`}
            >
              {emptyFieldsVal.map((item, index) => {
                return (
                  <p
                    className='text-[13px] text-[#ff0000] font-medium'
                    key={index}
                  >
                    {item?.value
                      ? `In Row "${item.rowNumber}" "${item.fieldName}" Field Is Already Exisit In CSV`
                      : item?.facility
                      ? `In Row "${item.rowNumber}" "${item.fieldName}" Does Not Exist In System`
                      : `In Row "${item.rowNumber}" "${item.fieldName}" Field Is Empty`}
                  </p>
                );
              })}
            </div>
          )}
        </Box>
        <Box className='flex justify-between pt-4'>
          <Button
            style={{
              borderColor: yellow,
              color: yellow,
              fontFamily: 'Inter-Medium',
              fontSize: 13,
              textTransform: 'none',
              // width: '100px',
              borderRadius: 8,
            }}
            component='span'
            onClick={() => handleCSVFileTemplate()}
          >
            <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>
              Download Template
            </p>
          </Button>

          <div className='flex gap-3'>
            <div
              className='cursor-pointer mt-2'
              style={Styles.cancelBtn}
              onClick={() => handleCloseModal()}
            >
              Cancel
            </div>
            <Button
              height={38}
              style={{
                backgroundColor: loading
                  ? secondaryColor
                  : csvFile === ''
                  ? secondaryColor
                  : yellow,
                color: loading ? gray : csvFile === '' ? gray : primaryColor,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '100px',
                borderRadius: 8,
              }}
              onClick={() => handleUploadCSVFile()}
              component='span'
              variant='contained'
              disabled={loading || csvFile === ''}
              loading={loading}
            >
              <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>
                {!loading && 'Upload'}
              </p>
            </Button>
          </div>
        </Box>
      </CustomModal>
    </React.Fragment>
  );
};

export default ImportUnitsModal;
