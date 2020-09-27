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

thead{
  /* display: flex; */
  /* flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  background-color: #3B628C;
  color: white;
  height: 40px;
  width: 55vw;
  min-width: 400px;
  border-radius: 4px;
  font-size: small;
  padding: 1rem;
  border: none;
}

tr {
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
  height: 30px;
  width: 55vw;
  min-width: 400px;
  padding: 2rem 0rem 2rem 1rem;
  font-size: small;
}


td {
  font-size: smaller;
}
`
