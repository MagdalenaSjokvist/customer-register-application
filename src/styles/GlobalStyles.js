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
  
}

button {
  padding: 0.5rem;
  margin-top: 1rem; 
}

label{
  font-size: 0.9rem;
}

input {
  height: 30px;
  width: 45vw;
  min-width: 200px;
  margin: 0.2rem 0;
}
`
