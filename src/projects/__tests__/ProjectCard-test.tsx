import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Project } from '../Project';
import { ProjectCard } from '../ProjectCard';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('<ProjectCard />', () => {
    let project: Project;
    let handleEdit: jest.Mock;
    beforeEach(() => {
        project = new Project({
            id: 1,
            name: 'Mission Impossible',
            description: 'This is really difficult',
            budget: 100,
        });
        handleEdit = jest.fn();
        render(
            <MemoryRouter>
                <ProjectCard project={project} onEdit={handleEdit} />
            </MemoryRouter>
        );
    });

    test('renders project properly', () => { //it
        expect(screen.getByRole('heading')).toHaveTextContent(project.name);
        screen.queryByText(/this is really difficult\.\.\./i); //get
        screen.queryByText(/budget : 100/i); //get
    });

    test('handler called when edit clicked', () => { //it
        userEvent.click(
            screen.getByRole('button')
        );
        expect(handleEdit).toBeCalledTimes(1);
        expect(handleEdit).toBeCalledWith(project);
    });

    test('snapshot', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ProjectCard project={project} onEdit={handleEdit} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});