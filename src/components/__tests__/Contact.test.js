import {render,screen} from '@testing-library/react';
import Contact from '../Contact';
import '@testing-library/jest-dom';

describe("Contact Componenet",()=>{

    test("Contact component renders contact information",()=>{
    
    
        render(<Contact/>);
        const heading=screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        
    });
    test("In Contact component Button  renders  information",()=>{
    
    
        render(<Contact/>);
        const button=screen.getByText("Send Message");
        expect(button).toBeInTheDocument();
        
    });
});