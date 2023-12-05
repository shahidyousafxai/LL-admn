// Library Imports
import { Routes, Route, Navigate } from 'react-router-dom';

// Local Imports
import Layout from '../../utils/parentLayout/Layout';
import routes from './sideMenuRoutes';
import AuthMainContainer from '../screens/Auth/AuthMainContainer';
import AccountSettings from '../screens/Dashboard/AccountSettings/AccountSettings.jsx';
import AddNewCampusePageUI from '../screens/Dashboard/Pages/CampusesPage/AddNewCampusPage';
import PagePreview from '../../components/PreviewComponent/PagePreview';
import AddNewBlogPage from '../screens/Dashboard/Pages/BlogPage/AddNewPostPage';

export const RootRoutes = ({ user }) => (
  <Routes>
    <Route
      path='/'
      element={!user ? <AuthMainContainer /> : <Navigate to='/users' />}
    />
    <Route
      path='*'
      element={
        user ? (
          <Navigate to='/users' replace />
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />
    <Route
      path='/account-settings'
      element={
        user ? (
          <Layout>
            <AccountSettings />
          </Layout>
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />

    <Route
      path='/add-new-campus-page'
      element={
        user ? (
          <Layout>
            <AddNewCampusePageUI />
          </Layout>
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />
    <Route
      path='/add-new-post'
      element={
        user ? (
          <Layout>
            <AddNewBlogPage />
          </Layout>
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />
    <Route
      path='/edit-new-post/:id'
      element={
        user ? (
          <Layout>
            <AddNewBlogPage />
          </Layout>
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />
    <Route
      path='/edit-campus-page/:id'
      element={
        user ? (
          <Layout>
            <AddNewCampusePageUI />
          </Layout>
        ) : (
          <Navigate to='/' replace={true} />
        )
      }
    />
    <Route path='/preview-page' element={<PagePreview />} />
    {routes.map((item, index) => (
      <Route key={index}>
        <Route
          key={index}
          path={item.path}
          element={
            user ? (
              <Layout>{item.component}</Layout>
            ) : (
              <Navigate to='/' replace={true} />
            )
          }
        />
        {item.childs.map((child, index1) => (
          <Route
            key={index1}
            path={child.path}
            element={
              user ? (
                <Layout>{child.component}</Layout>
              ) : (
                <Navigate to='/' replace={true} />
              )
            }
          />
        ))}
      </Route>
    ))}
  </Routes>
);
