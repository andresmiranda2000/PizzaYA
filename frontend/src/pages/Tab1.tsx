import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useEffect, useState } from 'react';

interface Plato {
  id: number;
  nombre: string;
  categoria: string;
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {menu.map((plato) => (
            <IonItem key={plato.id}>
              <IonLabel>
                <h2>{plato.nombre}</h2>
                <p>{plato.categoria}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
