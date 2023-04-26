import { useEffect } from "react"
import { errorNotification, loadingNotification, successNotification } from "../../components";
import { ActionIcon, TextInput, useMantineTheme, Container, Grid, SimpleGrid, Text, Flex, Center } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { EmployeeCard } from "../../components";
import { axiosPrivate, GET_ALL_EMPLOYEE_URL } from '../../api/api';
import useStore from '../../hooks/useStore'
import { useForm } from '@mantine/form';

const EmployeesPage = () => {
  const theme = useMantineTheme();
  const { allEmployees, setAllEmployees } = useStore();

  const form = useForm({
    initialValues: {
      query: '',
    },
  });

  const formSearchSubmit = employees => {
    if(form.values.query === '') {
      return employees;
    }
    else if (employees.firstName?.toLowerCase().includes(form.values.query?.toLowerCase())
            || employees.lastName?.toLowerCase().includes(form.values.query?.toLowerCase())
            || employees?.employee?.employeeCode?.toLowerCase().includes(form.values.query?.toLowerCase())
            || employees.email?.toLowerCase().includes(form.values.query?.toLowerCase())) {
      return employees;
    }
    return null;
  }
  
  useEffect(() => {
    async function fetch() {
      loadingNotification();
      axiosPrivate.get(GET_ALL_EMPLOYEE_URL)
        .then(res => {
          console.log(res?.data)
          setAllEmployees(res?.data?.allUserRelatedEmployees)
          successNotification(res?.data?.message)
        })
        .catch(err => {
          console.log(err?.response);
          errorNotification(err?.response?.data?.message);
        })
    }
    fetch();
  }, [allEmployees?.length, setAllEmployees])

  const filteredEmployees = allEmployees.filter((employees) => formSearchSubmit(employees));
  return (
    <Center>
      <Container size="lg" my="lg" mx='lg' py='lg' px='lg'>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Flex justify='space-between'>
              <Text fz={20} fw={700} color="dimmed">Total Employee {filteredEmployees?.length || 0}</Text>
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
                placeholder="Search employee"
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
                filteredEmployees?.length > 0
                ? filteredEmployees?.map(employee => {
                    return <EmployeeCard key={employee?.id} userEmployee={employee} />
                  })
                : <Center className="w-full text-center text-lg">
                    <Text c="violet" className="p-2 text-lg font-semibold">No Employee Found</Text>
                  </Center>
              }
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  )
}

export default EmployeesPage