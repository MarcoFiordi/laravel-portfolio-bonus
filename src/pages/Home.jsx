import { useEffect, useState } from 'react';


function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/projects`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.error('Errore API:', error);
            });
    }, []);

    return (
        <div>
            <h1>Benvenuto nel mio Portfolio</h1>

            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;