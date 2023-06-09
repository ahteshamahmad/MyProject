import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export default function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Group position="center">
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.violet[5],
                })}
            >
                {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </Group>
    );
}