import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { GENERATE_TOKEN_URL } from '../../api/api';
import { setToken } from '../../utils/localstorageItem';
import jwtDecode from 'jwt-decode';
import useStore from '../../hooks/useStore';
import { errorNotification, loadingNotification, successNotification } from '../../components';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Container, Group, Button } from '@mantine/core';
import { ADMIN_DASHBOARD_LINK, FORGOT_PASSWORD_LINK, MANAGER_DASHBOARD_LINK, PROJECTS_LINK } from '../../routes/route';

export default function LoginPage() {
    const { auth, setAuth, setCurrentUser } = useStore();
    const navigate = useNavigate();
    // const location = useLocation();
    // const comeFrom = location.state?.form?.pathname || '/';

    function toUpperLower(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const formSubmit = async (values) => {
        const credentials = {
            username: values.email,
            password: values.password
        }
        loadingNotification();
        await axios.post(GENERATE_TOKEN_URL, credentials)
            .then(res => {
                console.log(res?.data);
                const isLoggedIn = setToken(res?.data?.token);
                const roles = jwtDecode(res.data.token).roles;
                const email = jwtDecode(res.data.token).sub;
                setAuth({ email, roles, isLoggedIn });
                setCurrentUser(res?.data?.user);
                successNotification(`${toUpperLower(roles[0].authority)} Logged in Successfully`);
            })
            .catch(err => {
                console.log(err)
                errorNotification(err?.response?.data?.message || 'Oops... Something went wrong')
            })
    }

    useEffect(() => {
        const goToPage = auth?.roles?.[0]?.authority
        if (goToPage === 'ADMIN') {
            navigate(ADMIN_DASHBOARD_LINK, { replace: true })
        } else if (goToPage === 'MANAGER') {
            navigate(MANAGER_DASHBOARD_LINK, { replace: true })
        } if (goToPage === 'EMPLOYEE') {
            navigate(PROJECTS_LINK, { replace: true })
        } 
        // else {
        //     navigate(comeFrom, { replace: true })
        // }
    }, [auth, navigate])

    return (
        <Container size={420} my={50}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Welcome back!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" className='text-left'>
                <form onSubmit={form.onSubmit(values => formSubmit(values))}>
                    <TextInput label="Email" placeholder="Your Email" {...form.getInputProps('email')} required />
                    <PasswordInput label="Password" placeholder="Your Password" {...form.getInputProps('password')} required mt="md" />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" sx={{ lineHeight: 2 }} />
                        <Anchor component={Link} to={FORGOT_PASSWORD_LINK} size="sm">Forgot password?</Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt='xl' className='mt-10'>Sign in</Button>
                </form>
            </Paper>
        </Container>
    )
}