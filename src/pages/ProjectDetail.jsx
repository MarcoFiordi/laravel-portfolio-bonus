import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                setProject(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <p>Impossibile caricare il progetto: {error} </p>
    }

    return (
        <div className="container py-5">
            {project ? (
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h1 className="card-title mb-3">
                                    {project.title}
                                </h1>

                                <p className="card-text mb-4">
                                    {project.description}
                                </p>

                                <Link to="/" className="btn btn-primary">
                                    ← Torna alla Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Caricamento progetto...</p>
            )}
        </div>
    );
}

export default ProjectDetail;