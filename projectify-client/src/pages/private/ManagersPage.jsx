import { useEffect } from "react"
import { errorNotification, loadingNotification, ManagerCard, successNotification } from "../../components";
import { ActionIcon, TextInput, useMantineTheme, Container, Grid, SimpleGrid, Text, Flex, Center } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { axiosPrivate, GET_ALL_MANAGER_URL } from '../../api/api';
import useStore from '../../hooks/useStore';
import { useForm } from '@mantine/form';

const ManagersPage = () => {
  const theme = useMantineTheme();
  const { allManagers, setAllManagers } = useStore();

  const form = useForm({
    initialValues: {
      query: '',
    },
  });

  const formSearchSubmit = managers => {
    if(form.values.query === '') {
      return managers;
    }
    else if (managers.firstName?.toLowerCase().includes(form.values.query?.toLowerCase())
            || managers.lastName?.toLowerCase().includes(form.values.query?.toLowerCase())
            || managers?.manager?.managerCode?.toLowerCase().includes(form.values.query?.toLowerCase())
            || managers.email?.toLowerCase().includes(form.values.query?.toLowerCase())) {
      return managers;
    }
    return null;
  }

  useEffect(() => {
    async function fetch() {
      loadingNotification();
      await axiosPrivate.get(GET_ALL_MANAGER_URL)
        .then(res => {
          console.log(res?.data)
          setAllManagers(res?.data?.allUserRelatedManagers)
          successNotification(res?.data?.message)
        })
        .catch(err => {
          console.log(err?.response);
          errorNotification(err?.response?.data?.message);
        })
    }
    fetch();
  }, [allManagers?.length, setAllManagers])

  const filteredManagers = allManagers.filter((managers) => formSearchSubmit(managers));
  return (
    <Center>
      <Container size="lg" my="lg" mx='lg' py='lg' px='lg'>
        <Grid gutter="md" grow>
          <Grid.Col>
            <Flex justify='space-between'>
              <Text fz={20} fw={700} color="dimmed">Total Manager {filteredManagers?.length || 0}</Text>
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
                placeholder="Search managers"
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
                filteredManagers?.length > 0
                ? filteredManagers?.map(manager => {
                    return <ManagerCard key={manager?.id} userManager={manager} />
                  })
                : <Center className="w-full text-center text-lg">
                    <Text c="violet" className="p-2 text-lg font-semibold">No Manager Found</Text>
                  </Center>
              }
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  )
}

export default ManagersPage