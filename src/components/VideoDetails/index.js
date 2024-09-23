import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'

import {MdPlaylistAdd} from 'react-icons/md'
import {BiLike, BiDislike} from 'react-icons/bi'

import Navbar from '../Navbar'
import SideBar from '../Sidebar'
import LanguageContext from '../../context/NxtWatchContext'

import {
  LightHomepageContainer,
  DarkHomepageContainter,
  VideoHeading,
  LightVideoContainter,
  DarkVideoContainter,
  ControlsContainer,
  LightCustomButton,
  DarkCustomButton,
  ChannelDetailsContainer,
  ChannelLogo,
  SubsContainer,
  ChannelPara,
  DescPara,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    videoData: [],
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/${id}`
    const responseVideo = await fetch(url, option)
    const data = await responseVideo.json()
    const updatedArr = {
      id: data.video_details.id,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      thumbnailUrl: data.video_details.thumbnail_url,
      publishedAt: data.video_details.published_at,
      channelName: data.video_details.channel.name,
      profileUrl: data.video_details.channel.profile_image_url,
      description: data.video_details.description,
      videoUrl: data.video_details.video_url,
      subsCount: data.video_details.channel.subscriber_count,
    }
    if (responseVideo.ok === true) {
      this.setState({
        apiStatus: apiStatusConstant.success,
        videoData: updatedArr,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoading = theme => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={theme.activeTheme === 'LI' ? 'black' : 'white'}
        height="50"
        width="50"
      />
    </div>
  )

  renderFailure = theme => {
    if (theme.activeTheme === 'LI') {
      return (
        <div className="no-search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
            className="no-video-logo"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p className="failure-para">
            We are having some trouble to complete your request. please try
            again
          </p>
          <button
            type="submit"
            className="retry-btn"
            onClick={this.getVideoDetails}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="no-search-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="failure view"
          className="no-video-logo"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We are having some trouble to complete your request. please try again
        </p>
        <button
          type="submit"
          className="retry-btn"
          onClick={this.getVideoDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  renderSuccess = theme => {
    const {videoData} = this.state
    const {
      sendLikedObj,
      updatedLikeArr,
      sendDislikedObj,
      updatedDislikeArr,
      savedVideosList,
      sendSavedObj,
    } = theme

    const checkLiked = updatedLikeArr.some(
      eachValue => eachValue.id === videoData.id,
    )

    const checkDisliked = updatedDislikeArr.some(
      eachValue => eachValue.id === videoData.id,
    )

    const checkSaved = savedVideosList.some(
      eachValue => eachValue.id === videoData.id,
    )

    if (theme.activeTheme === 'LI') {
      return (
        <LightHomepageContainer data-testid="videoItemDetails">
          <div>
            <ReactPlayer
              url={videoData.videoUrl}
              width="1200px"
              height="700px"
              controls
            />
            <VideoHeading>{videoData.title}</VideoHeading>
            <LightVideoContainter>
              <div>
                <p className="views-para">
                  {videoData.viewCount} views &#8226; {videoData.publishedAt}
                </p>
              </div>
              <ControlsContainer>
                <LightCustomButton
                  type="submit"
                  onClick={sendLikedObj}
                  className={checkLiked === true ? 'custom-btn' : ''}
                >
                  <BiLike className="like-logo" />
                  Like
                </LightCustomButton>
                <LightCustomButton
                  type="submit"
                  onClick={sendDislikedObj}
                  className={checkDisliked === true ? 'custom-btn' : ''}
                >
                  <BiDislike className="like-logo" />
                  Dislike
                </LightCustomButton>
                <LightCustomButton
                  type="submit"
                  onClick={sendSavedObj}
                  className={checkSaved === true ? 'custom-btn' : ''}
                >
                  <MdPlaylistAdd className="like-logo" />
                  {checkSaved === true ? 'Saved' : 'Save'}
                </LightCustomButton>
              </ControlsContainer>
            </LightVideoContainter>
            <hr className="hr-el" />
            <ChannelDetailsContainer>
              <ChannelLogo src={videoData.profileUrl} alt="channel" />
              <SubsContainer>
                <ChannelPara>{videoData.channelName}</ChannelPara>
                <p>{videoData.subsCount} subscribers</p>
              </SubsContainer>
            </ChannelDetailsContainer>
            <DescPara>{videoData.description}</DescPara>
          </div>
        </LightHomepageContainer>
      )
    }

    return (
      <DarkHomepageContainter data-testid="videoItemDetails">
        <div>
          <ReactPlayer
            url={videoData.videoUrl}
            width="1200px"
            height="700px"
            controls
          />
          <VideoHeading>{videoData.title}</VideoHeading>
          <DarkVideoContainter>
            <div>
              <p className="views-para">
                {videoData.viewCount} views &#8226; {videoData.publishedAt}
              </p>
            </div>
            <ControlsContainer>
              <DarkCustomButton
                type="submit"
                onClick={sendLikedObj}
                className={checkLiked === true ? 'custom-btn' : 'white-btn'}
              >
                <BiLike className="like-logo" />
                Like
              </DarkCustomButton>
              <DarkCustomButton
                type="submit"
                onClick={sendDislikedObj}
                className={checkDisliked === true ? 'custom-btn' : 'white-btn'}
              >
                <BiDislike className="like-logo" />
                Dislike
              </DarkCustomButton>
              <DarkCustomButton
                type="submit"
                onClick={sendSavedObj}
                className={checkSaved === true ? 'custom-btn' : 'white-btn'}
              >
                <MdPlaylistAdd className="like-logo" />
                Save
              </DarkCustomButton>
            </ControlsContainer>
          </DarkVideoContainter>
          <hr className="hr-el" />
          <ChannelDetailsContainer>
            <ChannelLogo src={videoData.profileUrl} alt="channel" />
            <SubsContainer>
              <ChannelPara>{videoData.channelName}</ChannelPara>
              <p>{videoData.subsCount} subscribers</p>
            </SubsContainer>
          </ChannelDetailsContainer>
          <DescPara>{videoData.description}</DescPara>
        </div>
      </DarkHomepageContainter>
    )
  }

  renderPage = prop => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.initial:
        return this.renderLoading(prop)
      case apiStatusConstant.success:
        return this.renderSuccess(prop)
      default:
        return this.renderFailure(prop)
    }
  }

  render() {
    const {videoData} = this.state
    return (
      <LanguageContext.Consumer>
        {value => {
          const {
            activeTheme,
            updateLikedVideos,
            updatedLikeArr,
            updateDislikedVideos,
            updatedDislikeArr,
            savedVideosList,
            updateSavedVideos,
          } = value

          const sendLikedObj = () => {
            updateLikedVideos(videoData)
          }

          const sendDislikedObj = () => {
            updateDislikedVideos(videoData)
          }

          const sendSavedObj = () => {
            updateSavedVideos(videoData)
          }

          if (activeTheme === 'LI') {
            return (
              <div className="main-container">
                <Navbar />
                <div className="home-container">
                  <div className="sidebar-container">
                    <SideBar />
                  </div>
                  <div className="responsive-container">
                    {this.renderPage({
                      activeTheme,
                      sendLikedObj,
                      updatedLikeArr,
                      sendDislikedObj,
                      updatedDislikeArr,
                      savedVideosList,
                      sendSavedObj,
                    })}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div className="main-container">
              <Navbar />
              <div className="home-container">
                <div className="sidebar-container">
                  <SideBar />
                </div>
                <div className="responsive-container">
                  {this.renderPage({
                    activeTheme,
                    sendLikedObj,
                    updatedLikeArr,
                    sendDislikedObj,
                    updatedDislikeArr,
                    savedVideosList,
                    sendSavedObj,
                  })}
                </div>
              </div>
            </div>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default VideoDetails
