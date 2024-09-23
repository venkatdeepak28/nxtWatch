import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {MdPlaylistAdd} from 'react-icons/md'

import Navbar from '../Navbar'
import SideBar from '../Sidebar'
import LanguageContext from '../../context/NxtWatchContext'

import {
  HomepageContainer,
  LightVideoContainer,
  DarkVideoContainer,
  LightTrendingContainer,
  DarkTrendingContainer,
  TrendingHeading,
  DarkVideoListContainter,
  LightVideoListContainter,
  VideoListEl,
  VideoThumbnail,
  ChannelDetailsCont,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SavedVideos extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.changeApiStatus()
  }

  changeApiStatus = () => {
    this.setState({apiStatus: apiStatusConstant.success})
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
          <button type="submit" className="retry-btn">
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
        <button type="submit" className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  renderNovideos = () => (
    <div className="no-search-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-video-logo"
      />
      <h1>No saved videos found</h1>
      <p className="failure-para">
        You can save your videos while watching them
      </p>
    </div>
  )

  returnDate = date => {
    const value = formatDistanceToNow(new Date(date))
    const sliced = value.slice(5, value.length)
    if (sliced[0] === 't') {
      return value.slice(6, value.length)
    }
    return sliced
  }

  renderSuccess = theme => {
    const {activeTheme, savedVideosList} = theme

    if (savedVideosList.length === 0) {
      return this.renderNovideos(activeTheme)
    }

    if (activeTheme === 'LI') {
      return (
        <LightVideoListContainter>
          {savedVideosList.map(eachValue => (
            <VideoListEl key={eachValue.id}>
              <Link to={`/videos/${eachValue.id}`} className="home-container">
                <VideoThumbnail
                  src={eachValue.thumbnailUrl}
                  alt="video thumbnail"
                />
                <ChannelDetailsCont>
                  <p className="para">{eachValue.title}</p>
                  <p>{eachValue.channelName}</p>
                  <div>
                    <p>
                      {eachValue.viewCount} &#8226;{' '}
                      {this.returnDate(eachValue.publishedAt)} ago
                    </p>
                  </div>
                </ChannelDetailsCont>
              </Link>
            </VideoListEl>
          ))}
        </LightVideoListContainter>
      )
    }

    return (
      <DarkVideoListContainter>
        {savedVideosList.map(eachValue => (
          <VideoListEl key={eachValue.id}>
            <Link to={`/videos/${eachValue.id}`} className="home-container">
              <VideoThumbnail
                src={eachValue.thumbnailUrl}
                alt={eachValue.title}
              />
              <ChannelDetailsCont>
                <h1 className="para">{eachValue.title}</h1>
                <p>{eachValue.channelName}</p>
                <div>
                  <p>
                    {eachValue.viewCount} &#8226;{' '}
                    {this.returnDate(eachValue.publishedAt)} ago
                  </p>
                </div>
              </ChannelDetailsCont>
            </Link>
          </VideoListEl>
        ))}
      </DarkVideoListContainter>
    )
  }

  renderPage = prop => {
    const {apiStatus} = this.state
    const {activeTheme} = prop

    switch (apiStatus) {
      case apiStatusConstant.initial:
        return this.renderLoading(activeTheme)
      case apiStatusConstant.success:
        return this.renderSuccess(prop)
      default:
        return this.renderFailure(activeTheme)
    }
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const {activeTheme, savedVideosList} = value

          if (activeTheme === 'LI') {
            return (
              <div className="main-container">
                <Navbar />
                <div className="home-container">
                  <div className="sidebar-container">
                    <SideBar />
                  </div>
                  <HomepageContainer>
                    {savedVideosList.length !== 0 ? (
                      <LightVideoContainer data-testid="savedVideos">
                        <LightTrendingContainer>
                          {/* eslint-disable-next-line */}
                          <button type="submit" className="page-btn">
                            <MdPlaylistAdd className="light-logo" />
                          </button>
                          <TrendingHeading>Saved Videos</TrendingHeading>
                        </LightTrendingContainer>
                      </LightVideoContainer>
                    ) : (
                      ''
                    )}
                    <LightVideoContainer data-testid="savedVideos">
                      {this.renderPage({activeTheme, savedVideosList})}
                    </LightVideoContainer>
                  </HomepageContainer>
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
                <HomepageContainer>
                  {savedVideosList.length !== 0 ? (
                    <DarkVideoContainer data-testid="savedVideos">
                      <DarkTrendingContainer>
                        {/* eslint-disable-next-line */}
                        <button type="submit" className="page-btn">
                          <MdPlaylistAdd className="light-logo" />
                        </button>
                        <TrendingHeading>Saved Videos</TrendingHeading>
                      </DarkTrendingContainer>
                    </DarkVideoContainer>
                  ) : (
                    ''
                  )}
                  <DarkVideoContainer data-testid="savedVideos">
                    {this.renderPage({activeTheme, savedVideosList})}
                  </DarkVideoContainer>
                </HomepageContainer>
              </div>
            </div>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default SavedVideos
