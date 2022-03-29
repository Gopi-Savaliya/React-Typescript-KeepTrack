import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import renderer from 'react-test-renderer';

describe('<HomePage />', () => {
    test("reders home heading", () => {
        render(<HomePage />);
    });
    test('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
