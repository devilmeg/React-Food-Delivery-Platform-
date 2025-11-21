import {sum} from '../Sum';

test("Sum calculates the sum of two numbers",()=>{

    const res=sum(3,2);
    expect(res).toBe(5);//Assertion
});