import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, icones } from '../theme';

// Card de evento. Com `grande`, vira o card escuro dos destaques.
export default function EventCard({ evento, onPress, grande }) {
  const gratis = evento.preco === 'Gratuito';
  const claro = grande ? { color: '#C9D6F5' } : null;
  return (
    <TouchableOpacity style={[s.card, grande && s.grande]} onPress={onPress} activeOpacity={0.85}>
      {/* Espaço da imagem: troque por <Image source={{ uri: ... }} /> quando tiver as fotos */}
      <View style={[s.imagem, grande && s.imagemGrande]}>
        <Text style={s.emoji}>{icones[evento.categoria]}</Text>
        {evento.destaque && !grande && <Text style={s.selo}>Destaque</Text>}
      </View>
      <View style={s.corpo}>
        <Text style={[s.categoria, grande && { color: cores.amarelo }]}>{evento.categoria}</Text>
        <Text style={[s.titulo, grande && { color: cores.branco }]} numberOfLines={2}>{evento.titulo}</Text>
        <Text style={[s.info, claro]}>📅 {evento.data} · {evento.hora}</Text>
        <Text style={[s.info, claro]}>📍 {evento.local}</Text>
        <View style={s.rodape}>
          <Text style={[s.preco, { color: gratis ? cores.verde : cores.azul }, grande && { color: gratis ? '#4ADE80' : cores.amarelo }]}>
            {evento.preco}
          </Text>
          <Text style={[s.info, claro]}>{evento.interessados} interessados</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: cores.branco, borderRadius: 16, overflow: 'hidden', marginBottom: 16, elevation: 2 },
  grande: { width: 280, marginRight: 14, backgroundColor: cores.azulEscuro },
  imagem: { height: 120, backgroundColor: cores.chip, alignItems: 'center', justifyContent: 'center' },
  imagemGrande: { backgroundColor: cores.azul },
  emoji: { fontSize: 40 },
  selo: { position: 'absolute', top: 10, left: 10, backgroundColor: cores.amarelo, color: cores.texto, fontWeight: '700', fontSize: 11, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  corpo: { padding: 14 },
  categoria: { fontSize: 12, fontWeight: '600', color: cores.azul, marginBottom: 4 },
  titulo: { fontSize: 16, fontWeight: '800', color: cores.texto, marginBottom: 8 },
  info: { fontSize: 12, color: cores.cinza, marginBottom: 2 },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  preco: { fontSize: 15, fontWeight: '800' },
});
