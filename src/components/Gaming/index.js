import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'

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

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    gamingData: [],
  }

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const url = 'https://apis.ccbp.in/videos/gaming'
    const response = await fetch(url, option)
    const data = await response.json()
    const updatedArr = data.videos.map(eachValue => ({
      id: eachValue.id,
      title: eachValue.title,
      viewCount: eachValue.view_count,
      thumbnailUrl: eachValue.thumbnail_url,
    }))
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstant.success,
        gamingData: updatedArr,
      })
    }
  }

  renderSuccess = theme => {
    const {gamingData} = this.state

    if (theme === 'LI') {
      return (
        <LightVideoListContainter>
          {gamingData.map(eachValue => (
            <VideoListEl key={eachValue.id}>
              <VideoThumbnail
                src={eachValue.thumbnailUrl}
                alt="video thumbnail"
              />
              <ChannelDetailsCont>
                <p className="para">{eachValue.title}</p>
                <p>{eachValue.viewCount} watching</p>
              </ChannelDetailsCont>
            </VideoListEl>
          ))}
        </LightVideoListContainter>
      )
    }

    return (
      <DarkVideoListContainter>
        {gamingData.map(eachValue => (
          <VideoListEl key={eachValue.id}>
            <VideoThumbnail
              src={eachValue.thumbnailUrl}
              alt="video thumbnail"
            />
            <ChannelDetailsCont>
              <p className="para">{eachValue.title}</p>
              <p>{eachValue.viewCount}</p>
            </ChannelDetailsCont>
          </VideoListEl>
        ))}
      </DarkVideoListContainter>
    )
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
            onClick={this.getGamingData}
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
          onClick={this.getGamingData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderPage = theme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.initial:
        return this.renderLoading(theme)
      case apiStatusConstant.success:
        return this.renderSuccess(theme)
      default:
        return this.renderFailure(theme)
    }
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const {activeTheme} = value

          if (activeTheme === 'LI') {
            return (
              <div className="main-container">
                <Navbar />
                <div className="home-container">
                  <div className="sidebar-container">
                    <SideBar />
                  </div>
                  <HomepageContainer>
                    <LightVideoContainer data-tesid="gaming">
                      <LightTrendingContainer>
                        {/* eslint-disable-next-line */}
                        <button type="submit" className="page-btn">
                          <FaGamepad className="light-logo" />
                        </button>
                        <TrendingHeading>Gaming</TrendingHeading>
                      </LightTrendingContainer>
                      {this.renderPage(activeTheme)}
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
                  <DarkVideoContainer>
                    <DarkTrendingContainer>
                      {/* eslint-disable-next-line */}
                      <button type="submit" className="page-btn">
                        <FaGamepad className="light-logo" />
                      </button>
                      <TrendingHeading>Gaming</TrendingHeading>
                    </DarkTrendingContainer>
                    {this.renderPage(activeTheme)}
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

export default Gaming
