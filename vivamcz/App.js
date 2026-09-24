import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import DetalheEventoScreen from './src/screens/DetalheEventoScreen';

// Navegação simplificada por estado (sem biblioteca) para esta etapa.
// Na próxima aula, dá para trocar por React Navigation.
export default function App() {
  const [tela, setTela] = useState('home');
  const [evento, setEvento] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {tela === 'home' && (
        <HomeScreen
          onAbrirEvento={(e) => { setEvento(e); setTela('detalhe'); }}
          onEntrar={() => setTela('auth')}
        />
      )}
      {tela === 'auth' && <AuthScreen onVoltar={() => setTela('home')} />}
      {tela === 'detalhe' && <DetalheEventoScreen evento={evento} onVoltar={() => setTela('home')} />}
    </SafeAreaView>
  );
}
