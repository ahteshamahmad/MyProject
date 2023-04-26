import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

const Notification = () => {
    console.log('show ')
    return showNotification({
            loading: true,
            title: 'Loading your data',
            message: 'Data will be loaded in 3 seconds, you cannot close this yet',
            autoClose: false,
            disallowClose: true,
            // icon: <IconX />,
        });
}

export default Notification