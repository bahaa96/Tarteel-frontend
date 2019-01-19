import { ActionType, getType } from 'typesafe-actions';
import uniqBy from 'lodash/uniqBy';

import initState from '../initState';
import * as ayahs from '../actions/ayahs';
import ReduxState from "../../types/GlobalState";

export type AyahsAction = ActionType<typeof ayahs>;

export const INITIAL_STATE = initState().ayahs;

export default (state: ReduxState['ayahs'] = INITIAL_STATE, action: AyahsAction) => {
  switch (action.type) {
    case getType(ayahs.setAyah):
      return {
        ...state,
        currentAyah: action.payload,
      };
    case getType(ayahs.setNextAyah) :
      return {
        ...state,
        nextAyah: uniqBy([
          ...state.nextAyah,
          action.payload
        ], 'verseNumber')
      }
    case getType(ayahs.unShiftNextAyah) :
      return {
        ...state,
        nextAyah: uniqBy([
          action.payload,
          ...state.nextAyah,
        ], 'verseNumber')
      }
    case getType(ayahs.shiftNextAyah) :
      return {
        ...state,
        nextAyah: state.nextAyah.slice(1)
      }
    case getType(ayahs.popNextAyah) :
      return {
        ...state,
        nextAyah: state.nextAyah.slice(0, 2)
      }
    case getType(ayahs.setPrevAyah) :
      return {
        ...state,
        prevAyah: uniqBy([
          ...state.prevAyah,
          action.payload
        ], 'verseNumber')
      }
    case getType(ayahs.unShiftPrevAyah) :
      return {
        ...state,
        prevAyah: uniqBy([
          action.payload,
          ...state.prevAyah,
        ], 'verseNumber')
      }
    case getType(ayahs.shiftPrevAyah):
      return {
        ...state,
        prevAyah: state.prevAyah.slice(1)
      }
    case getType(ayahs.popPrevAyah) :
      return {
        ...state,
        prevAyah: state.prevAyah.slice(0, 2)
      }
    case getType(ayahs.toggleFetchingCurrentAyah) :
      return {
        ...state,
        isFetchingCurrentAyah: !state.isFetchingCurrentAyah
      }
    case getType(ayahs.setSurah) :
      return {
        ...state,
        currentSurah: action.payload,
      }
    default:
      return state;
  }
};
