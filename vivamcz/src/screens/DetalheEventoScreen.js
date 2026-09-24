import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Share, StyleSheet } from 'react-native';
import { cores, icones } from '../theme';

export default function DetalheEventoScreen({ evento, onVoltar }) {
  const [favorito, setFavorito] = useState(false);
  const gratis = evento.preco === 'Gratuito';

  return (
    <View style={s.tela}>
      <ScrollView>
        <View style={s.imagem}>
          <Text style={{ fontSize: 64 }}>{icones[evento.categoria]}</Text>
          <TouchableOpacity style={s.voltar} onPress={onVoltar}><Text style={s.voltarTxt}>✕</Text></TouchableOpacity>
          {evento.destaque && <Text style={s.selo}>Em Destaque</Text>}
        </View>

        <View style={s.corpo}>
          <Text style={s.categoria}>{evento.categoria}</Text>
          <Text style={s.titulo}>{evento.titulo}</Text>

          <View style={s.caixas}>
            <View style={s.caixa}><Text style={s.caixaLabel}>📅 Data & Hora</Text><Text style={s.caixaTxt}>{evento.data}{'\n'}{evento.hora}</Text></View>
            <View style={s.caixa}><Text style={s.caixaLabel}>📍 Local</Text><Text style={s.caixaTxt}>{evento.local}{'\n'}{evento.bairro}, Maceió</Text></View>
          </View>

          <Text style={s.descricao}>{evento.descricao || 'Mais detalhes sobre este evento serão divulgados em breve.'}</Text>

          {evento.tags && (
            <View style={s.tags}>{evento.tags.map((t) => <Text key={t} style={s.tag}>{t}</Text>)}</View>
          )}
          {evento.organizador && <Text style={s.org}>Organizado por <Text style={{ fontWeight: '800', color: cores.texto }}>{evento.organizador}</Text></Text>}
        </View>
      </ScrollView>

      {/* Ações fixas no rodapé */}
      <View style={s.acoes}>
        <TouchableOpacity style={s.comprar} onPress={() => Alert.alert('Em breve', 'A compra de ingressos virá nas próximas etapas.')}>
          <Text style={s.comprarTxt}>{gratis ? 'Confirmar presença' : `Comprar — ${evento.preco}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.icone} onPress={() => setFavorito(!favorito)}><Text style={{ fontSize: 20 }}>{favorito ? '❤️' : '🤍'}</Text></TouchableOpacity>
        <TouchableOpacity style={s.icone} onPress={() => Share.share({ message: `${evento.titulo} — ${evento.data}, ${evento.local}` })}><Text style={{ fontSize: 20 }}>↗️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.branco },
  imagem: { height: 220, backgroundColor: cores.azul, alignItems: 'center', justifyContent: 'center' },
  voltar: { position: 'absolute', top: 40, right: 16, backgroundColor: 'rgba(0,0,0,0.4)', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  voltarTxt: { color: cores.branco, fontSize: 16 },
  selo: { position: 'absolute', top: 46, left: 16, backgroundColor: cores.amarelo, color: cores.texto, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  corpo: { padding: 20 },
  categoria: { alignSelf: 'flex-start', backgroundColor: cores.chip, color: cores.azul, fontWeight: '600', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  titulo: { fontSize: 28, fontWeight: '900', color: cores.texto, marginVertical: 12 },
  caixas: { flexDirection: 'row', gap: 12 },
  caixa: { flex: 1, backgroundColor: cores.chip, borderRadius: 14, padding: 14 },
  caixaLabel: { fontSize: 12, color: cores.cinza, marginBottom: 6 },
  caixaTxt: { fontWeight: '600', color: cores.texto, lineHeight: 20 },
  descricao: { color: cores.cinza, lineHeight: 22, marginVertical: 16 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: cores.chip, color: cores.azul, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  org: { color: cores.cinza, marginTop: 16 },
  acoes: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 1, borderColor: cores.chip },
  comprar: { flex: 1, backgroundColor: cores.azul, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  comprarTxt: { color: cores.branco, fontWeight: '800', fontSize: 16 },
  icone: { width: 50, borderRadius: 14, borderWidth: 1, borderColor: cores.chip, alignItems: 'center', justifyContent: 'center' },
});
