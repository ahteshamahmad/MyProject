import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { errorNotification, loadingNotification, successNotification, ProjectCardMini } from '../../components';
import { Text, Center, Container, Box, Grid, SimpleGrid, ActionIcon } from '@mantine/core';
import { IconAt, IconMapPin, IconCalendar, IconUser } from '@tabler/icons';
import { axiosPrivate, GET_EMPLOYEE_URL } from '../../api/api';
import dayjs from 'dayjs';

const EmployeeDetailsPage = () => {
    const [employeeDetails, setEmployeeDetails] = useState({});
    const { eid } = useParams();

    useEffect(() => {
        async function fetch() {
            loadingNotification()
            axiosPrivate.get(`${GET_EMPLOYEE_URL}${eid}`)
                .then(res => {
                    console.log(res?.data);
                    setEmployeeDetails(res?.data)
                    successNotification("Employee Details fetched successfully")
                })
                .catch(err => {
                    console.log(err);
                    errorNotification(err?.response?.data?.message || err?.message)
                })
        }
        fetch();
    }, [eid])

    const { firstName, middleName, lastName, designation, employee, email, officeLocation, dateOfJoining } = employeeDetails;
    return (
        <Container my={0}>
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }]}>
                <Grid gutter="md" grow>
                    <Grid.Col xs={12}>
                        <Box sx={{ maxWidth: 900 }} mt={20} mx="auto" color='dimmed' className='text-left'>
                            <Text align="left" fz={30} fw={700}>{firstName} {middleName} {lastName}</Text>
                            <Text align="left" color="dimmed" size="m">{designation}</Text>
                            <SimpleGrid cols={2} my={20}>
                                <Grid>
                                    <Grid.Col span={2}>
                                        <ActionIcon color="violet" size="lg" variant="transparent">
                                            <IconUser />
                                        </ActionIcon>
                                    </Grid.Col>
                                    <Grid.Col span='auto'>
                                        <Text color="violet" size="sm" mt={3} fw={500}>Employee Code</Text>
                                        <Text size="md" fw={400}>{employee?.employeeCode || 'NA'}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={2}>
                                        <ActionIcon color="violet" size="lg" variant="transparent">
                                            <IconAt />
                                        </ActionIcon>
                                    </Grid.Col>
                                    <Grid.Col span='auto'>
                                        <Text color="violet" size="sm" mt={3} fw={500}>Email</Text>
                                        <Text size="md" fw={400}>{email || 'NA'}</Text>
                                    </Grid.Col>
                                </Grid>

                                <Grid>
                                    <Grid.Col span={2}>
                                        <ActionIcon color="violet" size="lg" variant="transparent">
                                            <IconMapPin />
                                        </ActionIcon>
                                    </Grid.Col>
                                    <Grid.Col span='auto'>
                                        <Text color="violet" size="sm" mt={3} fw={500}>Office Location</Text>
                                        <Text size="md" fw={400}>{officeLocation || 'NA'}</Text>
                                    </Grid.Col>
                                </Grid>

                                <Grid>
                                    <Grid.Col span={2}>
                                        <ActionIcon color="violet" size="lg" variant="transparent">
                                            <IconCalendar />
                                        </ActionIcon>
                                    </Grid.Col>
                                    <Grid.Col span='auto'>
                                        <Text color="violet" size="sm" mt={3} fw={500}>Joining Date</Text>
                                        <Text size="md" fw={400}>{dateOfJoining ? dayjs(dateOfJoining).format('DD MMM, YYYY') : 'NA'}</Text>
                                    </Grid.Col>
                                </Grid>
                            </SimpleGrid>
                        </Box>
                    </Grid.Col>
                </Grid>
                <Grid gutter="md" manager>
                    <Grid.Col xs={12}>
                        <Box sx={{ maxWidth: 900 }} mt={60} mx="auto" color='dimmed' className='text-left'>
                            <Text align="left" fz={20} fw={500}>Active Projects</Text>
                            <Text align="left" color="violet" fz={40} fw={700}>{employee?.activeProjects}</Text>
                            {/* <Text align="left" fz={20} fw={500}>Completed Projects</Text> */}
                            {/* <Text align="left" color="violet" fz={40} fw={700}>{employee?.completedProjects}</Text> */}
                        </Box>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>

            <Center>
                <Container size="lg" my="lg" mx='lg' py='lg' px='lg'>
                    <Grid gutter="md" grow>
                        <Grid.Col>
                            { employee?.activeProjects > 0 && <Text align="left" fz={20} fw={500}>Applied Projects</Text> }
                            <SimpleGrid cols={4} spacing={30} py={30} breakpoints={[
                                { maxWidth: 980, cols: 3, spacing: 'md' },
                                { maxWidth: 755, cols: 2, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                            ]}>
                                {
                                    employee?.projects.map(project => {
                                        return <ProjectCardMini key={project?.id} project={project} buttonValue="View project" />
                                    })
                                }
                            </SimpleGrid>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Center>

        </Container>
    )
}

export default EmployeeDetailsPage