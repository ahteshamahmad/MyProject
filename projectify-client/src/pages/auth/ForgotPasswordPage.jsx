import { Link } from 'react-router-dom'; 
import { LOGIN_LINK } from '../../routes/route';
import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
  
  const useStyles = createStyles(theme => ({
    title: {
      fontSize: 30,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));
  
  export default function ForgotPasswordPage() {
    const { classes } = useStyles();
  
    return (
      <Container size={420} my={50}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className='text-left'>
          <TextInput label="Your email" placeholder="me@nseit.com" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor component={Link} to={LOGIN_LINK} color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }