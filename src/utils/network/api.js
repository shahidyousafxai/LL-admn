// Library Imports
import ApiServices from './apiServices';

// Local Imports
import { endPoints } from './constants';

class controller {
  //************************* Fetch Campus Locations API *******************************//
  fetchLocationsCall = (callback) => {
    return ApiServices.sendGetWithoutAuth(
      {},
      endPoints.fetchLocations,
      callback
    );
  };

  //************************* Fetch States API *******************************//
  fetchStatesCall = (callback) => {
    return ApiServices.sendGetWithAuth({}, endPoints.fetchStates, callback);
  };

  //************************* Fetch Cities API *******************************//
  fetchCitiesCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.fetchStates,
      callback
    );
  };

  //************************* Login API *******************************//
  loginCall = (payload, callback) => {
    return ApiServices.sendPostWithoutAuth(payload, endPoints.login, callback);
  };

  //************************* Forgot Password API *******************************//
  forgotPasswordCall = (payload, callback) => {
    return ApiServices.sendPostWithoutAuth(
      payload,
      endPoints.forgotPassword,
      callback
    );
  };

  //************************* Forgot Password API *******************************//
  changePassewordCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.changePassword,
      callback
    );
  };

  //************************* Fecth Users Listing API *******************************//
  fetchUsersCall = (name, zones, campus, group, status, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchUsers + '?name=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Filters
    else {
      if (
        group !== undefined ||
        status !== undefined ||
        campus !== undefined ||
        zones !== undefined
      ) {
        let endPoint =
          group !== undefined && status !== undefined
            ? endPoints.fetchUsers + '?group=' + group + '&status=' + status
            : group !== undefined
            ? endPoints.fetchUsers + '?group=' + group
            : status !== undefined
            ? endPoints.fetchUsers + '?status=' + status
            : endPoints.fetchUsers;
        if (campus !== undefined || zones !== undefined) {
          endPoint =
            zones !== undefined && campus !== undefined
              ? endPoint === 'users'
                ? endPoint + '?zone=' + zones + '&location=' + campus
                : endPoint + '&zone=' + zones + '&location=' + campus
              : zones !== undefined
              ? endPoint === 'users'
                ? endPoint + '?zone=' + zones
                : endPoint + '&zone=' + zones
              : campus !== undefined
              ? endPoint === 'users'
                ? endPoint + '?location=' + campus
                : endPoint + '&location=' + campus
              : endPoints.fetchUsers;
        }
        return ApiServices.sendGetWithAuth({}, endPoint, callback);
      }
      // For Simple Listing
      else {
        return ApiServices.sendGetWithAuth({}, endPoints.fetchUsers, callback);
      }
    }
  };

  //************************* Add New User API *******************************//
  addNewUserCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewUser,
      callback
    );
  };

  //************************* Get User Details API *******************************//
  userDetailsCall = (payload, callback) => {
    let endPoint = endPoints.fetchUsers + '/' + payload;
    return ApiServices.sendGetWithAuth({}, endPoint, callback);
  };

  //************************* Edit User API *******************************//
  editUserCall = (payload, callback) => {
    const endPoint = `${endPoints.editUser}/${payload.userID}`;
    return ApiServices.sendPutWithAuth(payload.data, endPoint, callback);
  };

  //************************* Delete User API *******************************//
  deleteUserCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteUser,
      callback
    );
  };

  //************************* User Personal Info Update API *******************************//
  updatePersonalInfo = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.updatePersonalInfo,
      callback
    );
  };

  //************************* Fecth Users Listing API *******************************//
  fetchAmenityCall = (name, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchAmenity + '?name=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Simple Listing
    else {
      return ApiServices.sendGetWithAuth({}, endPoints.fetchAmenity, callback);
    }
  };

  //************************* Add New Amenity API *******************************//
  addNewAmenityCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewAmenity,
      callback
    );
  };

  //************************* Update Amenity API *******************************//
  updateAmenityCall = (id, payload, callback) => {
    let endPoint = endPoints.editAmenity + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete Amenity API *******************************//
  deleteAmenityCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteAmenity,
      callback
    );
  };

  //************************* Fetch Zones Listing API *******************************//
  fetchZonesCall = (name, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchZones + '?name=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Simple Listing
    else {
      return ApiServices.sendGetWithAuth({}, endPoints.fetchZones, callback);
    }
  };

  //************************* Add New Zone API *******************************//
  addNewZoneCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewZone,
      callback
    );
  };

  //************************* Update Zone API *******************************//
  updateZoneCall = (id, payload, callback) => {
    let endPoint = endPoints.updateZone + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete Zone API *******************************//
  deleteZoneCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteZone,
      callback
    );
  };

  //************************* Fetch Campuses Listing API *******************************//
  fetchCampusesCall = (name, zones, status, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchCampus + '?name=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Filters
    else {
      if (status !== undefined || zones !== undefined) {
        let endPoint =
          zones !== undefined && status !== undefined
            ? endPoints.fetchCampus + '?zone=' + zones + '&status=' + status
            : zones !== undefined
            ? endPoints.fetchCampus + '?zone=' + zones
            : status !== undefined
            ? endPoints.fetchCampus + '?status=' + status
            : endPoints.fetchCampus;
        return ApiServices.sendGetWithAuth({}, endPoint, callback);
      }
      // For Simple Listing
      else {
        return ApiServices.sendGetWithAuth({}, endPoints.fetchCampus, callback);
      }
    }
  };

  //************************* Add New Campus API *******************************//
  addNewCampusCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewCampus,
      callback
    );
  };

  //************************* Update Camppus API *******************************//
  updateCampusCall = (id, payload, callback) => {
    let endPoint = endPoints.addNewCampus + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Fetch Units Listing API *******************************//
  fetchUnitsCall = (name, campus, status, buyPrice, leasePrice, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchUnits + '?unit_number=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Filters
    else {
      if (campus !== undefined || status !== undefined) {
        let endPoint =
          campus !== undefined && status !== undefined
            ? endPoints.fetchUnits + '?campus=' + campus + '&status=' + status
            : campus !== undefined
            ? endPoints.fetchUnits + '?campus=' + campus
            : status !== undefined
            ? endPoints.fetchUnits + '?status=' + status
            : endPoints.fetchUnits;
        // For Price Range
        if (buyPrice !== undefined || leasePrice !== undefined) {
          endPoint =
            buyPrice !== undefined &&
            buyPrice[0] !== 0 &&
            leasePrice !== undefined &&
            leasePrice[0] !== 0
              ? endPoint +
                '&min_sale_price=' +
                buyPrice[0] +
                '&max_sale_price=' +
                buyPrice[1] +
                '&min_lease_price=' +
                leasePrice[0] +
                '&max_lease_price=' +
                leasePrice[1]
              : buyPrice[0] !== 0
              ? endPoint +
                '&min_sale_price=' +
                buyPrice[0] +
                '&max_sale_price=' +
                buyPrice[1]
              : leasePrice[0] !== 0
              ? endPoint +
                '&min_lease_price=' +
                leasePrice[0] +
                '&max_lease_price=' +
                leasePrice[1]
              : endPoint;
        }
        return ApiServices.sendGetWithAuth({}, endPoint, callback);
      }
      // Price Range for Sale and Lease
      else if (buyPrice !== undefined || leasePrice !== undefined) {
        let endPoint =
          buyPrice !== undefined &&
          buyPrice[0] !== 0 &&
          leasePrice !== undefined &&
          leasePrice[0] !== 0
            ? endPoints.fetchUnits +
              '?min_sale_price=' +
              buyPrice[0] +
              '&max_sale_price=' +
              buyPrice[1] +
              '&min_lease_price=' +
              leasePrice[0] +
              '&max_lease_price=' +
              leasePrice[1]
            : buyPrice[0] !== 0
            ? endPoints.fetchUnits +
              '?min_sale_price=' +
              buyPrice[0] +
              '&max_sale_price=' +
              buyPrice[1]
            : leasePrice[0] !== 0
            ? endPoints.fetchUnits +
              '?min_lease_price=' +
              leasePrice[0] +
              '&max_lease_price=' +
              leasePrice[1]
            : endPoints.fetchUnits;
        return ApiServices.sendGetWithAuth({}, endPoint, callback);
      }
      // For Simple Listing
      else {
        return ApiServices.sendGetWithAuth({}, endPoints.fetchUnits, callback);
      }
    }
  };

  //************************* Add New Units API *******************************//
  addNewUnitCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewUnits,
      callback
    );
  };

  //************************* Update Units API *******************************//
  updateUnitCall = (id, payload, callback) => {
    let endPoint = endPoints.updateUnits + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete Units API *******************************//
  deleteUnitCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteUnits,
      callback
    );
  };

  //************************* Fetch Category Listing API *******************************//
  fetchCategoryCall = (name, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchCategory + '?search=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Simple Listing
    else {
      return ApiServices.sendGetWithAuth({}, endPoints.fetchCategory, callback);
    }
  };

  //************************* Add New Category API *******************************//
  addNewCategoryCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewCategory,
      callback
    );
  };

  //************************* Update Category API *******************************//
  updateCategoryCall = (id, payload, callback) => {
    let endPoint = endPoints.updateCategory + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete Category API *******************************//
  deleteCategoryCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteCategory,
      callback
    );
  };

  //************************* Fetch FAQs Listing API *******************************//
  fetchFAQsCall = (name, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchFAQs + '?search=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Simple Listing
    else {
      return ApiServices.sendGetWithAuth({}, endPoints.fetchFAQs, callback);
    }
  };

  //************************* Add New Category API *******************************//
  addNewFAQCall = (payload, callback) => {
    return ApiServices.sendPostWithAuthFormData(
      payload,
      endPoints.addFAQs,
      callback
    );
  };

  //************************* Update FAQ API *******************************//
  updateFAQCall = (id, payload, callback) => {
    let endPoint = endPoints.updateFAQs + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete FAQ API *******************************//
  deleteFAQCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuthAndPayloadInBody(
      { ids: [payload] },
      endPoints.deleteFAQ,
      callback
    );
  };

  //************************* Fecth Access Logs Listing API *******************************//
  fetchAccessLogsCall = (name, campus, date, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.accessLogs + '?search=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Filters
    else {
      if (campus !== undefined || date !== undefined) {
        let endPoint =
          campus !== undefined && date !== undefined
            ? endPoints.accessLogs + '?campus=' + campus + '&date=' + date
            : campus !== undefined
            ? endPoints.accessLogs + '?campus=' + campus
            : date !== undefined
            ? endPoints.accessLogs + '?date=' + date
            : endPoints.accessLogs;
        return ApiServices.sendGetWithAuth({}, endPoint, callback);
      }
      // For Simple Listing
      else {
        return ApiServices.sendGetWithAuth({}, endPoints.accessLogs, callback);
      }
    }
  };

  //************************* Create stripe Customer API *******************************//
  createStripeCustomer = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.createStripeCustomer,
      callback
    );
  };

  //************************* Make Card Default API *******************************//
  cardOperations = (payload, callback) => {
    const endPoint = `${endPoints.defaultCard}/${payload.userID}/${payload.cardID}/`;
    return ApiServices.sendPostWithAuth(
      { operation_type: payload.operation },
      endPoint,
      callback
    );
  };

  //************************* Fetch Announcements Users Listing API *******************************//
  fetcAnnouncementUsersCall = (payload, callback) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.announcementUsers,
      callback
    );
  };

  //************************* Fetch Announcements Listing API *******************************//
  fetchAnnouncementsCall = (name, callback) => {
    // For Search
    if (name) {
      let endPoint = endPoints.fetchAnnouncements + '?search=' + name;
      return ApiServices.sendGetWithAuth({}, endPoint, callback);
    }
    // For Simple Listing
    else {
      return ApiServices.sendGetWithAuth(
        {},
        endPoints.fetchAnnouncements,
        callback
      );
    }
  };

  //************************* Add New Announcement API *******************************//
  addNewAnnouncementCall = (payload, callback) => {
    return ApiServices.sendPostWithAuthFormData(
      payload,
      endPoints.addAnnouncements,
      callback
    );
  };

  //************************* Update Announcement API *******************************//
  updateAnnouncementCall = (id, payload, callback) => {
    let endPoint = endPoints.updateAnnouncements + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callback);
  };

  //************************* Delete Announcement API *******************************//
  deleteAnnouncementCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuthAndPayloadInBody(
      { ids: [payload] },
      endPoints.deleteAnnouncements,
      callback
    );
  };

  //************************* Open Campus Gate API *******************************//
  openCampus = (payload, callback) => {
    const endPoint = `${endPoints.openCampusGate}/${payload.unitId}/`;
    return ApiServices.sendPostWithAuth(
      { status_code: payload.statusCode },
      endPoint,
      callback
    );
  };

  //************************* Open & Close Unit Gate API *******************************//
  openCloseUnit = (payload, callback) => {
    const endPoint = `${endPoints.openCloseUnitGate}/${payload.unitId}/`;
    return ApiServices.sendPostWithAuth(
      { status_code: payload.statusCode },
      endPoint,
      callback
    );
  };

  //************************* Get Unit Details API *******************************//
  unitDetailsCall = (payload, callback) => {
    let endPoint = endPoints.unitDetails + '/' + payload;
    return ApiServices.sendGetWithAuth({}, endPoint, callback);
  };

  //************************* Add Images In Units API *******************************//
  addUnitsImagesCall = (id, payload, callback) => {
    let endPoint = endPoints.unitImages + '/' + id + '/';
    return ApiServices.sendPostWithAuthFormData(payload, endPoint, callback);
  };

  //************************* Delete Images In Units API *******************************//
  deleteUnitsImagesCall = (payload, callback) => {
    return ApiServices.sendDeleteWithAuthAndPayloadInBody(
      payload,
      endPoints.unitDeleteImages,
      callback
    );
  };

  //************************* CSV Template *******************************//
  csvFileTemplate = (callBack) => {
    return ApiServices.sendGetWithAuth('', endPoints.csvFileTemplate, callBack);
  };

  //************************* Upload CSV File  *******************************//

  uploadCSVFile = (payload, callBack) => {
    return ApiServices.sendPostWithAuthFormData(
      payload,
      endPoints.csvFileUpload,
      callBack
    );
  };

  //************************* Get Campus Page List  *******************************//

  getCampusPageListCall = (payload, callBack) => {
    if (payload) {
      let endPoint = endPoints.campusPageList + '?search=' + payload;
      return ApiServices.sendGetWithAuth({}, endPoint, callBack);
    } else {
    }
    return ApiServices.sendGetWithAuth({}, endPoints.campusPageList, callBack);
  };

  //*************************  Add New Campus Page *******************************//

  addNewCampusPageCall = (payload, callBack) => {
    return ApiServices.sendPostWithAuth(
      payload,
      endPoints.addNewCampusPage,
      callBack
    );
  };
  //*************************  Add New Campus Page Upload Images *******************************//

  updateCampusPageCall = (payload, callBack) => {
    const endPoint = endPoints.updateCampusPage + '/' + payload?.page_id;
    const updatedPayload = payload?.update;
    return ApiServices.sendPutWithAuth(updatedPayload, endPoint, callBack);
  };

  //*************************  Add New Campus Page Upload Images *******************************//

  uploadCampusPageImagesCall = (payload, callBack) => {
    let endPoint =
      endPoints.addNewCampusePageImages + '/' + payload?.page_id + '/';

    return ApiServices.sendPostWithAuthFormData(
      payload?.images,
      endPoint,
      callBack
    );
  };
  //*************************  Delete Campus Page *******************************//

  deleteCampusPageCall = (payload, callBack) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteCampusPage,
      callBack
    );
  };

  //*************************  Delete Campus Page Images *******************************//\

  deleteCampusPageImageCall = (payload, callBack) => {
    return ApiServices.sendDeleteWithAuthAndPayloadInBody(
      payload,
      endPoints.deleteCampusImages,
      callBack
    );
  };

  //************************* Add New Team Member  *******************************//

  addNewTeamMemberCall = (payload, callBack) => {
    return ApiServices.sendPostWithAuthFormData(
      payload,
      endPoints.addNewTeamMember,
      callBack
    );
  };

  //************************* Get Meet The Team List  *******************************//

  getMeetTheTeamListCall = (callBack) => {
    return ApiServices.sendGetWithAuth(
      {},
      endPoints.addNewTeamMember,
      callBack
    );
  };

  //************************* Delete Meet The Team Member  *******************************//

  deleteMeetTheTeamMemberCall = (id, callBack) => {
    return ApiServices.sendDeleteWithAuth(
      id,
      endPoints.deleteTeamMember,
      callBack
    );
  };

  //************************* Update Meet The Team Member  *******************************//

  updateMeetTheTeamMemberCall = (id, payload, callBack) => {
    const endPoint = endPoints.updateTeamMember + '/' + id;
    return ApiServices.sendPutWithAuth(payload, endPoint, callBack);
  };

  //************************* Get Unit Page List  *******************************//

  getUnitPageListCall = (payload, callBack) => {
    if (payload) {
      let endPoint = endPoints.unitPageList + '?search=' + payload;
      return ApiServices.sendGetWithAuth({}, endPoint, callBack);
    } else {
    }
    return ApiServices.sendGetWithAuth({}, endPoints.unitPageList, callBack);
  };

  //************************* Delete Unit Page  *******************************//

  deleteUnitPageCall = (id, callBack) => {
    return ApiServices.sendDeleteWithAuth(
      id,
      endPoints.deleteUnitPage,
      callBack
    );
  };

  //************************* Blog List Page  *******************************//

  getBlogPageListCall = (payload, callBack) => {
    if (payload) {
      let endpoint = endPoints.blogList + '?search=' + payload;
      return ApiServices.sendGetWithAuth({}, endpoint, callBack);
    }
    return ApiServices.sendGetWithAuth({}, endPoints.blogList, callBack);
  };

  //************************* Add New Blog Page  *******************************//

  addNewBlogPageCall = (payload, callBack) => {
    return ApiServices.sendPostWithAuth(
      payload?.data,
      endPoints.addNewBlog,
      callBack
    );
  };

  //************************* Add New Blog Page Images Upload  *******************************//

  addNewBlogPageUploadImagesCall = (payload, callBack) => {
    const endpoint =
      endPoints.addNewBlogImagesUpload + '/' + payload?.blogId + '/';
    return ApiServices.sendPostWithAuthFormData(
      payload?.formData,
      endpoint,
      callBack
    );
  };

  //************************* Get Single Blog Details Upload  *******************************//

  getSingleBlogPageDetailsCall = (payload, callBack) => {
    let endpoint = `${endPoints.singleBlogPageDetail}/${payload}/`;
    return ApiServices.sendGetWithAuth({}, endpoint, callBack);
  };

  //************************* Update Blog  *******************************//

  updateBlogCall = (payload, callBack) => {
    let endpoint = `${endPoints.updateBlog}/${payload?.blogId}`;
    return ApiServices.sendPutWithAuth(payload?.data, endpoint, callBack);
  };

  //*************************  Delete Blog Page *******************************//

  deleteBlogPageCall = (payload, callBack) => {
    return ApiServices.sendDeleteWithAuth(
      payload,
      endPoints.deleteBlogPage,
      callBack
    );
  };

  //*************************  Delete Blog Page Images *******************************//

  deleteBlogImagesCall = (payload, callBack) => {
    return ApiServices.sendDeleteWithAuthAndPayloadInBody(
      payload,
      endPoints.deleteBlogImages,
      callBack
    );
  };

  //*************************  Update Video Controls  *******************************//

  updateVideoControlsCall = (payload, callBack) => {
    let endpoint = `${endPoints.updateVideoControls}/${payload?.blogId}/`;
    return ApiServices.sendPutWithAuthFormData(
      payload?.formdata,
      endpoint,
      callBack
    );
  };
}

const ApiController = new controller();
export default ApiController;
