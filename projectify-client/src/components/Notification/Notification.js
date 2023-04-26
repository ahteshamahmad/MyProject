import { IconX, IconCheck } from '@tabler/icons';
import { hideNotification, showNotification, updateNotification } from '@mantine/notifications';

// Most used notification props
export function loadingNotification() {
    return showNotification({
            id: 'load-data',
            loading: true,
            title: 'Loading your data',
            message: 'Data will be loaded in 3 seconds, you cannot close this yet',
            autoClose: false,
            disallowClose: true,
        });
}

export function clearNotification() {
    hideNotification('load-data');
}

export function successNotification(title, message) {
    return updateNotification({
            id: 'load-data',
            color: 'green',
            title: title || 'Data loaded Successfully',
            message: message || '',
            icon: <IconCheck size={16} />,
            autoClose: 2000,
        });
}

export function errorNotification(title, message) {
    return updateNotification({
        id: 'load-data',
        color: 'red',
        title: title || 'Something went wrong',
        message: message || 'Please try again',
        icon: <IconX size={16} />,
        autoClose: 2000,
    });
}