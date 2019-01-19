import React, {Component} from 'react';
import {connect} from "react-redux";
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft'
import { injectIntl, InjectedIntl } from "react-intl"
import {Helmet} from "react-helmet";
import Icon from "react-icons-kit";
import {Link} from "react-router-dom";

import {Container} from "./styles"
import ReduxState from "../../types/GlobalState";
import surahs from "../../api/surahs"
import T from "../../components/T";
import KEYS from "../../locale/keys";
import AyahShape from "../../shapes/AyahShape";

interface IOwnProps {
  match: any;
  intl: InjectedIntl;
}

interface IStateProps {
  currentAyah: AyahShape;
}

interface ISearchSurah {
  arabic: string;
  latin: string;
  english: string;
  location: number;
  sajda: number;
  ayah: number;
}

interface IState {
  surahs: { [num: string]: ISearchSurah};
  searchText: string;
  isFetching: boolean;
}

type IProps = IStateProps & IOwnProps;

class SurahPicker extends Component<IProps, IState> {
  state = {
    surahs,
    searchText: "",
    isFetching: false
  }
  renderSurahs = () => {
    let {searchText} = this.state;
    searchText = searchText.toLowerCase().trim();
    return Object.keys(this.state.surahs)
      .filter((surahNum: string) => {
        return surahs[surahNum].arabic.includes(searchText) ||
        surahs[surahNum].english.toLocaleLowerCase().includes(searchText) ||
        surahs[surahNum].latin.toLocaleLowerCase().includes(searchText)
      })
      .map((surahNum: string) => {
        const active = this.props.currentAyah.chapterId === Number(surahNum);
        const surah = this.state.surahs[surahNum];
        return (
          <Link to={`/surah/${surahNum}`} key={surahNum} className={`list-item ${active ? "active": ""}`}>
            <p className={"number"}>{ surahNum }</p>
            <div className={"text"}>
              <p>
                { surah.latin } ({surah.english})
              </p>
              <p className={"arabic"} data-surah-number={surahNum} />
            </div>
          </Link>
        )
      })
  }
  handleSearchText = (e: any) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  }
  render() {
    const { intl } = this.props;
    return (
      <Container>
        <Helmet>
          <title>{ intl.formatMessage({ id: KEYS.SURAH_PICKER_TITLE }) }</title>
        </Helmet>
        <Link to={"/"} className="back-to-surah">
          <Icon icon={arrowLeft} />
          <T id={KEYS.SURAH_PICKER_BACK_BUTTON_TEXT}/>
        </Link>
        <h3 className="title">
          <T id={KEYS.SURAH_PICKER_TITLE}/>
        </h3>
        <div className="search-box">
          <input type="text" name="search" onKeyUp={this.handleSearchText} placeholder={
            intl.formatMessage({
              id: KEYS.SURAH_PICKER_SEARCH_PLACEHOLDER,
            })
          } />
        </div>
        <div className="list">
          {
            this.renderSurahs()
          }
        </div>
      </Container>
    )
  }
}


const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah
  }
}


export default connect(mapStateToProps)(injectIntl(SurahPicker));
