import { HeroSection, GroupStats } from "../../components";
import { useEffect } from "react";
import axios, { HOME_URL } from '../../api/api';
import useStore from "../../hooks/useStore";

const HomePage = () => {
    const { home, setHome } = useStore();
    
    useEffect(() => {
        async function fetch() {
            await axios.get(HOME_URL)
            .then(res => {
                console.log(res?.data);
                setHome(res?.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
        if(!home) {
            fetch();
        }
    }, [home, setHome])
    
    return (
        <section>
            <HeroSection/>
            <GroupStats/>
        </section>
    )
}

export default HomePage