import { useEffect, useState } from 'react';
import { Link } from 'react-router';

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
        <div className="container py-5">
            <h1 className="mb-4">Il mio Portfolio</h1>

            <div className="row g-4">
                {projects.map((project) => (
                    <div className="col-12 col-md-6 col-lg-4" key={project.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    {project.title}
                                </h5>

                                <p className="card-text">
                                    {project.description}
                                </p>

                                <Link
                                    to={`/projects/${project.id}`}
                                    className="btn btn-primary mt-auto"
                                >
                                    Visualizza progetto
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;