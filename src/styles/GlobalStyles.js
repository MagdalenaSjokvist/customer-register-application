import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 1.7rem;
  margin: 2vh 0 3vh 0;
}

h2 {
  font-size: 1.5rem;
  margin: 2vh 0 3vh 0;
}

h3 {
  font-size: 0.9rem;
  margin: 2vh 0;
}

button {
  padding: 0.5rem;
  max-width: 150px;
  margin-top: 0.5rem; 
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  color: white;
  background: #3B628C;
}

label{
  font-size: 0.8rem;
}

input {
  height: 32px;
  width: 45vw;
  min-width: 200px;
  margin: 0.2rem 0 0.5rem 0 ;
  border: none;
  border-radius: 3px;
  background: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}

th {
  font-size: 0.6rem;
  padding-right: 2rem;
}

`
