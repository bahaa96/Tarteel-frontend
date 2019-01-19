import React from "react";
import styled from "styled-components";
import {Icon} from "react-icons-kit";
import {micA} from 'react-icons-kit/ionicons/micA'
import {refresh} from 'react-icons-kit/fa/refresh'
import {stop} from 'react-icons-kit/fa/stop'
import {close as closeIcon} from 'react-icons-kit/ionicons/close'
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {MobileView, BrowserView} from 'react-device-detect'
import {History} from "history";
import {withCookies, Cookies} from "react-cookie";
import humps from 'humps'

import {toggleIsRecording, toggleDoneRecording} from "../store/actions/status";
import {increaseRecitedAyahs, setPassedOnBoarding} from "../store/actions/profile";
import KEYS from "../locale/keys";
import T from "./T";
import ToggleButton from "./ToggleButton";
import RecordingButton from "./RecordingButton";
import NoteButton from "./NoteButton";
import FooterButton from "./FooterButton";
import ReduxState, {IProfile, IStatus} from "../types/GlobalState";
import {fetchRandomAyah, fetchSpecificAyah, sendRecording} from "../api/ayahs";
import {
  popNextAyah, popPrevAyah,
  setAyah,
  setNextAyah,
  setPrevAyah,
  shiftNextAyah,
  shiftPrevAyah,
  unShiftNextAyah,
  unShiftPrevAyah
} from "../store/actions/ayahs";
import surahs from "../api/surahs";
import {storePassedOnBoarding, storeUserRecitedAyahs} from "../helpers";
import { getBlob, startRecording, stopRecording} from "../helpers/recorder";
import {ModalContent} from "../pages/Evaluator/styles";
import Modal from "./Modal";
import HandShakeImage from '../../public/handshake-icon.png'
import config from '../../config';
import AyahShape from "../shapes/AyahShape";
import {getType} from "typesafe-actions";


interface IOwnProps {
  history: History
}

interface IDispatchPros {
  toggleIsRecording(): void;
  toggleDoneRecording(): void;
  increaseRecitedAyahs(): void;
  setPassedOnBoarding(): void;
  setAyah(ayah: AyahShape): void;
  setNextAyah(ayah: AyahShape): void;
  setPrevAyah(ayah: AyahShape): void;
  shiftNextAyah(): void;
  shiftPrevAyah(): void;
  unShiftNextAyah(ayah: AyahShape): void;
  unShiftPrevAyah(ayah: AyahShape): void;
  popPrevAyah(): void;
  popNextAyah(): void;
}

interface IStateProps {
  status: IStatus;
  profile: IProfile;
  currentAyah: AyahShape;
  nextAyah: AyahShape;
  prevAyah: AyahShape;
}

interface IState {
  showModal: boolean;
  showErrorMessage: boolean;
}

type IProps = IOwnProps & IStateProps & IDispatchPros;

class Footer extends React.Component<IProps, IState>  {
  state = {
    showModal: false,
    showErrorMessage: false,
  }
  getNextAyah = (surah: number, ayah: number) => {
    const nextAyah = ayah + 1;
    if (surahs[surah]["ayah"] == nextAyah - 1) {
      if (surah === 114 && ayah === 6) {
        return {
          nextSurah: 1,
          nextAyah: 1,
        }
      } else {
        const nextSurah = Number(surah) + 1;
        return {
          nextSurah,
          nextAyah: 1
        }
      }
    }
    else {
      return {
        nextSurah: surah,
        nextAyah,
      }
    }
  }
  getPrevAyah = (surah: number, ayah: number) => {
    const prevAyah = ayah - 1;
    if (ayah == 1) {
      if (surah == 1) {
        return {
          prevSurah: 114,
          prevAyah: surahs[114].ayah
        }
      } else {
        const prevSurah = surah - 1;
        return {
          prevSurah,
          prevAyah: surahs[prevSurah].ayah
        }
      }
    }
    else {
      return {
        prevSurah: surah,
        prevAyah,
      }
    }
  }
  loadNextQueue = async () => {
    while (this.props.nextAyah.length < 3) {
      const ayah = this.props.nextAyah.slice(-1)[0];
      await this.loadNextAyah(ayah);
    }
    if (this.props.nextAyah[0].verseNumber === this.props.currentAyah.verseNumber) {
      await this.props.shiftNextAyah();
      this.loadNextQueue()
    }
  }
  loadPrevQueue = async () => {
    while (this.props.prevAyah.length < 3) {
      const ayah = this.props.prevAyah.slice(-1)[0];
      await this.loadPreviousAyah(ayah);
    }
    if (this.props.prevAyah[0].verseNumber === this.props.currentAyah.verseNumber) {
      await this.props.shiftPrevAyah();
      this.loadPrevQueue();
    }
  }
  loadNextAyah = async (currentAyah?: AyahShape) => {
    const callback = (ayah: AyahShape) => {
      ayah = humps.camelizeKeys(ayah);
      this.props.setNextAyah(ayah);
    };
    const {verseNumber: ayah, chapterId: surah} = currentAyah || this.props.currentAyah;
    const { nextSurah, nextAyah } = this.getNextAyah(surah, ayah);
    await fetchSpecificAyah(nextSurah, nextAyah).then(callback);
  }

  loadPreviousAyah = async (currentAyah?: AyahShape) => {
    const callback = (ayah: AyahShape) => {
      ayah = humps.camelizeKeys(ayah);
      this.props.setPrevAyah(ayah);
    };
    const {verseNumber: ayah, chapterId: surah} = currentAyah || this.props.currentAyah
    const { prevSurah, prevAyah } = this.getPrevAyah(surah, ayah);
    await fetchSpecificAyah(prevSurah, prevAyah).then(callback);
  }
  setAyah = async (ayah: AyahShape) => {
    await this.props.setAyah(ayah);
    this.props.cookies.set("lastAyah", ayah, { path: '/' });
  }

  fetchAyah = (surahKey: number, ayah: number) => {
    fetchSpecificAyah(surahKey, ayah)
      .then(this.setAyah);
  };

  setPreviousAyah = async () => {
    const {verseNumber: ayah, chapterId: surah} = this.props.currentAyah;
    const {prevSurah, prevAyah} = this.getPrevAyah(surah, ayah)

    await this.props.popNextAyah()
    await this.props.unShiftNextAyah(this.props.currentAyah)

    if (this.props.prevAyah.length && this.props.prevAyah[0].verseNumber === prevAyah) {
      await this.setAyah(this.props.prevAyah[0])
    }

    await this.props.shiftPrevAyah();
    this.loadPrevQueue();
  }
  setNextAyah = async () => {
    const {verseNumber: ayah, chapterId: surah} = this.props.currentAyah;
    const {nextSurah, nextAyah} = this.getNextAyah(surah, ayah)

    await this.props.popPrevAyah()
    await this.props.unShiftPrevAyah(this.props.currentAyah)

    if (this.props.nextAyah.length && this.props.nextAyah[0].verseNumber === nextAyah) {
      await this.setAyah(this.props.nextAyah[0])
    }

    await this.props.shiftNextAyah();
    await this.loadNextQueue();
  }
  handleError = () => {
    this.setState({
      showErrorMessage: true
    });
    this.props.toggleIsRecording();
  }
  handleRetry = () => {
    this.handleStartRecording();
    this.props.toggleDoneRecording();
  }
  increaseRecitedAyahs = async () => {
    await this.props.increaseRecitedAyahs()
    storeUserRecitedAyahs(this.props.profile.userRecitedAyahs)
  }
  handleSubmit = async (lastOne: boolean = false) => {
    const record = {
      surahNum: this.props.currentAyah.chapterId,
      ayahNum: this.props.currentAyah.verseNumber,
      hashString: this.props.currentAyah.sessionId,
      audio: getBlob()
    }
    sendRecording(
      record.audio,
      record.surahNum,
      record.ayahNum,
      record.hashString,
      this.props.currentAyah.sessionId,
      this.props.status.isContinuous
    )
      .then((res: Response) => {
        if (res.status === 201) {
          // after success code
        }
      });

    this.increaseRecitedAyahs();

    if (lastOne) {
      this.setNextAyah()
    }
    else if (this.props.status.isContinuous) {
      stopRecording().then(() => {
        this.setNextAyah()
        startRecording()
      });
    } else {
      const endpoints = [10, 50, 100];
      if (endpoints.includes(this.props.profile.userRecitedAyahs)) {
        this.setState({
          showModal: true,
        });
      }

      if (this.props.profile.userRecitedAyahs === 5 && !this.props.profile.passedOnBoarding) {
        this.props.setPassedOnBoarding();
        storePassedOnBoarding();
        this.props.history.push('/demographics');
      } else {
        this.props.toggleDoneRecording();
        this.setNextAyah();
      }

    }
  }
  handleStartRecording = () => {
    const config = {
      onError: this.handleError
    }
    startRecording(config)
      .then(() => {
        this.props.toggleIsRecording();
      })
  }
  handleStopRecording = () => {
    stopRecording()
      .then(() => {
        if (this.props.status.isContinuous) {
          // To submit the last ayah recited in continuous mode if the user clicked directly on stop button.
          this.handleSubmit(true);
          this.props.toggleIsRecording();

        } else {
          this.props.toggleIsRecording();
          this.props.toggleDoneRecording();
        }
      })
  }
  handleReviewPreviousAyah = () => {
    this.props.toggleDoneRecording()
    this.setPreviousAyah();
  }

  handleRecordingButton = () => {
    if (this.props.status.isRecording) {
      this.handleStopRecording()
    } else {
      this.handleStartRecording()
    }
  }
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  fetchRandomAyah = () => {
    fetchRandomAyah()
      .then((ayah: AyahShape) => {
        this.setAyah(ayah)
      })
  }
  async componentDidMount() {
    if (this.props.currentAyah.textSimple){
      await this.loadNextAyah()
      this.loadPreviousAyah()
      await this.loadNextQueue()
    } else {
      this.fetchRandomAyah()
    }
  }

  render() {
    const {isRecording, isDoneRecording, isContinuous} = this.props.status;
    const {showErrorMessage} = this.state;
    return (
     <Container>
       <div className="buttons-wrapper">
         {
           !isDoneRecording ?
             <div className="mic-wrapper">
               <RecordingButton className={`mic ${ isRecording ? "recording" : "" }`} onClick={this.handleRecordingButton}>
                 <div className="icon">
                   {
                     !isRecording ?
                       <Icon icon={micA} size={30}/>
                       :
                       <Icon icon={stop} size={30}/>
                   }
                 </div>
               </RecordingButton>
               {
                 !isRecording ?
                 <NoteButton className="previous arabic-text rtl" onClick={this.setPreviousAyah}>
                   <T id={KEYS.PREVIOUS_AYAH} />
                 </NoteButton>
                   : null
               }
               {
                  !isRecording ?
                 <NoteButton className="next arabic-text rtl" onClick={this.setNextAyah}>
                   <T id={KEYS.NEXT_AYAH} />
                 </NoteButton>
                    : null
               }
             </div>
             :
             null
         }
         {
           isRecording && isContinuous ?
             <p className="recording-note small-arabic-text">
               <T id={KEYS.CONTINUOUS_MODE_NOTE_TEXT} />
             </p>
             : null
         }
         <div className="review">
           {
             isDoneRecording ?
             <RecordingButton className={"retry"} onClick={this.handleRetry}>
               <div className="icon">
                 <Icon icon={refresh} size={30}/>
               </div>
               <p>
                 <T id={KEYS.RETRY_BUTTON_TEXT}/>
               </p>
             </RecordingButton>
               : null
           }
           {
             isDoneRecording || (isContinuous && isRecording) ?
               <FooterButton className={"submit"} onClick={() => { this.handleSubmit() }}>
                 <span>
                   <T id={KEYS.SUBMIT_BUTTON_TEXT} />
                 </span>
               </FooterButton>
               : null
           }
           {
             isDoneRecording ?
               <NoteButton className="previous-ayah arabic-text rtl" onClick={this.handleReviewPreviousAyah}>
                 <T id={KEYS.PREVIOUS_AYAH}/>
               </NoteButton>
               : null
           }

         </div>
       </div>
       {
         !isDoneRecording && !isRecording ? <ToggleButton text={KEYS.CONTINUOUS_MODE_NOTE_TEXT} /> : null
       }
       {
         showErrorMessage ?
           <div className={'error'} >
             <MobileView>
               <div className="close" onClick={() => {
                 this.setState({showErrorMessage: false});
               }}>
                 <Icon icon={closeIcon} />
               </div>
               <p>It doesn't look like you have microphone permissions enabled. Get a better experience on mobile!</p>
               <a href={config('androidAppLink')}>Android</a>
               <a href={config('IOSAppLink')}>iOS</a>
             </MobileView>
             <BrowserView>
               <div className="close" onClick={() => {
                 this.setState({showErrorMessage: false});
               }}>
                 <Icon icon={closeIcon} />
               </div>
               <p>To upload recordings, please enable microphone access, or use a different browser.</p>
             </BrowserView>
           </div>
           :
           null
       }
       <Modal
         isOpen={this.state.showModal}
         handleCloseModal={this.handleCloseModal}
         style={{height: '60%', width: '50%'}}
         shouldCloseOnOverlayClick={true}
         closable
       >
         <ModalContent>
           <h1 className="modal-title">Thank You!</h1>
           <img src={HandShakeImage} alt="" />
             <p>
               <b>
                 Thanks for helping us in reciting ayahs.
               </b>
             </p>
             <p>
               You can also help us evaluating some ayahs other people has recited.
             </p>
             <p>
               With the help of users like you, we have evaluated
               <b className="count"> {this.props.profile.evaluationsCount} </b> ayahs.
             </p>
             <p>
               <Link to="/evaluator">
                 Want to help us evaluating some ayahs?
               </Link>
             </p>
         </ModalContent>
       </Modal>
     </Container>
    )
  }
}

const Container = styled.div`
  height: 125px;
  width: 100%;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  text-align: center;
  
  .buttons-wrapper {
    .mic-wrapper {
      position: relative;
    }
    .recording-note {
      color: #a5aab2;
      font-weight: 500;
      font-size: 14px;
      position: relative;
      top: -23px;
    }
  } 
  
  .error {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 1em 0;
    color: #fff;
    margin: 10px 10px 20px 10px;
    background: rebeccapurple;
    border-radius: 15px;
    z-index: 5;
    
    .close {
      position: absolute;
      right: 10px;
      top: 5px;
    }
    p {
      margin: 1em 10px;
    }
    a {
      color: #fff;
      text-decoration: none;
      border: 1px solid #fff;
      border-radius: 3px;
      padding: 7px 10px;
      display: inline-block;
      margin: 0 5px;
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    //height: 200px;
    //justify-content: center;
  }
   // Special styling for very small screens like IPhone 5s and SE
  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) { 
    height: 125px;
  
  }   
`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    status: state.status,
    profile: state.profile,
    currentAyah: state.ayahs.currentAyah,
    nextAyah: state.ayahs.nextAyah,
    prevAyah: state.ayahs.prevAyah,
  }
}

const mapDispatchToProps = (dispatch): IDispatchPros => {
  return {
    toggleIsRecording: () => {
      dispatch(toggleIsRecording());
    },
    toggleDoneRecording: () => {
      dispatch(toggleDoneRecording())
    },
    increaseRecitedAyahs: () => {
      dispatch(increaseRecitedAyahs())
    },
    setPassedOnBoarding: () => {
      dispatch(setPassedOnBoarding())
    },
    setAyah: (ayah: AyahShape) => {
      dispatch(setAyah(ayah));
    },
    setNextAyah: (ayah: AyahShape) => {
      dispatch(setNextAyah(ayah));
    },
    shiftNextAyah: () => {
      dispatch(shiftNextAyah());
    },
    setPrevAyah: (ayah: AyahShape) => {
      dispatch(setPrevAyah(ayah));
    },
    shiftPrevAyah: () => {
      return dispatch(shiftPrevAyah());
    },
    unShiftNextAyah: (ayah: AyahShape) => {
      return dispatch(unShiftNextAyah(ayah));
    },
    unShiftPrevAyah: (ayah: AyahShape) => {
      return dispatch(unShiftPrevAyah(ayah))
    },
    popNextAyah: () => {
      return dispatch(popNextAyah())
    },
    popPrevAyah: () => {
      return dispatch(popPrevAyah())
    }
  }
}

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer)));
