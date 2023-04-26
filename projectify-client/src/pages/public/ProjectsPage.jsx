import { TextInput, ActionIcon, useMantineTheme, Container, Grid, SimpleGrid, Text, Flex, Center } from '@mantine/core';
import { errorNotification, ProjectCard, successNotification } from '../../components'
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { useEffect } from 'react';
import useStore from '../../hooks/useStore';
import { loadingNotification } from '../../components';
import axios, { GET_ALL_PROJECTS_URL } from '../../api/api';
import { useForm } from '@mantine/form';

const ProjectsPage = () => {
  const theme = useMantineTheme();
  const { currentUser, allProjects, setAllProjects } = useStore();

  const form = useForm({
    initialValues: {
      query: '',
    },
  });

  const formSearchSubmit = projects => {
    if(form.values.query === '') {
      return projects;
    }
    else if (projects.title?.toLowerCase().includes(form.values.query?.toLowerCase()) || projects.domain?.toLowerCase().includes(form.values.query?.toLowerCase())) {
      return projects;
    }
    return null;
  }

  useEffect(() => {
    async function fetch() {
      loadingNotification();
      await axios.get(GET_ALL_PROJECTS_URL)
        .then(res => {
          console.log(res?.data)
          setAllProjects(res?.data)
          successNotification("Projects fetched successfully");
        })
        .catch(err => {
          console.log(err);
          errorNotification(err?.response?.data?.message || err?.message)
        })
    }
    fetch();
  }, [allProjects?.length, setAllProjects])

  const filteredProjects = allProjects.filter((projects) => formSearchSubmit(projects));
  return (
    <Center>
      <Container size="lg" my="lg" mx='lg' py='lg' px='lg'>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Flex justify='space-between'>
              <Text fz={20} fw={700} color="dimmed">Results {filteredProjects?.length}</Text>
              <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="xl"
                size="md"
                rightSection={
                  <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    {theme.dir === 'ltr' ? (
                      <IconArrowRight size={18} stroke={1.5} />
                    ) : (
                      <IconArrowLeft size={18} stroke={1.5} />
                    )}
                  </ActionIcon>
                }
                placeholder="Search project"
                rightSectionWidth={42}
                {...form.getInputProps('query')}
              />
            </Flex>
            <SimpleGrid cols={4} spacing={30} py={30} breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 755, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
              {
                filteredProjects?.length > 0
                ? filteredProjects?.map(project => {
                    return <ProjectCard key={project?.id} project={project} buttonValue={!currentUser?.employee ? "View Project" : "Apply now" } />
                  })
                : <Center className="w-full text-center text-lg">
                    <Text c="violet" className="p-2 text-lg font-semibold">No Projects Found</Text>
                </Center>
              }
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  )
}

export default ProjectsPage