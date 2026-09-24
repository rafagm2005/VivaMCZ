import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { cores } from '../theme';

// Uma tela só para Entrar e Criar Conta, como no protótipo do Figma.
export default function AuthScreen({ onVoltar }) {
  const [modo, setModo] = useState('entrar');
  const entrar = modo === 'entrar';

  const enviar = () =>
    Alert.alert('Em breve', 'A autenticação será implementada nas próximas etapas.');

  return (
    <View style={s.tela}>
      <View style={s.card}>
        <View style={s.topo}>
          <TouchableOpacity onPress={onVoltar} style={s.fechar}><Text style={s.fecharTxt}>✕</Text></TouchableOpacity>
          <Text style={s.titulo}>{entrar ? 'Bem-vindo de volta!' : 'Crie sua conta'}</Text>
          <Text style={s.sub}>{entrar ? 'Entre para descobrir o melhor de Maceió' : 'Personalize sua experiência na cidade'}</Text>
        </View>
        <View style={s.corpo}>
          <View style={s.abas}>
            {['entrar', 'criar'].map((m) => (
              <TouchableOpacity key={m} style={[s.aba, modo === m && s.abaAtiva]} onPress={() => setModo(m)}>
                <Text style={[s.abaTxt, modo === m && { color: cores.azul }]}>{m === 'entrar' ? 'Entrar' : 'Criar Conta'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {!entrar && (<><Text style={s.label}>Nome completo</Text><TextInput style={s.input} placeholder="Seu nome" placeholderTextColor={cores.cinza} /></>)}
          <Text style={s.label}>E-mail</Text>
          <TextInput style={s.input} placeholder="seu@email.com" placeholderTextColor={cores.cinza} keyboardType="email-address" autoCapitalize="none" />
          <Text style={s.label}>Senha</Text>
          <TextInput style={s.input} placeholder="••••••••" placeholderTextColor={cores.cinza} secureTextEntry />
          <TouchableOpacity style={s.botao} onPress={enviar}>
            <Text style={s.botaoTxt}>{entrar ? 'Entrar' : 'Criar Conta'}</Text>
          </TouchableOpacity>
          <Text style={s.troca}>
            {entrar ? 'Não tem conta? ' : 'Já tem conta? '}
            <Text style={{ color: cores.azul, fontWeight: '700' }} onPress={() => setModo(entrar ? 'criar' : 'entrar')}>
              {entrar ? 'Criar agora' : 'Entrar'}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.azulEscuro, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: cores.branco, borderRadius: 20, overflow: 'hidden' },
  topo: { backgroundColor: cores.azul, padding: 24 },
  fechar: { position: 'absolute', top: 14, right: 16, zIndex: 1 },
  fecharTxt: { color: cores.branco, fontSize: 18 },
  titulo: { color: cores.branco, fontSize: 24, fontWeight: '900' },
  sub: { color: cores.chip, marginTop: 4 },
  corpo: { padding: 24 },
  abas: { flexDirection: 'row', backgroundColor: cores.chip, borderRadius: 12, padding: 4, marginBottom: 12 },
  aba: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 10 },
  abaAtiva: { backgroundColor: cores.branco },
  abaTxt: { color: cores.cinza, fontWeight: '600' },
  label: { fontWeight: '600', color: cores.texto, marginTop: 10, marginBottom: 6 },
  input: { backgroundColor: cores.fundo, borderRadius: 14, padding: 14, color: cores.texto },
  botao: { backgroundColor: cores.azul, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20 },
  botaoTxt: { color: cores.branco, fontWeight: '800', fontSize: 16 },
  troca: { textAlign: 'center', marginTop: 16, color: cores.cinza },
});
