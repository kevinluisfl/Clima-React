import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

       //state del formulario
       const [busqueda, guardarBusqueda] = useState({
        ciudad:'',
        pais:''
});

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
      //console.log(ciudad, pais);
      const consultarAPI = async () => {

        if (consultar) {
          const appId = '0ce638c0e72ac525efd05d84d4471376';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

          const respuesta = await fetch(url); //fetch no se a que se referie con su uso para que no instale nada
          const resultado = await respuesta.json();

          guardarResultado(resultado);
          guardarConsultar(false); //para que se pueda seguir consultando sin recargar

          //detecta resultado correcto
          if(resultado.cod === "404"){
            guardarError(true);
          } else{
            guardarError(false);
          }

        }

      }
      consultarAPI();
      //eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
      componente = <Error mensaje="No hay resultados"/>
  } else{
    componente = <Clima
                  resultado={resultado}
                 />
  }

  return (
    <Fragment>
        <Header
          titulo="Clima React App"
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                  <Formulario
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                  />
              </div>
              <div className="col m6 s12">
                 {componente}
              </div>
            </div>
          </div>
        </div>

    </Fragment>
  );
}

export default App;
