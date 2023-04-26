import { Center, Group, Button, Textarea, Select, Text, Container, TextInput, Box, SimpleGrid, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons';
import { axiosPrivate, CREATE_PROJECT_URL } from '../../../api/api';
import { errorNotification, loadingNotification, successNotification } from '../../../components';

const CreateProjectPage = () => {
  const form = useForm({
    initialValues: {
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

  const formSubmit = async (values) => {
    loadingNotification();
    await axiosPrivate.post(CREATE_PROJECT_URL, values)
      .then(res => {
        console.log(res?.data);
        successNotification(res?.data);
        form.reset();
      })
      .catch(err => {
        console.log(err);
        errorNotification(err?.response?.data?.message)
      })
  }

  return (
    <Container size={900} my={40}>
      <Text fw={700} fz={30} ta="center">Create Project</Text>
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
              inputFormat="DD MMMM, YYYY"
              labelFormat="DD MMMM,YYYY"
              defaultValue={new Date()}
              icon={<IconCalendar size={16} />}
              {...form.getInputProps('lastDateToApply')}
              required
            />

            {/* <FileInput
              label="Upload project Image"
              placeholder="Project picture"
              icon={<IconUpload size={14} />}
              accept='image/png,image/jpeg'
            /> */}

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
              <Button size="md" type="submit">Create Project</Button>
              <Button variant="outline" size="md" type='reset'>Reset</Button>
            </Group>
          </Center>
        </form>
      </Box>
    </Container>
  )
}

export default CreateProjectPage