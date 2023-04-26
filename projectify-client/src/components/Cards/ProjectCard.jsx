import { Stack, Avatar, Flex, Card, Text, Group, Badge, createStyles, Center, Button, ActionIcon } from '@mantine/core';
import { IconUserPlus, IconComponents, IconMapPin, IconUsers, IconCalendarTime } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { PROJECT_DETAILS_PID_LINK } from '../../routes/route';
import projectLogo from '../../image/project/projectLogo.png';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.indigo[0],
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  icon: {
    marginRight: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

export default function ProjectCard({ project,buttonValue }) {
  const { classes } = useStyles();
  const { id, applied, dateOfCreation, domain, experience, lastDateToApply, location, requiredEmployee, title } = project;
  
  const mockdata = [
    { label: domain || 'NA', icon: IconComponents },
    { label: requiredEmployee || 'NA', icon: IconUsers },
    { label: lastDateToApply ? dayjs(lastDateToApply).format('DD MMM, YYYY') : 'NA', icon: IconCalendarTime },
    { label: `${experience} years` || 0, icon: IconUserPlus },
  ];
  
  const features = mockdata.map((feature, id) => (
    <Center key={id} px={10}>
      <feature.icon size={18} className={classes?.icon} stroke={1.5} />
      <Text size="xs">{feature?.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={`${classes.card} text-left`}>
      <Stack justify="space-between" className='h-full'>
        <div>
          <Group position='apart' grow>
            <div className='flex flex-row justify-between items-center w-full'>
              <Avatar src={projectLogo} />
              <Text fz='small' c="dimmed" className='created-date'>{dateOfCreation ? dayjs(dateOfCreation).format('DD MMM, YYYY') : 'NA'}</Text>
            </div>
          </Group>

          <Group position="apart" mt="md">
            <div>
              <Text size='xl' weight={700}>{title}</Text>
              <Flex>
                <ActionIcon size='xs'><IconMapPin /></ActionIcon>
                <Text size="xs" color="dimmed">{location}</Text>
              </Flex>
            </div>
            <Badge variant="outline">{`${applied} applied`}</Badge>
          </Group>

          <Card.Section className={classes.section} mt="md">
            <Text size="sm" color="dimmed" className={classes.label}>
              Basic Information
            </Text>

            <Group spacing={10} mb={-10}>
              {features}
            </Group>
          </Card.Section>
        </div>

        <Card.Section className={classes.section}>
          <Group grow>
            <Button component={Link} to={`${PROJECT_DETAILS_PID_LINK}${id}`} radius="xl" style={{ flex: 1 }}>
              {
                buttonValue
              }
            </Button>
          </Group>
        </Card.Section>
      </Stack>
    </Card>
  );
}