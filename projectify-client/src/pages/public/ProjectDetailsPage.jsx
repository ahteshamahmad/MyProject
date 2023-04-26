import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ActionIcon, Container, Box, Grid, SimpleGrid, Text, Button, Group } from '@mantine/core';
import { IconCalendarTime, IconUserPlus, IconMapPin, IconCalendar, IconUsers, IconUser } from '@tabler/icons';
import useStore from '../../hooks/useStore';
import { LOGIN_LINK, PROJECTS_LINK, PROJECT_UPDATE_PID_LINK } from '../../routes/route';
import { loadingNotification, successNotification, errorNotification } from '../../components';
import axios, { APPLY_PROJECT_URL, axiosPrivate, DELETE_PROJECT_URL, GET_PROJECT_URL } from '../../api/api';
import dayjs from 'dayjs';

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { currentUser, project, setProject } = useStore();
  const [appliedEmployee, setAppliedEmployee] = useState([]);
  const { pid } = useParams();


  const applyForProject = async () => {
    loadingNotification();
    await axiosPrivate.get(`${APPLY_PROJECT_URL}${pid}`)
      .then(res => {
        console.log(res?.data);
        successNotification(res?.data);
        navigate(PROJECTS_LINK);
      })
      .catch(err => {
        console.log(err)
        errorNotification(err?.response?.data?.message || err?.message)
      })
  }

  const deleteProject = async () => {
    loadingNotification();
    await axiosPrivate.get(`${DELETE_PROJECT_URL}${pid}`)
      .then(res => {
        console.log(res?.data);
        successNotification(res?.data);
        navigate(-1);
      })
      .catch(err => {
        console.log(err)
        errorNotification(err?.response?.data?.message || err?.message)
      })
  }

  useEffect(() => {
    async function fetch() {
      loadingNotification();
      axios.get(GET_PROJECT_URL + pid)
        .then(res => {
          console.log(res?.data)
          setProject(res?.data?.project)
          setAppliedEmployee(res?.data?.allAppliedEmployee)
          successNotification("Project Details fetched successfully");
        })
        .catch(err => {
          console.log(err);
          errorNotification(err?.response?.data?.message || err?.message)
        })
    }
    fetch();
  }, [pid, setProject])

  const { id, applied, description, dateOfCreation, domain, experience, lastDateToApply, location, requiredEmployee, title } = project;
  return (
    <Container my="xl">
      <SimpleGrid cols={2} spacing="xs" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }]}>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Box sx={{ maxWidth: 600 }} mt={20} mx="auto" className='text-left' color='dimmed'>
              <Text align="left" fz={30} fw={700} color="">{title || 'NA'}</Text>
              <Text align="left" color="dimmed" size="m">{domain || 'NA'}</Text>

              <SimpleGrid cols={2} my={20}>
                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconUserPlus />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Experience required</Text>
                    <Text size="md" fw={400}>{`${experience} Years` || 0}</Text>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconMapPin />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Project Location</Text>
                    <Text size="md" fw={400}>{location}</Text>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconCalendar />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Project Posted</Text>
                    <Text size="md" fw={400}>{dateOfCreation ? dayjs(dateOfCreation).format('DD MMM, YYYY') : 'NA'}</Text>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconCalendarTime />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Last date to apply</Text>
                    <Text size="md" fw={400}>{lastDateToApply ? dayjs(lastDateToApply).format('DD MMM, YYYY') : 'NA'}</Text>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconUser />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Open Position</Text>
                    <Text size="md" fw={400}>{requiredEmployee}</Text>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={2}>
                    <ActionIcon color="violet" size="lg" variant="transparent">
                      <IconUsers />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <Text color="violet" size="sm" mt={3} fw={500}>Project Applicants</Text>
                    <Text size="md" fw={400}>{applied}</Text>
                  </Grid.Col>
                </Grid>
              </SimpleGrid>
              <Grid>
                <Group position="Left" mt={20} mx='md'>
                  {
                    currentUser?.manager
                      ? (<>
                        <Button component={Link} to={`${PROJECT_UPDATE_PID_LINK}${id}`} size="md" px='xl' type="submit">Update Project</Button>
                        <Button onClick={deleteProject} size="md" px='xl' type="submit" variant="outline" color="red">Delete Project</Button>
                      </>)
                      : currentUser?.employee
                        ? appliedEmployee?.find(employee => currentUser?.employee?.employeeCode === employee?.employeeCode)
                          ? <Button size="md" px='xl' type="submit" disabled>Already applied</Button>
                          : <Button size="md" px='xl' type="submit" onClick={applyForProject}>Apply</Button>
                        : currentUser?.admin ? '' : <Button component={Link} to={LOGIN_LINK} size="md" px='xl' type="submit">Log in to apply</Button>
                  }
                </Group>
              </Grid>
            </Box>
          </Grid.Col>
        </Grid>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Text align="left" fz={25} fw={600} color="" mt={20}>Project Description</Text>
            <Text align="left" color="dimmed" size="md" mt={20}>{description}</Text>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}


export default ProjectDetailsPage