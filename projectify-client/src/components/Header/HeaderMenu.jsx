import { Link, useNavigate } from 'react-router-dom';
import { BASE_PATH, CONTACT_US_LINK, PROJECTS_LINK, LOGIN_LINK, ADMIN_DASHBOARD_LINK, MANAGER_DASHBOARD_LINK, EMPLOYEE_DASHBOARD_LINK, EMPLOYEES_LINK, MANAGERS_LINK } from '../../routes/route';
import NSElogo from '../../icon/NSE_Logo.svg';
import HeaderMobileMenu from './HeaderMobileMenu';
import { useDisclosure } from '@mantine/hooks';
import { Image, createStyles, Header, Group, Button, Box, Burger } from '@mantine/core';
import { removeToken } from '../../utils/localstorageItem';
import useStore from '../../hooks/useStore';
import ThemeToggle from '../Buttons/ThemeToggles';

const useStyles = createStyles(theme => ({
    activeLink: {
        color: theme.colors.violet[5]
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colors.violet[5]
        }),
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const roleBasedDashboard = [
    { authority: 'ADMIN', dashboard_link: ADMIN_DASHBOARD_LINK, managers_link: MANAGERS_LINK , employees_link: EMPLOYEES_LINK },
    { authority: 'MANAGER', dashboard_link: MANAGER_DASHBOARD_LINK, managers_link: MANAGERS_LINK , employees_link: EMPLOYEES_LINK },
    { authority: 'EMPLOYEE', dashboard_link: EMPLOYEE_DASHBOARD_LINK, managers_link: MANAGERS_LINK , employees_link: EMPLOYEES_LINK }
]

export default function HeaderMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { auth, setAuth, currentUser, setCurrentUser } = useStore();
    const { classes } = useStyles();
    const navigate = useNavigate();

    const logoutHandle = () => {
        removeToken();
        setAuth({});
        setCurrentUser();
        navigate(LOGIN_LINK);
    }

    return (
        <Box>
            <Header height={60} px="md" className='lg:px-10'>
                <Group position="apart" sx={{ height: '100%' }}>
                    <div style={{ width: 100 }}>
                        <Link to={BASE_PATH}>
                            <Image src={NSElogo} className='h-auto mx-auto' width={100} alt="logo" withPlaceholder />
                        </Link>
                    </div>

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        { 
                            roleBasedDashboard?.map(dashboard => {
                                const { authority, dashboard_link } = dashboard
                                return authority !== 'EMPLOYEE' ? authority === auth?.roles?.[0]?.authority && <Link key={authority} to={dashboard_link} className={classes.link}>Dashboard</Link> : ''
                            })
                        }
                        <Link to={PROJECTS_LINK} className={classes.link}>Projects</Link>
                        { 
                            roleBasedDashboard?.map(dashboard => {
                                const { authority, managers_link } = dashboard
                                return authority === auth?.roles?.[0]?.authority && <Link key={authority} to={managers_link} className={classes.link}>Managers</Link> 
                            })
                        }
                        { 
                            roleBasedDashboard?.map(dashboard => {
                                const { authority, employees_link } = dashboard
                                return authority === auth?.roles?.[0]?.authority && <Link key={authority} to={employees_link} className={classes.link}>Employees</Link> 
                            })
                        }
                        <Link to={CONTACT_US_LINK} className={classes.link}>Contact Us</Link>
                    </Group>

                    <Group className={`${classes.hiddenMobile}`}>
                        <ThemeToggle/>
                        {
                            currentUser
                            ? <Button onClick={() => logoutHandle()} variant="outline">Log out</Button>
                            : <Button component={Link} to={LOGIN_LINK} variant="outline">Log in</Button>
                        }
                    </Group>
                    

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <HeaderMobileMenu drawerOpened={drawerOpened} closeDrawer={closeDrawer}/>
        </Box>
    );
}