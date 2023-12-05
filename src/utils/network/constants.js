//************************* KEY Constants *******************************//
export const mapApiKey = 'AIzaSyDpxjD_swzYIJdzF5upyWNf8l3O-Hu2B3A';

//************************* URL Constants *******************************//

// Server Base URL
export const baseUrl = 'https://api.luxelocker.com/v1';

// Tunnel Base URL
// export const baseUrl = "http://34.230.238.54/v1";

//************************* End Points Constants *******************************//
export const endPoints = {
  // AUTH
  login: 'login/',

  // Forgot Passsword
  forgotPassword: 'forgot-password/',

  // Change Password
  changePassword: 'profile/change-password/',

  // Storage Location
  fetchLocations: 'zones/zones-location',

  // States Listing
  fetchStates: 'fetch-states/',

  // Fetch Users Listing
  fetchUsers: 'users',

  // Add New User
  addNewUser: 'users/',

  // Edit User
  editUser: 'users',

  // Delete User
  deleteUser: 'users',

  // User Personal Info Update
  updatePersonalInfo: 'profile/',

  // Fetch Amenity Listing
  fetchAmenity: 'amenities',

  // Add New Amenity
  addNewAmenity: 'amenities/',

  // Update Amenity
  editAmenity: 'amenities/',

  // Delete Amenity
  deleteAmenity: 'amenities',

  // Fetch Zones Listing
  fetchZones: 'zones/main',

  // Add New Zone
  addNewZone: 'zones/main/',

  // Update Zone
  updateZone: 'zones/main/',

  // Delete Zone
  deleteZone: 'zones',

  // Fetch Campus
  fetchCampus: 'zones/facilities',

  // Add New Campus
  addNewCampus: 'zones/facilities/',

  // Fetch Units
  fetchUnits: 'zones/units',

  // Add New Units
  addNewUnits: 'zones/units/',

  // Update Units
  updateUnits: 'zones/units/',

  // Delete Units
  deleteUnits: 'zones/units',

  // Fetch Categories
  fetchCategory: 'faqs/category',

  // Add Category
  addNewCategory: 'faqs/category/',

  // Update Category
  updateCategory: 'faqs/category/',

  // Delete Category
  deleteCategory: 'faqs/category',

  // Fetch FAQs
  fetchFAQs: 'faqs',

  // Add New FAQ
  addFAQs: 'faqs/',

  // Update FAQ
  updateFAQs: 'faqs/',

  // Delete FAQ
  deleteFAQ: 'faqs/bulk_destroy',

  // Fetch Access Logs
  accessLogs: 'hardware/accesslog',

  // Fetch Announcements
  fetchAnnouncements: 'announcements/',

  // Announcements Users
  announcementUsers: 'announcements/announcement_users/',

  // Add New Announcements
  addAnnouncements: 'announcements/',

  // Update Announcements
  updateAnnouncements: 'announcements/',

  // Delete Announcements
  deleteAnnouncements: 'announcements/bulk_destroy',

  // Create Customer
  createStripeCustomer: 'payments/customer/',

  // Make Card Default
  defaultCard: 'payments/update-card',

  // Open campus gate
  openCampusGate: 'zones/facility/admin/gate',

  // Open campus gate
  openCloseUnitGate: 'zones/units/admin/door',

  // Open campus gate
  unitDetails: 'zones/units-details',

  // Add unit Image
  unitImages: 'zones/units-image-upload',

  // Delete unit Image
  unitDeleteImages: 'zones/units-image-delete',

  //Bulk Unit Create CSV Template
  csvFileTemplate: 'zones/bulk-units',

  //Bulk Unit Create CSV Upload
  csvFileUpload: 'zones/bulk-units/',

  // Add New Team Member
  addNewTeamMember: 'zones/meet/',

  // Delete Team Member
  deleteTeamMember: 'zones/meet',

  // Update Team Member
  updateTeamMember: 'zones/meet',

  // Get Campus Page List
  campusPageList: 'zones/campus-page/',

  // Add New Campus Page
  addNewCampusPage: 'zones/campus-page/',

  // Update Campus Page
  updateCampusPage: 'zones/campus-page',

  // Images Upload Add New Campus
  addNewCampusePageImages: 'zones/campus-page-image-upload',

  // Delete Campus Page
  deleteCampusPage: 'zones/campus-page',

  // Delete Campus Image
  deleteCampusImages: 'zones/campus-page-image-delete',

  // Get Unit Page List
  unitPageList: 'zones/units-pages-list/',

  // Delete Unit Page
  deleteUnitPage: 'zones/delete-unit-page',

  // Get Blogs Page List
  blogList: 'blog/blog-post/',

  // Add New Blog
  addNewBlog: 'blog/blog-post/',

  // Add New Blog Images Upload
  addNewBlogImagesUpload: 'blog/blog-image-upload',

  // Add New Blog Images Upload
  singleBlogPageDetail: 'blog/blog-post',

  // Upload Blog
  updateBlog: 'blog/blog-post',

  // Delete Blog Page
  deleteBlogPage: 'blog/blog-post',

  // Delete Blog Images
  deleteBlogImages: 'blog/blog-image-delete',

  // Delete Blog Images
  updateVideoControls: 'blog/blog-image-upload',
};
