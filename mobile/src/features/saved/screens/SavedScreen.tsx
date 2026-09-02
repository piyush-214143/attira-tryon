import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, spacing } from '../../../shared/theme';

const LOVED = [
  require('../../../assets/hero.jpg'),
  require('../../../assets/look-stark.jpg'),
  require('../../../assets/look-weekend.jpg'),
  require('../../../assets/item-blazer.jpg'),
];

const BOARDS = [
  { name: 'FAVOURITES', count: '12 looks', accent: palette.lime, image: require('../../../assets/hero.jpg') },
  { name: 'WORK LOOKS', count: '8 looks', accent: palette.accentBlue, image: require('../../../assets/look-weekend.jpg') },
  { name: 'WEEKEND', count: '15 looks', accent: palette.accentOrange, image: require('../../../assets/look-stark.jpg') },
  { name: 'SPECIAL', count: '4 looks', accent: palette.accentPurple, image: require('../../../assets/hero.jpg') },
];

const SavedScreen = () => (
  <SafeAreaView style={styles.safe} edges={['top']}>
    <View style={styles.header}>
      <Text style={styles.title}>SAVED</Text>
      <Pressable style={styles.boardBtn}>
        <Text style={styles.boardBtnLabel}>+ BOARD</Text>
      </Pressable>
    </View>

    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>LOVED LOOKS</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lovedRow}>
        {LOVED.map((img, i) => (
          <View key={i} style={styles.lovedCard}>
            <View style={styles.lovedAccent} />
            <Image source={img} style={styles.lovedImage} />
            <Text style={styles.heart}>♥</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.section}>MY BOARDS</Text>
      <View style={styles.grid}>
        {BOARDS.map(board => (
          <View key={board.name} style={styles.boardWrap}>
            <View style={styles.boardShadow} />
            <View style={styles.board}>
              <ImageBackground source={board.image} style={styles.boardImage}>
                <View style={[styles.boardAccent, { backgroundColor: board.accent }]} />
                <View style={[styles.countTag, { backgroundColor: board.accent }]}>
                  <Text style={styles.countText}>{board.count}</Text>
                </View>
              </ImageBackground>
              <Text style={styles.boardName}>{board.name}</Text>
            </View>
          </View>
        ))}
        <Pressable style={[styles.boardWrap, styles.newBoard]}>
          <Text style={styles.newPlus}>+</Text>
          <Text style={styles.newLabel}>NEW BOARD</Text>
        </Pressable>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  header: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, fontWeight: '900', letterSpacing: 1, color: palette.ink },
  boardBtn: { backgroundColor: palette.lime, paddingHorizontal: 16, paddingVertical: 10 },
  boardBtnLabel: { fontWeight: '800', letterSpacing: 1, color: palette.ink },
  scroll: { padding: spacing.screenX, paddingBottom: 32 },
  section: { color: palette.muted, letterSpacing: 2, fontSize: 10, fontWeight: '700', marginBottom: spacing.md, marginTop: spacing.md },
  lovedRow: { gap: 12, paddingBottom: 4 },
  lovedCard: { width: 120, height: 150 },
  lovedAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: palette.lime, zIndex: 1 },
  lovedImage: { width: '100%', height: '100%' },
  heart: { position: 'absolute', top: 8, right: 8, color: palette.lime, fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  boardWrap: { width: '46%', flexGrow: 1 },
  boardShadow: { position: 'absolute', left: 6, right: -6, top: 6, bottom: 6, backgroundColor: palette.ink },
  board: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.ink },
  boardImage: { height: 110, justifyContent: 'flex-start', alignItems: 'flex-end', padding: 8 },
  boardAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 },
  countTag: { paddingHorizontal: 8, paddingVertical: 3 },
  countText: { fontSize: 10, fontWeight: '800', color: palette.ink },
  boardName: { fontWeight: '900', letterSpacing: 0.5, color: palette.ink, padding: 10 },
  newBoard: {
    height: 150,
    borderWidth: 1,
    borderColor: palette.muted,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPlus: { fontSize: 24, color: palette.muted },
  newLabel: { fontSize: 10, letterSpacing: 1, color: palette.muted, marginTop: 4 },
});

export default SavedScreen;
