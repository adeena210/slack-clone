import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

html {
    box-sizing: border-box;
    font-size: 62.5%;

    @media only screen and (max-width: 1200px){
        font-size: 58%;
    }
    @media only screen and (min-width: 1980px){
        font-size: 70%;
    }
}

body{
    
    font-family: 'pixel';
    font-size: 2rem;
    font-weight: 500;
    background: #141301;
    color: #EF846C;

}






`;

export default GlobalStyle;



export const Container = styled.div`
margin: 0 auto;
padding: 0 50px;
max-width: 1300px;
width: 100%;

@media (max-width:400px){
    padding: 0 10px;
}
@media (max-width:991px) {
    padding: 0 30px;
}

@media (min-width: 1500px) {
    max-width: 1500px;
}

@media (min-width: 1800px) {
    max-width: 1800px;
    padding: 0 30px;
}
`;

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
   
   
    
    ${'' /* position: absolute;
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

export const Home = styled.div`
    text-align: center;
    height:600px;
    margin-top:16%;
    h1{
        text-align: center;
        color: #EF866C;
        font-size: 10rem;
    }

    button{
        margin-bottom: 20px;
    }



`;