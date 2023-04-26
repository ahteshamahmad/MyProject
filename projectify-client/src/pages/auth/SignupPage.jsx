import { Group, Text, Select, NumberInput, Container, TextInput, Center, Button, Box, SimpleGrid, PasswordInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons';
import { errorNotification, loadingNotification, successNotification } from '../../components';
import axios, { CREATE_ADMIN_URL } from '../../api/api';
import { randomId } from '@mantine/hooks';

const SignupPage = () => {

  const form = useForm({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: randomId().slice(8),
      dateOfJoining: '',
      officeLocation: '',
      probationPeriod: 0,
      designation: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const formSubmit = async (values) => {
    console.log(values);
    loadingNotification();
    await axios.post(CREATE_ADMIN_URL, values)
      .then(res => {
        console.log(res.data);
        successNotification(res?.data);
        form.reset();
      })
      .catch(err => {
        console.log(err.response.data);
        errorNotification(err?.response?.data?.message || 'Oops... Something went wrong')
      })
  }


  return (
    <Container size={900} my={40}>
      <Text fw={700} fz={30} ta="center">Create Admin</Text>
      <Box sx={{ maxWidth: 900 }} mt={20} mx="auto" className='text-left'>
        <form onSubmit={form.onSubmit(values => formSubmit(values))} onReset={() => form.reset()}>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={20}>
            <TextInput
              label="First Name"
              placeholder="First Name"
              {...form.getInputProps('firstName')}
              required
            />

            <TextInput
              label="Middle Name"
              placeholder="Middle Name"
              {...form.getInputProps('middleName')}
            />

            <TextInput
              label="Last Name"
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
              required
            />

            <TextInput
              mt="sm"
              label="Email"
              placeholder="xyz@nseit.com"
              {...form.getInputProps('email')}
              required
            />

            <PasswordInput
              mt="sm"
              label="Password"
              placeholder="password"
              {...form.getInputProps('password')}
              required
            />

            <DatePicker
              mt="sm"
              label="Date of Joining"
              placeholder="Joining Date"
              // allowFreeInput
              inputFormat="DD MMMM, YYYY"
              labelFormat="DD MMMM,YYYY"
              defaultValue={new Date()}
              icon={<IconCalendar size={16} />}
              {...form.getInputProps('dateOfJoining')}
              required
            />

            <Select
              mt="sm"
              label="Office Location"
              placeholder="Location"
              data={[
                { value: 'Mumbai', label: 'Mumbai' },
                { value: 'Chennai', label: 'Chennai' },
                { value: 'Bangalore', label: 'Bangalore' },
                { value: 'Pune', label: 'Pune' },
              ]}
              {...form.getInputProps('officeLocation')}
              required
            />

            <NumberInput
              mt="sm"
              label="Probation Period"
              placeholder="Number of months"
              min={0}
              {...form.getInputProps('probationPeriod')}
              required
            />

            <Select
              mt="sm"
              label="Designation"
              placeholder="Designation"
              data={[
                { value: 'Head HR', label: 'Head HR' },
                { value: 'Principal Consultant', label: 'Principal Consultant' },
                { value: 'Module Lead', label: 'Module Lead' },
              ]}
              {...form.getInputProps('designation')}
              required
            />
          </SimpleGrid>

          <Center mt={50}>
            <Group position="center" mt="xl">
              <Button size="md" type="submit">Create Admin</Button>
              <Button variant="outline" size="md" type='reset'>Reset</Button>
            </Group>
          </Center>
        </form>
      </Box>
    </Container>
  )
}

export default SignupPage