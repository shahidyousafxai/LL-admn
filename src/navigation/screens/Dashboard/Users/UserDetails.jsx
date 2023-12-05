// Library Imports
import React, { useState } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';


// Local Imports
import Button from '../../../../components/button.js'
import CustomModal from '../../../../components/Modal/Modal.jsx'
import {
  secondaryColor,
  white,
} from '../../../../utils/style/GlobalVariables.js'
import { Styles } from '../../../../utils/style/GlobalStyles.js';
import { InsideSpinner } from '../../../../components/Spinner/Spinner.jsx';

const UserDetails = ({ open, close, onClickEdit, data, loading }) => {

  const unitsArray = () => {
    const leased = data?.unit?.leased;
    const owned = data?.unit?.owned;

    return [].concat(leased, owned);
  }
  const getDocumentsToList = () => {
    let doc = [];
    if (Object.keys(data?.documents).length !== 0) {
      data?.documents?.map((item, index) => {
        if (index === 0 && item?.type === "license_front" && item?.name && item?.url) {
          return doc.push(item);
        } else if (index === 1 && item?.type === "license_back" && item?.name && item?.url) {
          return doc.push(item);
        } else if (item?.type === "insurance" && doc?.length <= 2 && item?.name && item?.url) {
          return doc.push(item);
        } else if (item?.type === "agreement_doc" && doc?.length <= 3 && item?.name && item?.url) {
          return doc.push(item);
        }
        return true;
      })
      return doc;
    }
  }
  const unitData = unitsArray();
  const docToMap = getDocumentsToList();
  const [seeAll, setSeeAll] = useState(false)

  return (
    <CustomModal open={open} close={() => { setSeeAll(false); close() }} title={`${data?.fName} ${data?.lName}`} width={620}>

      {
        loading ?
          <InsideSpinner />
          : (<>
            {/* Details Section */}
            <div>
              <div className='pt-2'>
                <p style={Styles.headingTextWhite}>General Information</p>
              </div>

              <div className="flex justify-center items-center pt-1">
                <div className="item w-1/12">
                  <p style={Styles.normalTextGray}>
                    Name
                  </p>
                </div>
                <div className="item w-5/12 pl-6">
                  <p style={Styles.normalLeftTextWhite}>
                    {`${data?.fName} ${data?.lName}`}
                  </p>
                </div>
                <div className="item w-1/12">
                  <p style={Styles.normalTextGray}>
                    Unit
                  </p>
                </div>
                <div className="item w-5/12 pl-10 break-words">
                  <div className='flex overflow-x-scroll'>
                    {unitData?.length > 0 && unitData?.map((item, index) => {
                      return <>
                        {index === 0 ? (
                          <p key={index} style={Styles.normalLeftTextWhite}>
                            {item?.unit_number + `${unitData?.length > 1 ? ',  ' : ''}`}
                          </p>
                        ) : (
                          <p key={index} style={Styles.normalLeftTextWhite}>
                            {item?.unit_number + `${index < unitData?.length - 1 ? ',  ' : ''}`}
                          </p>
                        )}
                      </>
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center pt-1">
                <div className="item w-1/12">
                  <p style={Styles.normalTextGray}>
                    Phone
                  </p>
                </div>
                <div className="item w-5/12 pl-6">
                  <p style={Styles.normalLeftTextWhite}>
                    {data?.phone}
                  </p>
                </div>
                <div className="item w-1/12">
                  <p style={Styles.normalTextGray}>
                    Address
                  </p>
                </div>
                <div className="item w-5/12 pl-10 break-words">
                  <p style={Styles.normalLeftTextWhite}>
                    {data?.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center pt-1">
                <div className="item">
                  <p style={Styles.normalTextGray}>
                    Email
                  </p>
                </div>
                <div className="item pl-10 break-words">
                  <p style={Styles.normalLeftTextWhite}>
                    {data?.email}
                  </p>
                </div>
              </div>

            </div>

            <hr style={Styles.hrBreak} />

            {/* Documents Section */}
            <div>
              <div className='flex justify-between'>
                <p style={Styles.headingTextWhite}>
                  Documents
                </p>

                {seeAll ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setSeeAll(false)}
                  >
                    <CloseIcon fontSize="small" color="secondary" />
                  </div>
                ) : (
                  <>
                    {docToMap?.length > 0 && (
                      <div onClick={() => setSeeAll(true)} >
                        <p className='cursor-pointer mb-1' style={Styles.disableBtnTextYellow}>
                          See All
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
              {docToMap?.length > 0 ? (
                <div className={`h-48 ${seeAll && 'overflow-y-scroll'}`}>
                  {seeAll ? (
                    <>
                      {data?.documents?.map((item, index) => {
                        let doc = {
                          type: '',
                          name: '',
                          viewUrl: '',
                          downloadUrl: '',
                        };
                        if (item?.type === "license_front") {
                          doc = {
                            type: 'Driver License (Front)',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "license_back") {
                          doc = {
                            type: 'Driver License (Back)',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "insurance") {
                          doc = {
                            type: 'Insurance Policy',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "agreement_doc") {
                          doc = {
                            type: 'Lease Agreement',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }

                        return (<>
                          {(doc?.name && doc.type && doc?.viewUrl && doc.downloadUrl) && (
                            <div key={index} className='flex items-center'
                              style={{
                                backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 12,
                                borderTopRightRadius: 8, borderTopLeftRadius: 8
                              }}>

                              <InsertDriveFileIcon fontSize='small' color='success' />
                              <p className='ml-5 w-[250px]' style={Styles.normalTextWhite}>
                                {doc?.name}
                              </p>
                              <p className='w-52' style={Styles.normalTextGray}>
                                {doc?.type}
                              </p>

                              <div onClick={() => window.open(doc?.viewUrl)}>
                                <VisibilityIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                              </div>
                              <div onClick={() => window.open(doc?.downloadUrl, "_self")}>
                                <GetAppIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                              </div>

                            </div>
                          )}
                        </>)
                      })}
                    </>
                  ) : (
                    <>
                      {docToMap?.map((item, index) => {
                        let doc = {
                          type: '',
                          name: '',
                          viewUrl: '',
                          downloadUrl: '',
                        };
                        if (item?.type === "license_front") {
                          doc = {
                            type: 'Driver License (Front)',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "license_back") {
                          doc = {
                            type: 'Driver License (Back)',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "insurance") {
                          doc = {
                            type: 'Insurance Policy',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }
                        if (item?.type === "agreement_doc") {
                          doc = {
                            type: 'Lease Agreement',
                            name: item?.name?.replace('_', ' ').replace('_', ' ').replace('_', '').replace('_', '').replaceAll('-', '')?.replace(new RegExp("[0-9]", "g"), ""),
                            viewUrl: item?.url?.replace('download', 'view'),
                            downloadUrl: item?.url
                          }
                        }

                        return (<>
                          {(doc?.name && doc.type && doc?.viewUrl && doc.downloadUrl) && (
                            <div key={index} className='flex items-center'
                              style={{
                                backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 12,
                                borderTopRightRadius: 8, borderTopLeftRadius: 8
                              }}>

                              <InsertDriveFileIcon fontSize='small' color='success' />
                              <p className='ml-5 w-[250px]' style={Styles.normalTextWhite}>
                                {doc?.name}
                              </p>
                              <p className='w-52' style={Styles.normalTextGray}>
                                {doc?.type}
                              </p>

                              <div onClick={() => window.open(doc?.viewUrl)}>
                                <VisibilityIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                              </div>
                              <div onClick={() => window.open(doc?.downloadUrl, "_self")}>
                                <GetAppIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                              </div>

                            </div>
                          )}
                        </>)
                      })}
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className='flex flex-col items-center'>
                    <DescriptionIcon fontSize='large' color='success' />
                    <p className='mt-2' style={{ color: white, fontFamily: 'Inter-Regular', fontSize: 13 }}>
                      No documents added yet.
                    </p>
                  </div>
                </>
              )}
            </div>

            <hr style={Styles.hrBreak} />

          </>)
      }

      <div className="flex items-center justify-between gap-5">
        <div className='flex flex-row cursor-pointer' onClick={() => onClickEdit()}>
          <EditIcon fontSize="small" color="secondary" className="mr-2 " />
          <p style={Styles.disableBtnText}>
            Edit
          </p>
        </div>
        <Button
          className={`!px-5 text-sm !normal-case`}
          style={Styles.activeBtn}
          onClick={() => { setSeeAll(false); close() }}
        >
          {' '}
          <p style={Styles.activeBtnText}>Close</p>
        </Button>
      </div>
    </CustomModal>
  )
}

export default UserDetails;
