import React, {Component} from 'react';
import {connect} from "react-redux";
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft'
import ContentLoader  from 'react-content-loader'
import range from 'lodash/range'
import { defineMessages, injectIntl, InjectedIntl } from "react-intl"
import {Helmet} from "react-helmet";
import {History} from "history";
import LazyLoad from 'react-lazyload';
import Truncate from 'react-truncate';

import {Container} from "./styles";
import ReduxState, {ISearchAyah, ISearchSurah} from "../../types/GlobalState";
import {fetchSpecificAyah, fetchSurah} from "../../api/ayahs";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import Icon from "react-icons-kit";
import {Link} from "react-router-dom";
import {setAyah, setSurah, toggleFetchingCurrentAyah} from "../../store/actions/ayahs";
import AyahShape from "../../shapes/AyahShape";


const messages = defineMessages({
  placeholder: {
    id: KEYS.AYAH_PICKER_SEARCH_PLACEHOLDER,
  }
})


interface IOwnProps {
  match: any;
  intl: InjectedIntl;
  history: History
}

interface IDispatchProps {
  setAyah(ayah: AyahShape): void;
  setSurah(surah: ISearchSurah): void;
  toggleFetchingCurrentAyah(): void;
}

interface IStateProps {
  currentAyah: AyahShape;
  currentSurah: ISearchSurah;
}


interface IState {
  searchText: string;
  isFetching: boolean;
}

type IProps = IStateProps & IDispatchProps & IOwnProps;

class AyahPicker extends Component<IProps, IState> {
  state = {
    searchText: "",
    isFetching: false
  }
  componentDidMount() {
    if (!this.props.currentSurah || this.props.currentSurah.chapterId !== this.props.match.params.num) {
      this.setState({
        isFetching: true,
      });
      fetchSurah(this.props.match.params.num)
        .then(ayahs => {
          this.setState({
            isFetching: false
          });
          this.props.setSurah(ayahs)
        })
    }
  }
  handleAyahClick = (ayahNum: number) => {
    if (this.props.currentAyah.verseNumber !== ayahNum) {
      this.props.toggleFetchingCurrentAyah();
      fetchSpecificAyah(this.props.match.params.num, ayahNum)
        .then((ayah: AyahShape) => {
          this.props.setAyah(ayah);
          this.props.toggleFetchingCurrentAyah();
        })
    }
    this.props.history.push("/");
  }
  renderAyahs = () => {
    return Object.keys(this.props.currentSurah.ayahs)
      .filter((ayahNum: string) => {
        return this.props.currentSurah.ayahs[ayahNum].text.toLowerCase().trim().includes(this.state.searchText.toLowerCase().trim())
      })
      .map((ayahNum: string) => {
        ayahNum = Number(ayahNum);
      const active = this.props.currentAyah.surah === this.props.match.params.num && this.props.currentAyah.ayah === ayahNum
      return (
        <LazyLoad height={35} offset={0} once overflow={true}>
          <div className={`list-item ${active ? "active": ""}`} onClick={() => this.handleAyahClick(ayahNum)}>
            <p className={"number"}>{ ayahNum }</p>
            <p className={"text"}>
              <Truncate
                lines={1}
                ellipsis='...'
                trimWhitespace
              >
                {this.props.currentSurah.ayahs[ayahNum].displayText}
              </Truncate>
            </p>
          </div>
        </LazyLoad>
      )
    })
  }
  handleSearchText = (e: any) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  }
  renderLoader = () => {
    return range(6).map(n => {
      return (
        <ContentLoader height={42} style={{transform: "rotate(-180deg)"}}>
          {/* Pure SVG */}
          <rect x="80" y="10" rx="3" ry="3" width="250" height="10" />
          <rect x="35" y="8" rx="5" ry="5" width="15" height="15" />
        </ContentLoader>
      )
    })
  }
  render() {
    const {intl} = this.props
    return (
      <Container>
        <Helmet>
          <title>{ intl.formatMessage({ id: KEYS.AYAH_PICKER_TITLE }) }</title>
        </Helmet>
        <Link to={"/surahs"} className="back-to-surah">
          <Icon icon={arrowLeft} />
          <T id={KEYS.AYAH_PICKER_BACK_BUTTON_TEXT}/>
        </Link>
        <h3 className="title">
          <T id={KEYS.AYAH_PICKER_TITLE}/>
        </h3>
        <div className="search-box">
          <input type="text" name="search" onKeyUp={this.handleSearchText} placeholder={
            intl.formatMessage(messages.placeholder)
          } />
        </div>
        <div className="list">
          {
            this.state.isFetching ?
              this.renderLoader()
              :
              this.renderAyahs()
          }
        </div>
      </Container>
    )
  }
}



const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
    currentSurah: state.ayahs.currentSurah,
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setAyah: (ayah: AyahShape) => {
      dispatch(setAyah(ayah))
    },
    toggleFetchingCurrentAyah: () => {
      dispatch(toggleFetchingCurrentAyah())
    },
    setSurah: (surah: ISearchSurah) => {
      dispatch(setSurah(surah))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AyahPicker));
