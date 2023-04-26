import { Link } from 'react-router-dom';
import { BASE_PATH } from '../routes/route';
import NoMatchFound_img from '../image/NoMatchFound_img.svg'
import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';

const useStyles = createStyles(theme => ({
    root: {
        paddingTop: 150,
        paddingBottom: 150,
        // border: '2px solid red',
        [theme.fn.smallerThan('sm')]: {
            paddingTop: 50,
            paddingBottom: 50,
        },
    },

    title: {
        fontWeight: 900,
        fontSize: 34,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function NotMatchFound() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={100} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 80 }]}>
                <Image src={NoMatchFound_img} className={classes.mobileImage} />
                <div className='text-left'>
                    <Title className={classes.title}>Something is not right...</Title>
                    <Text color="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Button component={Link} to={BASE_PATH} variant="outline" size="md" mt="xl" className={classes.control}>
                        Get back to home page
                    </Button>
                </div>
                <Image src={NoMatchFound_img} className={classes.desktopImage} />
            </SimpleGrid>
        </Container>
    );
}