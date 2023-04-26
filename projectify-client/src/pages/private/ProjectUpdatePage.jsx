import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Center, Group, Button, Textarea, Select, Text, Container, TextInput, Box, SimpleGrid, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons';
import { axiosPrivate, UPDATE_PROJECT_URL } from '../../api/api';
import { errorNotification, loadingNotification, successNotification } from '../../components';
import useStore from '../../hooks/useStore';
import { GET_PROJECT_URL } from '../../api/api';
import dayjs from 'dayjs';

const ProjectUpdatePage = () => {
    const navigate = useNavigate();
    const {  setProject } = useStore();
    const [appliedEmployee, setAppliedEmployee] = useState([]);
    const { pid } = useParams();

    const form = useForm({
        initialValues: {
            id: 0,
            applied: 0,
            dateOfCreation: new Date(),
            title: '',
            domain: '',
            location: '',
            requiredEmployee: 0,
            image: '',
            lastDateToApply: '',
            experience: 0,
            description: '',
        }
    })
    
    console.log(form.values)

    const formSubmit = async (values) => {
        loadingNotification();
        await axiosPrivate.post(UPDATE_PROJECT_URL, values)
            .then(res => {
                console.log(res?.data);
                successNotification(res?.data);
                form.reset();
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
                errorNotification(err?.response?.data?.message)
            })
    }

    useEffect(() => {
        async function fetch() {
            loadingNotification();
            axiosPrivate.get(GET_PROJECT_URL + pid)
                .then(res => {
                    console.log(res?.data)
                    const project = res?.data?.project;
                    form.setValues((values) => ({
                        ...values,
                        id: project?.id,
                        applied: project?.applied,
                        dateOfCreation: dayjs(project?.dateOfCreation).format('DD MMM, YYYY'),
                        title: project?.title,
                        domain: project?.domain,
                        location: project?.location,
                        requiredEmployee: project?.requiredEmployee,
                        image: project?.image,
                        lastDateToApply: dayjs(project?.lastDateToApply).format('DD MMM, YYYY'),
                        experience: project?.experience,
                        description: project?.description,
                    }))
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

    return (
        <Container size={900} my={40}>
            <Text fw={700} fz={30} ta="center">Update Project</Text>
            <Box sx={{ maxWidth: 900 }} mt={20} mx="auto" className='text-left'>
                <form onSubmit={form.onSubmit(values => formSubmit(values))} onReset={() => form.reset()}>
                    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={20}>
                        <TextInput
                            label="Project Title"
                            placeholder='Project Title'
                            {...form.getInputProps('title')}
                            required
                        />

                        <TextInput
                            withAsterisk
                            label="Project Domain"
                            placeholder='Project Domain'
                            {...form.getInputProps('domain')}
                            required
                        />

                        <Select
                            label="Project Location"
                            placeholder="Project Location"
                            data={[
                                { value: 'Mumbai', label: 'Mumbai' },
                                { value: 'Chennai', label: 'Chennai' },
                                { value: 'Bangalore', label: 'Bangalore' },
                                { value: 'Pune', label: 'Pune' },
                            ]}
                            {...form.getInputProps('location')}
                            required
                        />

                        <NumberInput
                            defaultValue={0}
                            min={0}
                            label="Number of open positions"
                            {...form.getInputProps('requiredEmployee')}
                            required
                        />

                        <NumberInput
                            defaultValue={0}
                            min={0}
                            label="Required experience (years)"
                            placeholder='Experience in years'
                            {...form.getInputProps('experience')}
                            required
                        />

                        <DatePicker
                            label="Last date to apply"
                            placeholder="last date"
                            inputFormat="DD MMM, YYYY"
                            labelFormat="DD MMM,YYYY"
                            defaultValue={new Date()}
                            icon={<IconCalendar size={16} />}
                            {...form.getInputProps('lastDateToApply')}
                            required
                        />

                    </SimpleGrid>
                    <SimpleGrid mt="lg" mx={100}>
                        <Textarea
                            label="Project Description"
                            placeholder="Enter Project Details"
                            autosize
                            minRows={6}
                            {...form.getInputProps('description')}
                            required
                        />
                    </SimpleGrid>
                    <Center mt={10}>
                        <Group position="center" mt="xl">
                            <Button size="md" type="submit">Update Project</Button>
                            <Button variant="outline" size="md" type='reset'>Reset</Button>
                        </Group>
                    </Center>
                </form>
            </Box>
        </Container>
    )
}

export default ProjectUpdatePage