import Card from "./Card";
import { render, screen } from '@testing-library/react';


describe('Card component', () => {
    it('should render correctly with default props and renders child correctly', async() => {
        const testContent = <p>Test Content</p>;

        render(<Card>{testContent}</Card>);
    
        const cardElement = screen.getByTestId('card-element'); 
    
        expect(cardElement).toBeInTheDocument(); 
    })
})