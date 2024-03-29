import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 3px;
    background: #2D5676;
    color: #94C5CC;
    padding: 18px 30px;
    font-size: 18px;
    font-family: 'pixel';

    &:disabled {
        background: #666666;
        cursor: not-allowed;
        opacity: 0.6;
        transform: 0;
        &:hover{
        background: #666666;
        } 
    }

    &:hover{
        background: #94C5CC;
        transform: translateY(-.5rem) scale(1.02);
        color: #2D5676;

    }

    &:active{
        transform: translateY(.8rem);
    }

    @media only screen and (max-width:1000px) {
    /* width: 100%; */
        padding: 10px 20px;
}
    @media only screen and (max-width:375px) {
        padding: 10px 20px;
        font-size: 18px;

`;

export const Input = styled.input`
    color: #141301;
    border: 2px solid;
    border-radius: 3px;
    font-size: 15px;
    font-weight:400;
    font-family:'pixel';
    padding: 5px;
    
`;

export const Form = styled.form`
    background: #f8f8f8;
    box-sizing: border-box;
    padding: 40px;
    max-width: 600px;
    max-height: 600px;
    text-align: center;
   
   
${'' /*     
    position: absolute;
    top: 18%;
    left: 20%;
    right: 20%; */}


    
    
    h1{
        color: #141301;
        text-align: center;
        margin-bottom: 50px;
        text-decoration: underline;
    }

    div{
        text-align: right;
        margin-right: 100px;
        margin-top: 80px;
    }

    input{
        display-block: inline-block;
        margin-bottom: 30px;
        margin-left: 30px;
        width: 150px;
        height: 20px;
        

        
       
       
        
    }

    label {
        display-block: block;
        margin-bottom: 100px;
        margin-left: 30px;
        text-decoration: underline;
       
        
       
        
        
    }

    button{
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        
    }
`;

