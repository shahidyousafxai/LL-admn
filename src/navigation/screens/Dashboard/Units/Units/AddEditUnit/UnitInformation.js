import React, { useEffect } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/material/styles";

// Local Imports
import CheckBox from '../../../../../../components/checkBox.js'
import TextField from '../../../../../../components/inputField.js'
import { Styles } from '../../../../../../utils/style/GlobalStyles.js';
import SelectDropdown from '../../../../../../components/selectDropdown.js';
import { secondaryColor, white } from '../../../../../../utils/style/GlobalVariables.js'
import DisabledTextField from '../../../../../../components/disableInputField.js';
import MultiSelectDropdown from '../../../../../../components/multiSelectDropdown.js';

const Input = styled("input")({
    display: "none",
});

const UnitInformation = ({
    campuses,
    setNewUnit,
    newUnit,
    onChange,
    isEmpty,
    setIsEmptyToInit,
    Images,
    setImages,
    data,
    deletedImages,
    setDeletedImages,
    getAmenityListing,
    storageList,
    storageSelectAll,
    setStorageSelectAll,
}) => {

    const [imageError, setImageError] = React.useState("")
    const [unitTypeList, setUnitTypeList] = React.useState([
        {
            title: "STANDARD",
        },
        {
            title: "LUXE",
        },
        {
            title: "SUPER LUXE",
        },
        {
            title: "ALL",
        },
    ])

    // To Capture User Selected Image Response
    const handleImgChange = async (event) => {
        if (event.target.files[0].size > 2e6) {
            setImageError("The image must not be greater than 2MB.");
        } else {
            // Setting States
            if (Images?.length === 0 || Images === null) {
                setImages([event.target.files[0]]);
            } else {
                setImages([
                    ...Images,
                    event.target.files[0]
                ]);
            }
        }
    };
    // To Run OnChange Handler Again To Select Same Image
    const onInputClick = (event) => {
        event.target.value = "";
        setImageError("");
    };
    // Delete Image
    const removeImage = (item, selectedIndex) => {
        const indexVal = data?.rawData?.unit_image_url?.indexOf(item)
        const id = data?.rawData?.unit_image[indexVal]
        setImages(Images.filter((item, index) => index !== selectedIndex));
        // Setting States
        if (deletedImages?.length === 0 || deletedImages === null) {
            setDeletedImages([id]);
        } else {
            setDeletedImages([
                ...deletedImages,
                id
            ]);
        }
    }

    // Select || Deselect Storage Feature
    const onChangeMultiSelect = (value) => {
        setNewUnit((prevUnit) => {
            const array = [...(prevUnit?.storage || [])];

            if (array.find((item) => item?.id === value?.id)) {
                const valueIndex = array.findIndex((item) => item?.id === value?.id);
                array.splice(valueIndex, 1);
            } else {
                array.push(value);
            }
            array?.length === storageList?.length ? setStorageSelectAll(true) : setStorageSelectAll(false);
            return {
                ...prevUnit,
                storage: array,
            };
        });
    }

    // Select || Deselect All Storage Feature
    const onChangeAllMultiselect = (select, allItems) => {
        setNewUnit((prevUnit) => {
            if (select) {
                return {
                    ...prevUnit,
                    storage: [...allItems],
                };
            } else {
                return {
                    ...prevUnit,
                    storage: [],
                };
            }
        });
    };

    return (
        <div className='-mt-4 px-3 h-[480px] overflow-y-scroll'>

            {/* Campus and Unit number Row */}
            <div className="flex items-start justify-start gap-5">
                <div className='w-1/2 mt-[20px]'>
                    <div
                        style={Styles.smallTextWhite}
                        className="cursor-pointer mb-1">
                        Campus
                    </div>
                    <SelectDropdown
                        className={'mt-0'}
                        width={283}
                        list={campuses}
                        value={newUnit?.facilityName}
                        placeholder={'Select'}
                        isCampusEmpty={isEmpty?.userInfo?.facility ? true : false}
                        onClick={(value) => {
                            setNewUnit({
                                ...newUnit,
                                facilityId: value.id,
                                facilityName: value.title,
                                maintenanceFee: value.maintenanceFee !== null ? value.maintenanceFee : 'Maintenance fee not linked with selected campus',
                            })
                            getAmenityListing(value.title, (res) => {
                                setNewUnit({
                                    ...newUnit,
                                    facilityId: value.id,
                                    facilityName: value.title,
                                    maintenanceFee: value.maintenanceFee !== null ? value.maintenanceFee : 'Maintenance fee not linked with selected campus',
                                    amenities: res?.map(item => item.amenity_id),
                                })
                            })
                        }}
                    />
                </div>

                <div className='w-1/2'>
                    <TextField label={'Unit Number'} error={isEmpty?.userInfo?.unit_number ? true : false}
                        type="text" name="unitNum" value={newUnit?.unitNum} onChange={onChange}
                    />
                </div>
            </div>

            {/* Length and width row */}
            <div className="flex items-start justify-start gap-5">
                <div className='w-1/2'>
                    <TextField label={'Width'} error={isEmpty?.userInfo?.width ? true : false}
                        type="text" name="width" value={newUnit?.width} onChange={onChange}
                    />
                </div>

                <div className='w-1/2'>
                    <TextField label={'Length'} error={isEmpty?.userInfo?.length ? true : false}
                        type="text" name="length" value={newUnit?.length} onChange={onChange}
                    />
                </div>
            </div>

            {/* Sq feet and Maintanance fee row */}
            <div className="flex items-start justify-start gap-5">
                <div className='w-1/2'>
                    <DisabledTextField
                        label={"Sq Ft"}
                        value={newUnit?.sqFeet}
                    />
                </div>

                <div className='w-1/2'>
                    <DisabledTextField label={"Maintenance Fee"} value={newUnit?.maintenanceFee} />
                </div>
            </div>

            {/* Description Field */}
            <div className="flex items-start justify-start gap-5">
                {/* Description TextArea */}
                <TextField height={'h-24'} value={newUnit?.description} onChange={onChange} error={isEmpty?.userInfo?.unit_description ? true : false}
                    label={'Description'} type="text" textArea name="description" className='w-full' />
            </div>

            {/* Lease and Buy CheckBox row */}
            <div className="flex items-start justify-start gap-5 mt-5">
                <div className='w-1/2 pl-1'>
                    <div
                        style={Styles.smallTextWhite}
                        className="cursor-pointer -mb-1">
                        Available for Lease
                    </div>
                    <div className="flex items-center justify-start ">
                        <CheckBox
                            color={white}
                            checked={newUnit?.availableForLease}
                            onChange={() => { setNewUnit({ ...newUnit, availableForLease: !newUnit?.availableForLease }); setIsEmptyToInit(); }}
                            label="Active"
                        />
                    </div>
                </div>

                <div className='w-1/2 pl-1'>
                    <div
                        style={Styles.smallTextWhite}
                        className="w-1/2 cursor-pointer -mb-1">
                        Available for Sale
                    </div>
                    <div className="flex items-center justify-start ">
                        <CheckBox
                            color={white}
                            checked={newUnit?.availableForSale}
                            onChange={() => { setNewUnit({ ...newUnit, availableForSale: !newUnit?.availableForSale }); setIsEmptyToInit() }}
                            label="Active"
                        />
                    </div>
                </div>
            </div>

            {/* Lease and buy price row */}
            <div className="flex items-start justify-start gap-5 -mt-2">
                <div className='w-1/2'>
                    {newUnit?.availableForLease ? (
                        <TextField label={'Lease Price'} error={(newUnit?.availableForLease && isEmpty?.userInfo?.lease_price) ? true : false}
                            type="text" name="leasePrice" value={newUnit?.leasePrice} onChange={onChange}
                        />
                    ) : (
                        <DisabledTextField label={"Lease Price"} value={newUnit?.lastLogin} marginTop={1} />
                    )}
                </div>

                <div className='w-1/2'>
                    {newUnit?.availableForSale ? (
                        <TextField label={'Buy Price'} error={(newUnit?.availableForSale && isEmpty?.userInfo?.buy_price) ? true : false}
                            type="text" name="buyPrice" value={newUnit?.buyPrice} onChange={onChange}
                        />
                    ) : (
                        <DisabledTextField label={"Buy Price"} value={newUnit?.lastLogin} marginTop={1} />
                    )}
                </div>
            </div>

            {/* Status */}
            <div className="flex items-start justify-start gap-5 mt-4">

                <div className='w-1/2'>
                    <div
                        style={Styles.smallTextWhite}
                        className="cursor-pointer mb-1">
                        Unit Type
                    </div>
                    <SelectDropdown
                        className={'mt-0'}
                        width={283}
                        list={unitTypeList}
                        value={newUnit?.newUnitType && newUnit?.newUnitType[0]?.toUpperCase() + newUnit?.newUnitType?.slice(1).toLowerCase()}
                        placeholder={'Select'}
                        isCampusEmpty={isEmpty?.userInfo?.unit_type ? true : false}
                        onClick={(value) => {
                            setNewUnit((prevUnitData) => ({
                                ...prevUnitData,
                                newUnitType: value.title
                            }));
                        }}
                    />
                </div>
                <div className='w-1/2'>
                    <div
                        style={Styles.smallTextWhite}
                        className="cursor-pointer mb-1">
                        Storage Feature
                    </div>
                    <MultiSelectDropdown
                        selectAll={storageSelectAll}
                        setSelectAll={setStorageSelectAll}
                        className={"mt-0"}
                        list={storageList}
                        value={newUnit?.storage}
                        placeholder={"Select"}
                        onClick={(value) => onChangeMultiSelect(value)}
                        onClickSelectAll={(select) => onChangeAllMultiselect(select, storageList)}
                    />
                </div>
            </div>

            {/* Status */}
            <div className="flex items-start justify-start gap-5 mt-4">

                <div className='w-1/2 pl-1 mt-5'>
                    <div
                        style={Styles.smallTextWhite}
                        className="w-1/2 cursor-pointer -mb-1">
                        Status
                    </div>
                    <div className="flex items-center justify-start ">
                        <CheckBox
                            color={white}
                            checked={newUnit?.status}
                            onChange={() => { setNewUnit({ ...newUnit, status: !newUnit?.status }); setIsEmptyToInit() }}
                            label="Active"
                        />
                    </div>
                </div>
            </div>

            {/* Unit photos Row */}
            <div className="flex items-start justify-start gap-5 mt-5 h-max-28 overflow-y-scroll">
                <div className="item w-full">
                    <div className='flex justify-between pb-3'>
                        <p style={Styles.smallTextWhite}>
                            Unit Photos
                        </p>
                        {/* Upload Image Button */}
                        <label htmlFor="icon-button-file">
                            <div
                                className='h-6 w-[100px] flex items-center justify-center rounded-lg border !border-[#CDA950] cursor-pointer'
                            // onClick={() => setSwitchModal(true)}
                            >
                                <p style={Styles.smallTextYellow}>
                                    +Upload images
                                </p>
                            </div>
                            <div className="!w-[100px] !h-6 -mt-6 overflow-hidden cursor-pointer">
                                <Input
                                    accept=".png, .jpg"
                                    id="icon-button-file"
                                    type="file"
                                    onChange={handleImgChange}
                                    onClick={onInputClick}
                                />
                            </div>
                        </label>
                    </div>
                    {/* Error Message */}
                    <div className="" style={Styles.errorText}>
                        {imageError}
                    </div>

                    {/* Images Row */}
                    {Images?.length > 0 ? (<>
                        {Images?.map((item, index) => {
                            let objectUrl;
                            if (item?.name) {
                                objectUrl = URL.createObjectURL(item)
                            } else {
                                objectUrl = item?.replace("download", "view");
                            }
                            return (
                                <div
                                    key={`${index}`}
                                    className='flex items-center'
                                    style={{
                                        backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 12,
                                        borderRadius: 8
                                    }}>

                                    <InsertDriveFileIcon fontSize='small' color='success' />
                                    <p className='ml-1 w-[85%]' style={Styles.normalTextWhite}>
                                        {item?.name ? item.name : newUnit?.unitNum + ` photo ${index + 1}`}
                                    </p>

                                    <a href={objectUrl} target='_blank'>
                                        <VisibilityIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                                    </a>
                                    <div onClick={() => removeImage(item, index)}>
                                        <DeleteIcon fontSize='small cursor-pointer' color='secondary' />
                                    </div>

                                </div>
                            )
                        })}
                    </>) :
                        // Empty Placeholder
                        (
                            < div className="flex flex-col items-center">
                                <DescriptionIcon fontSize="large" color="success" />
                                <p
                                    className="mt-2"
                                    style={{
                                        color: white,
                                        fontFamily: "Inter-Regular",
                                        fontSize: 13,
                                    }}
                                >
                                    No images added yet.
                                </p>
                            </div>
                        )}

                </div>
            </div>

        </div >
    )
}

export default UnitInformation;