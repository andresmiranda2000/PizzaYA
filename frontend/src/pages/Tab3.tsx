// src/pages/Tab3.tsx
import {
  IonPage,
  IonContent
} from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Tab3.css';

const Tab3: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/menu'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="inicio">
        <img src="/assets/pizza-logo.png" alt="Logo Pizza" className="logo" />
        <h1>¡Bienvenido a PizzaApp!</h1>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
