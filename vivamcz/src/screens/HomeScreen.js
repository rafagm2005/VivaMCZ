import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, categorias } from '../theme';
import { eventos } from '../data/eventos';
import EventCard from '../components/EventCard';

export default function HomeScreen({ onAbrirEvento, onEntrar }) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const filtrados = eventos.filter(
    (e) =>
      (categoria === 'Todos' || e.categoria === categoria) &&
      e.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={s.tela} stickyHeaderIndices={[0]}>
      {/* Cabeçalho: logo, botão Entrar e busca */}
      <View style={s.header}>
        <View style={s.linhaTopo}>
          <Text style={s.logo}>Viva<Text style={{ color: cores.amarelo }}>MCZ</Text></Text>
          <TouchableOpacity style={s.btnEntrar} onPress={onEntrar}>
            <Text style={s.btnEntrarTxt}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={s.busca} placeholder="Buscar eventos em Maceió..." placeholderTextColor={cores.cinza} value={busca} onChangeText={setBusca} />
      </View>

      {/* Hero */}
      <View style={s.hero}>
        <Text style={s.heroTag}>Maceió, Alagoas · {eventos.length} eventos este mês</Text>
        <Text style={s.heroTitulo}>Descubra o{'\n'}Melhor de{'\n'}<Text style={{ color: cores.amarelo }}>Maceió</Text></Text>
        <Text style={s.heroTexto}>Shows, festivais, gastronomia, esportes e muito mais. Tudo que acontece na Cidade das Lagoas, num só lugar.</Text>
        <View style={s.stats}>
          {[['12', 'Eventos'], ['8', 'Gratuitos'], ['8', 'Bairros'], ['9', 'Categorias']].map(([n, l]) => (
            <View key={l}><Text style={s.statNum}>{n}</Text><Text style={s.statLabel}>{l}</Text></View>
          ))}
        </View>
      </View>

      {/* Filtro por categoria */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chips} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {categorias.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCategoria(c)} style={[s.chip, categoria === c && s.chipAtivo]}>
            <Text style={[s.chipTxt, categoria === c && { color: cores.branco }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Em destaque */}
      <Text style={s.secao}>Em Destaque</Text>
      <Text style={s.secaoSub}>Os eventos mais aguardados de Maceió</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {eventos.filter((e) => e.destaque).map((e) => (
          <EventCard key={e.id} evento={e} grande onPress={() => onAbrirEvento(e)} />
        ))}
      </ScrollView>

      {/* Todos os eventos */}
      <Text style={s.secao}>Todos os Eventos</Text>
      <Text style={s.secaoSub}>{filtrados.length} eventos encontrados</Text>
      <View style={{ paddingHorizontal: 20 }}>
        {filtrados.length === 0 && <Text style={s.vazio}>Nenhum evento encontrado. Tente outra busca ou categoria.</Text>}
        {filtrados.map((e) => <EventCard key={e.id} evento={e} onPress={() => onAbrirEvento(e)} />)}
      </View>

      {/* Chamada para organizadores */}
      <View style={s.organizador}>
        <Text style={s.orgTitulo}>Publique seu evento e <Text style={{ color: cores.amarelo }}>alcance toda Maceió</Text></Text>
        <Text style={s.orgTexto}>Cadastre seu evento com fotos, data e localização. Rápido, simples e gratuito.</Text>
        <TouchableOpacity style={s.orgBtn} onPress={onEntrar}>
          <Text style={s.orgBtnTxt}>+ Criar conta de Organizador</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.rodape}>© 2026 VivaMCZ — Feito com amor em Maceió</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  header: { backgroundColor: cores.branco, padding: 16, paddingTop: 40 },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logo: { fontSize: 24, fontWeight: '900', color: cores.azul },
  btnEntrar: { backgroundColor: cores.azul, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  btnEntrarTxt: { color: cores.branco, fontWeight: '700' },
  busca: { backgroundColor: cores.chip, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, color: cores.texto },
  hero: { backgroundColor: cores.azul, padding: 24, paddingTop: 32 },
  heroTag: { color: cores.chip, fontSize: 12, marginBottom: 14 },
  heroTitulo: { color: cores.branco, fontSize: 42, fontWeight: '900', lineHeight: 46 },
  heroTexto: { color: '#C9D6F5', fontSize: 15, lineHeight: 22, marginVertical: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  statNum: { color: cores.amarelo, fontSize: 24, fontWeight: '900' },
  statLabel: { color: '#C9D6F5', fontSize: 12 },
  chips: { backgroundColor: cores.branco, paddingVertical: 12 },
  chip: { backgroundColor: cores.chip, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  chipAtivo: { backgroundColor: cores.azul },
  chipTxt: { color: cores.azul, fontWeight: '600' },
  secao: { fontSize: 24, fontWeight: '900', color: cores.texto, paddingHorizontal: 20, marginTop: 24 },
  secaoSub: { color: cores.cinza, paddingHorizontal: 20, marginBottom: 14 },
  vazio: { color: cores.cinza, textAlign: 'center', padding: 24 },
  organizador: { backgroundColor: cores.azul, padding: 28, alignItems: 'center', marginTop: 16 },
  orgTitulo: { color: cores.branco, fontSize: 26, fontWeight: '900', textAlign: 'center' },
  orgTexto: { color: '#C9D6F5', textAlign: 'center', marginVertical: 14 },
  orgBtn: { backgroundColor: cores.amarelo, paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14 },
  orgBtnTxt: { color: cores.texto, fontWeight: '800' },
  rodape: { backgroundColor: cores.azulEscuro, color: '#8FA3D1', textAlign: 'center', padding: 20, fontSize: 12 },
});
