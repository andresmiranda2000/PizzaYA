import {
  IonPage,
  IonContent,
  IonButton,
  IonToast
} from '@ionic/react';
import { useEffect, useState, useContext } from 'react';
import './Tab1.css';
import { PedidoContext } from '../PedidoContext';

interface Plato {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Tab1: React.FC = () => {
  const [menu, setMenu] = useState<Plato[]>([]);
  const { agregarPedido } = useContext(PedidoContext);
  const [mostrarToast, setMostrarToast] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const agregarDirecto = (plato: Plato) => {
    agregarPedido({
      id: Date.now(),
      plato: plato.nombre,
      precio: plato.precio,
      nombre: '',
      apellido: '',
      correo: '',
      direccion: '',
      imagen: plato.imagen
    });

    setMostrarToast(true); 
  };

  return (
    <IonPage>
      <IonContent className="menu-content">
        {menu.map((plato) => (
          <div key={plato.id} className="menu-item">
            <div className="menu-info">
              <div className="menu-texto">
                <h2>{plato.nombre}</h2>
                <p className="menu-precio">USD {plato.precio.toFixed(2)}</p>
                <p className="menu-desc">{plato.descripcion}</p>
              </div>
              <div className="menu-imagen-container">
                <img src={plato.imagen} alt={plato.nombre} className="menu-imagen" />
                <IonButton
                  className="menu-boton"
                  onClick={() => agregarDirecto(plato)}
                  shape="round"
                  fill="solid"
                  color="primary"
                  size="small"
                >
                  +
                </IonButton>
              </div>
            </div>
          </div>
        ))}

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Artículo agregado"
          duration={1500}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
