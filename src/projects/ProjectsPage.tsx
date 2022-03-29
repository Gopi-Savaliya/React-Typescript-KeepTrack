import { useEffect } from 'react';
import { ProjectList } from './ProjectList'
import { Project } from './Project';
import { projectAPI } from './projectAPI';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { loadProjects } from './state/projectActions';

export const ProjectsPage = () => {
    const projects = useSelector(
        (appState: AppState) => appState.projectState.projects
    );
    const loading = useSelector(
        (appState: AppState) => appState.projectState.loading
    );
    const error = useSelector(
        (appState: AppState) => appState.projectState.error
    );
    const currentPage = useSelector(
        (appState: AppState) => appState.projectState.page
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProjects(1));
    }, [dispatch]);

    const handleMoreClick = () => {
        dispatch(loadProjects(currentPage + 1));
    };

    return (
        <>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <ProjectList projects={projects} />
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </>
    )
}
