import { Center, Container, createStyles, Text } from '@mantine/core';
import useStore from '../../hooks/useStore';

const useStyles = createStyles(theme => ({
    root: {
        display: 'flex',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
        padding: theme.spacing.md * 1.5,
        borderRadius: theme.radius.md,
        position: 'absolute',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: theme.fontSizes.sm,
    },

    count: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
        fontWeight: 800,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.sm,
        marginTop: 5,
    },

    stat: {
        flex: 1,
        textAlign: 'left',

        '& + &': {
            paddingLeft: theme.spacing.md,
            marginLeft: theme.spacing.md,
            borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

            [theme.fn.smallerThan('sm')]: {
                paddingLeft: 0,
                marginLeft: 0,
                borderLeft: 0,
                paddingTop: theme.spacing.xl,
                marginTop: theme.spacing.xl,
                borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
            },
        },
    },
}));

export default function GroupStats() {
    const { classes } = useStyles();
    const { home } = useStore();

    const data = [
        {
            title: "Active Projects",
            stats: home?.projects || 0,
            description: "A great projects dashboard for employee to apply and managers to create as many projects."
        },
        {
            title: "Employees",
            stats: home?.employees || 0,
            description: "Seamless experience for project applied and manage projects based on manager creation."
        },
        {
            title: "Managers",
            stats: home?.managers || 0,
            description: "Making the job of a manager a tad easier with project tracking."
        }
    ]

    const stats = data.map(stat => (
        <div key={stat.title} className={classes.stat}>
            <Text className={classes.count}>{stat.stats}</Text>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.description}>{stat.description}</Text>
        </div>
    ));

    return (
        <Container className='md:mx-auto mx-5 px-0 md:mt-0 mt-56 relative z-10'>
            <Center>
                <div className={classes.root}>{stats}</div>
            </Center>
        </Container>
    );
}