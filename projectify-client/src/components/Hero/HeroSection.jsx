import { Link } from 'react-router-dom';
import { PROJECTS_LINK } from '../../routes/route';
import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 150,
        paddingBottom: 160,
        backgroundImage: 'url(https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=980&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '@media (max-width: 520px)': {
            paddingTop: 80,
            paddingBottom: 50,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    ThemeToggler: {
        position: 'absolute',
        top: -120,
        right: 40,

        '@media (max-width: 520px)': {
            top: -60,
        },
    },

    title: {
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: -1,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][4],
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: 'center',

        '@media (max-width: 520px)': {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 1.5,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        height: 42,
        fontSize: theme.fontSizes.md,

        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: 'rgba(255, 255, 255, .4)',

        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .45) !important',
        },
    },
}));

export default function HeroSection() {
    const { classes } = useStyles();

    return (
        <div className={`${classes.wrapper} `}>
            <Overlay color="#000" opacity={0.6} zIndex={1} />
            <div className={classes.inner}>
                <div className={classes.ThemeToggler}>
                    {/* <ThemeToggles /> */}
                </div>

                <Title className={classes.title}>
                    Track and manage your projects{' '}
                    <Text component="span" inherit className={classes.highlight}>
                        with ease.
                    </Text>
                </Title>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        Build your projects and leave the tracking to us.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button component={Link} to={PROJECTS_LINK} className={classes.control} variant="filled" size="lg">Find Projects</Button>
                </div>
            </div>
        </div>
    );
}