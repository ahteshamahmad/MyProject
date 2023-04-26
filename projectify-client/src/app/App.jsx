import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BASE_PATH, CONTACT_US_PATH, LOGIN_PATH, PROJECTS_PATH, SIGNUP_PATH, NO_MATCH_PATH, FORGOT_PASSWORD_PATH, UNAUTHORIZED_PATH, ADMIN_DASHBOARD_PATH, MANAGER_DASHBOARD_PATH, EMPLOYEE_DASHBOARD_PATH, CREATE_MANAGER_PATH, CREATE_EMPLOYEE_PATH, CREATE_PROJECT_PATH, CREATED_PROJECTS_PATH, MANAGERS_PATH, MANAGER_DETAILS_MID_PATH, EMPLOYEES_PATH, EMPLOYEE_DETAILS_EID_PATH, PROJECT_DETAILS_PID_PATH, PROJECT_UPDATE_PID_PATH } from '../routes/route';
import './App.css';
import { HeaderMenu } from '../components';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { UnauthorizedPage, Layout, RequireAuthPage, NoMatchFoundPage, HomePage, ProjectsPage, ContactUsPage, LoginPage, SignupPage, ForgotPasswordPage, AdminDashboardPage, ManagerDashboardPage, EmployeeDashboardPage, CreateManagerPage, CreateEmployeePage, CreateProjectPage, CreatedProjectsPage, ManagersPage, ManagerDetailsPage, EmployeesPage, ProjectDetailsPage, ProjectUpdatePage } from '../pages';
import { NotificationsProvider } from '@mantine/notifications';
import EmployeeDetailsPage from '../pages/private/EmployeeDetailsPage';
import useStore from '../hooks/useStore';

const ROLES = [
  { authority: 'ADMIN' },
  { authority: 'MANAGER' },
  { authority: 'EMPLOYEE' }
]

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [isLoggedIn, setisLoggedIn] = useState();
  const store = useStore();

  useEffect(() => {
    document.title = 'Projectify | Project portal or internal organization';
  }, []);

  console.log("Context provider -> ", store);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS
        theme={{
          colorScheme,
          dir: 'ltr',
          cursorType: 'pointer',
          // fontFamily: 'Roboto', 
          primaryColor: 'violet',
          activeStyles: {
            transform: 'scale(0.95)'
          },
          components: {
            Button: {
              styles: {
                root: {

                }
              }
            }
          }
        }}>
        <NotificationsProvider position="bottom-center" autoClose={2000} zIndex={2077}>
          <div className="App">
            <HeaderMenu isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
            <Routes>
              <Route path={BASE_PATH} element={<Layout />}>
                <Route path={BASE_PATH} element={<HomePage />} />
                <Route path={PROJECTS_PATH} element={<ProjectsPage />} />
                <Route path={PROJECT_DETAILS_PID_PATH} element={<ProjectDetailsPage />} />
                <Route path={CONTACT_US_PATH} element={<ContactUsPage />} />
                <Route path={LOGIN_PATH} element={<LoginPage />} />
                <Route path={SIGNUP_PATH} element={<SignupPage />} />
                <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPasswordPage />} />
                <Route path={UNAUTHORIZED_PATH} element={<UnauthorizedPage />} />


                <Route element={<RequireAuthPage allowedRoles={[ROLES[0].authority]} />}>
                  <Route path={ADMIN_DASHBOARD_PATH} element={<AdminDashboardPage />} />
                  <Route path={CREATE_MANAGER_PATH} element={<CreateManagerPage />} />
                  <Route path={CREATE_EMPLOYEE_PATH} element={<CreateEmployeePage />} />
                </Route>

                <Route element={<RequireAuthPage allowedRoles={[ROLES[1].authority]} />}>
                  <Route path={MANAGER_DASHBOARD_PATH} element={<ManagerDashboardPage />} />
                  <Route path={CREATE_PROJECT_PATH} element={<CreateProjectPage />} />
                  <Route path={CREATED_PROJECTS_PATH} element={<CreatedProjectsPage />} />
                </Route>

                <Route element={<RequireAuthPage allowedRoles={[ROLES[2].authority]} />}>
                  <Route path={EMPLOYEE_DASHBOARD_PATH} element={<EmployeeDashboardPage />} />
                </Route>

                <Route element={<RequireAuthPage allowedRoles={[ROLES[0].authority, ROLES[1].authority]} />}>
                  <Route path={PROJECT_UPDATE_PID_PATH} element={<ProjectUpdatePage/>} />
                </Route>

                <Route element={<RequireAuthPage allowedRoles={[ROLES[0].authority, ROLES[1].authority, ROLES[2].authority]} />}>
                  <Route path={MANAGERS_PATH} element={<ManagersPage />} />
                  <Route path={MANAGER_DETAILS_MID_PATH} element={<ManagerDetailsPage />} />
                  <Route path={EMPLOYEES_PATH} element={<EmployeesPage />} />
                  <Route path={EMPLOYEE_DETAILS_EID_PATH} element={<EmployeeDetailsPage />} />
                </Route>

                <Route path={NO_MATCH_PATH} element={<NoMatchFoundPage />} />
              </Route>
            </Routes>
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
