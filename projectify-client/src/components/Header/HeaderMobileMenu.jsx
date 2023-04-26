import { Link, useNavigate } from "react-router-dom";
import { CONTACT_US_LINK, LOGIN_LINK, PROJECTS_LINK, ADMIN_DASHBOARD_LINK, MANAGER_DASHBOARD_LINK, EMPLOYEE_DASHBOARD_LINK, EMPLOYEES_LINK, MANAGERS_LINK } from '../../routes/route';
import { createStyles, Drawer, ScrollArea, Divider, Group, Button } from "@mantine/core";
import { removeToken } from '../../utils/localstorageItem';
import useStore from '../../hooks/useStore';
import ThemeToggle from "../Buttons/ThemeToggles";
// import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
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
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const roleBasedDashboard = [
    { authority: 'ADMIN', dashboard_link: ADMIN_DASHBOARD_LINK, managers_link: MANAGERS_LINK, employees_link: EMPLOYEES_LINK },
    { authority: 'MANAGER', dashboard_link: MANAGER_DASHBOARD_LINK, managers_link: MANAGERS_LINK, employees_link: EMPLOYEES_LINK },
    { authority: 'EMPLOYEE', dashboard_link: EMPLOYEE_DASHBOARD_LINK, managers_link: MANAGERS_LINK, employees_link: EMPLOYEES_LINK }
]

const HeaderMobileMenu = ({ drawerOpened, closeDrawer }) => {
    // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { auth, setAuth, currentUser, setCurrentUser } = useStore();
    const { classes, theme } = useStyles();
    const navigate = useNavigate();

    const logoutHandle = () => {
        removeToken();
        setAuth({});
        setCurrentUser();
        navigate(LOGIN_LINK);
    }

    return (
        <Drawer opened={drawerOpened} onClose={closeDrawer} className={classes.hiddenDesktop} title="Menu" size="100%" padding="md" zIndex={1000000}>
            <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
                <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
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
                <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                <Group position="center" grow pb="xl" px="md">
                    <ThemeToggle />
                    {
                        currentUser
                            ? <Button onClick={() => logoutHandle()} variant="outline">Log out</Button>
                            : <Button component={Link} to={LOGIN_LINK} variant="outline">Log in</Button>
                    }
                </Group>
            </ScrollArea>
        </Drawer>
    )
}

export default HeaderMobileMenu;