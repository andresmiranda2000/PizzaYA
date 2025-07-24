import {
  IonPage,
  IonContent,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './Tab1.css';

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

  useEffect(() => {
    fetch('http://localhost:4000/api/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <IonPage>
      <IonContent className="menu-content">
        {menu.map((plato) => (
          <div key={plato.id} className="menu-item">
            <img src={plato.imagen} alt={plato.nombre} className="menu-imagen" />
            <div className="menu-detalle">
              <h2>{plato.nombre}</h2>
              <p>{plato.descripcion}</p>
              <p className="precio">${plato.precio.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
