import { Container, SimpleGrid, Card } from '@mantine/core'
import { IconFiles, IconFilePlus } from '@tabler/icons';
import { createStyles, Text, UnstyledButton, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CREATED_PROJECTS_LINK, CREATE_PROJECT_LINK } from '../../../routes/route';

const mockdata = [
  { title: 'Create Project', icon: IconFilePlus, color: 'dark', href: CREATE_PROJECT_LINK },
  { title: 'Created Projects', icon: IconFiles, color: 'dark', href: CREATED_PROJECTS_LINK },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

const ManagerDashboardPage = () => {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton component={Link} to={item.href} key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container size="xs" px="xs" mt={150}>
      <Card p="xl" className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Welcome to Manager Page</Text>
        </Group>
        <SimpleGrid cols={2} mt="md" mb='md'>
          {items}
        </SimpleGrid>
      </Card>
    </Container>
  )
}

export default ManagerDashboardPage