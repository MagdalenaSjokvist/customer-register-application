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
  text-align:center;
}

h2 {
  font-size: 1.5rem;
  margin: 2vh 0 3vh 0;
  text-align: center;

}

h3 {
  font-size: 0.9rem;
  margin: 2vh 0;

}

a {
  text-decoration: none;
  color: white;
}

button {
  padding: 0.5rem;
  max-width: 150px;
  margin-top: 0.8rem; 
  margin-bottom: 0.8rem;
  margin-right: 0.4rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  color: white;
  background: #3B628C;
}

label{
  font-size: 0.8rem;
  width: 100%;
}

input {
  height: 32px;
  width: 100%;
  min-width: 200px;
  margin: 0.2rem 0 0.5rem 0 ;
  border: none;
  border-radius: 3px;
  background: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}

th{
  /* padding-right: 3rem;
  text-align: left; */
}

table {
  border-collapse: collapse;
  text-align: left;
  width: 50vw;
  min-width: 350px;
}

thead{
  background-color: #3B628C;
  color: white;
  height: 60px;
}

tr {
  height: 20px;
  font-size: small;
  
}

th, td {
  width: 80px;
  padding: 0.3rem;
  font-size: smaller;
}
`
