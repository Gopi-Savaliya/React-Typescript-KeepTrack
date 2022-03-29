import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ProjectList } from '../ProjectList';
import { MOCK_PROJECTS } from '../MockProjects';
import { store } from '../../state';
import userEvent from '@testing-library/user-event';

describe('<ProjectList />', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProjectList projects={MOCK_PROJECTS} />
                </MemoryRouter>
            </Provider>
        );
    });

    test('should render without crashing', () => {
        expect(screen).toBeDefined();
    });

    test('should display list', () => {
        expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
    });

    test('should display form when edit clicked', () => {
        userEvent.click(screen.getByRole('button', { name: /edit Wisozk Group/i }));
        expect(
            screen.getByRole('form', {
                name: /edit a project/i,
            })
        ).toBeInTheDocument();
    });

    test('should display image and remove form when cancel clicked', () => {
        userEvent.click(screen.getByRole('button', { name: /edit Wisozk Group/i }));
        userEvent.click(screen.getByRole('button', { name: /cancel/i, }));
        expect(screen.getByRole('img', { name: /wisozk group/i, })).toBeInTheDocument();
        expect(screen.queryByRole('form', { name: /edit a project/i, })).not.toBeInTheDocument();
    })
});