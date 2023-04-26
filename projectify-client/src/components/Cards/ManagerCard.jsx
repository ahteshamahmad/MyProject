import { Stack, Flex, Avatar, Text, Button, Paper } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MANAGER_DETAILS_MID_LINK } from '../../routes/route';

const ManagerCard = ({ userManager }) => {
    const { image, firstName, middleName, lastName, designation, email, manager } = userManager
    return (
        <Paper
            withBorder
            radius="md"
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.indigo[0],
            })}
        >
            <Stack justify="space-between" className='h-full'>
                <div>
                    <Avatar src={image} size={100} radius={100} mx="auto" variant="outline" color="violet">
                        { firstName?.charAt(0)?.toUpperCase() }{ lastName?.charAt(0)?.toUpperCase() }
                    </Avatar>
                    <Flex justify="center" align="center" direction="column" wrap="wrap" mx={20}>
                        <Text align="center" size="lg" weight={600} mt="md">
                            {firstName}  {middleName} {lastName}
                        </Text>
                        <Text align="center" color="dimmed" size="sm">
                            {designation || 'NA'}
                        </Text>
                        <Text align="center" color="dimmed" size="sm">
                            {email}
                        </Text>
                    </Flex>
                </div>

                <Button component={Link} to={MANAGER_DETAILS_MID_LINK + manager?.managerCode} fullWidth mt="md" radius="xl">
                    View Manager
                </Button>
            </Stack>
        </Paper>
    )
}

export default ManagerCard