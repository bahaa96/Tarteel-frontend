import { createAction } from 'typesafe-actions';
import humps from "humps";

import AyahShape from "../../shapes/AyahShape";
import {ISearchAyah} from "../../types/GlobalState";

export const setAyah = createAction('ayahs/SET', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const setNextAyah = createAction('ayahs/SET_NEXT', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const unShiftNextAyah = createAction('ayahs/UNSHIFT_NEXT', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const shiftNextAyah = createAction('ayahs/SHIFT_NEXT_AYAH', resolve => {
  return () => resolve()
});

export const popNextAyah = createAction('ayahs/POP_NEXT_AYAH', resolve => {
  return () => resolve()
});

export const setPrevAyah = createAction('ayahs/SET_PREVIOUS', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const unShiftPrevAyah = createAction('ayahs/UNSHIFT_PREVIOUS', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const shiftPrevAyah = createAction('ayahs/SHIFT_PREV_AYAH', resolve => {
  return () => resolve()
});

export const popPrevAyah = createAction('ayahs/POP_PREV_AYAH', resolve => {
  return () => resolve()
});

export const toggleFetchingCurrentAyah = createAction('ayahs/TOGGLE_FETCHING_CURRENT_AYAH', resolve => {
  return () => resolve()
});

export const setSurah = createAction('ayahs/SET_SURAH', resolve => {
  return (surah: ISearchAyah) => resolve(humps.camelizeKeys(surah))
});
