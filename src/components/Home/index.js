import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {IoMdClose, IoMdSearch} from 'react-icons/io'

import Navbar from '../Navbar'
import SideBar from '../Sidebar'
import LanguageContext from '../../context/NxtWatchContext'

import {
  HomepageContainer,
  BannerContainer,
  BannerInnerContainer,
  BannerLogo,
  BannerButton,
  LightVideoContainer,
  DarkVideoContainer,
  LightInputEl,
  DarkInputEl,
  LightSearchButton,
  DarkSearchButton,
  VideoListContainer,
  VideoListEl,
  VideoThumbnail,
  ChannelDetailsCon,
  ChannelLogo,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    searchValue: '',
    videoData: [],
    bannerValue: true,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getValue = event => {
    event.preventDefault()
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {searchValue} = this.state
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    const responseVideo = await fetch(url, option)
    const data = await responseVideo.json()
    const updatedArr = data.videos.map(eachValue => ({
      id: eachValue.id,
      title: eachValue.title,
      viewCount: eachValue.view_count,
      thumbnailUrl: eachValue.thumbnail_url,
      publishedAt: eachValue.published_at,
      channelName: eachValue.channel.name,
      profileUrl: eachValue.channel.profile_image_url,
    }))
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

  closeBanner = () => {
    this.setState(prevState => ({bannerValue: !prevState.bannerValue}))
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  renderBanner = () => (
    <HomepageContainer>
      <BannerContainer data-testid="banner">
        <BannerInnerContainer>
          <BannerLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p className="banner-para">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <BannerButton type="submit">GET IT NOW</BannerButton>
        </BannerInnerContainer>
        {/* eslint-disable-next-line */}
        <button
          className="banner-btn"
          type="submit"
          onClick={this.closeBanner}
          data-testid="close"
        >
          <IoMdClose />
        </button>
      </BannerContainer>
    </HomepageContainer>
  )

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

  returnDate = date => {
    const value = formatDistanceToNow(new Date(date))
    const sliced = value.slice(5, value.length)
    if (sliced[0] === 't') {
      return value.slice(6, value.length)
    }
    return sliced
  }

  renderSuccess = () => {
    const {videoData} = this.state

    if (videoData.length === 0) {
      return (
        <div className="no-search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-video-logo"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="submit" className="retry-btn">
            Retry
          </button>
        </div>
      )
    }

    return (
      <VideoListContainer>
        {videoData.map(eachValue => (
          <VideoListEl key={eachValue.id}>
            <Link to={`/videos/${eachValue.id}`}>
              <VideoThumbnail
                src={eachValue.thumbnailUrl}
                alt="video thumbnail"
              />
              <ChannelDetailsCon>
                <ChannelLogo src={eachValue.profileUrl} alt="channel logo" />
                <div>
                  <p className="para">{eachValue.title}</p>
                  <p>{eachValue.channelName}</p>
                  <div>
                    <p>
                      {eachValue.viewCount} &#8226;{' '}
                      {this.returnDate(eachValue.publishedAt)} ago
                    </p>
                  </div>
                </div>
              </ChannelDetailsCon>
            </Link>
          </VideoListEl>
        ))}
      </VideoListContainer>
    )
  }

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

  renderPage = activeTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.initial:
        return this.renderLoading(activeTheme)
      case apiStatusConstant.success:
        return this.renderSuccess()
      default:
        return this.renderFailure(activeTheme)
    }
  }

  render() {
    const {bannerValue, searchValue} = this.state
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
                    {bannerValue ? this.renderBanner() : ''}
                    <LightVideoContainer data-testid="home">
                      <form
                        className="input-container"
                        onSubmit={this.getValue}
                      >
                        <LightInputEl
                          type="search"
                          placeholder="Search"
                          value={searchValue}
                          onChange={this.onChangeSearch}
                        />
                        <LightSearchButton
                          type="submit"
                          data-testid="searchButton"
                        >
                          <IoMdSearch />
                        </LightSearchButton>
                      </form>
                      {this.renderPage({activeTheme})}
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
                  {bannerValue ? this.renderBanner() : ''}
                  <DarkVideoContainer data-testid="home">
                    <form className="input-container" onSubmit={this.getValue}>
                      <DarkInputEl
                        type="search"
                        placeholder="Search"
                        value={searchValue}
                        onChange={this.onChangeSearch}
                      />
                      <DarkSearchButton
                        type="submit"
                        onClick={this.getVideoDetails}
                        data-testid="searchButton"
                      >
                        <IoMdSearch />
                      </DarkSearchButton>
                    </form>
                    {this.renderPage({activeTheme})}
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

export default Home
