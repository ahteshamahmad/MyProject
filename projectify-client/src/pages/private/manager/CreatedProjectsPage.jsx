import { useEffect } from 'react';
import { Container, Grid, SimpleGrid, Text, Flex, Center } from '@mantine/core';
import { errorNotification, loadingNotification, ProjectCard, successNotification } from '../../../components'
import { axiosPrivate, GET_MANAGER_PROJECTS_URL } from '../../../api/api';
import useStore from '../../../hooks/useStore';

const CreatedProjectsPage = () => {
  const { currentUser, managerProjects, setManagerProjects } = useStore();

  useEffect(() => {
    async function fetch() {
      loadingNotification();
      axiosPrivate.get(`${GET_MANAGER_PROJECTS_URL}${currentUser.manager.managerCode}`)
        .then(res => {
          console.log(res?.data)
          setManagerProjects(res?.data?.managerProjects)
          successNotification(res?.data?.message)
        })
        .catch(err => {
          console.log(err);
          errorNotification(err?.response?.data?.message || err?.message);
        })
    }
    fetch();
  }, [currentUser?.manager?.managerCode, managerProjects?.length, setManagerProjects])

  return (
    <Center>
      <Container size="lg" my="lg" mx='lg' py='lg' px='lg'>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Flex justify='space-between'>
              <Text fz={20} fw={700} color="dimmed">Results {managerProjects?.length}</Text>
            </Flex>
            <SimpleGrid cols={4} spacing={30} py={30} breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 755, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
              {
                managerProjects.map(project => {
                  return <ProjectCard key={project?.id} project={project} buttonValue="View Details" />
                })
              }
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  )
}

export default CreatedProjectsPage