import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {FaFire} from 'react-icons/fa'

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

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    trendingData: [],
  }

  componentDidMount() {
    this.getTrendingDetails()
  }

  getTrendingDetails = async () => {
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const url = 'https://apis.ccbp.in/videos/trending'
    const response = await fetch(url, option)
    const data = await response.json()
    const updatedArr = data.videos.map(eachValue => ({
      id: eachValue.id,
      title: eachValue.title,
      viewCount: eachValue.view_count,
      thumbnailUrl: eachValue.thumbnail_url,
      publishedAt: eachValue.published_at,
      channelName: eachValue.channel.name,
      profileUrl: eachValue.channel.profile_image_url,
    }))
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstant.success,
        trendingData: updatedArr,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  returnDate = date => {
    const value = formatDistanceToNow(new Date(date))
    const sliced = value.slice(5, value.length)
    if (sliced[0] === 't') {
      return value.slice(6, value.length)
    }
    return sliced
  }

  renderSuccess = theme => {
    const {trendingData} = this.state

    console.log(trendingData)

    if (theme === 'LI') {
      return (
        <LightVideoListContainter>
          {trendingData.map(eachValue => (
            <VideoListEl key={eachValue.id}>
              <Link to={`/videos/${eachValue.id}`} className="home-container">
                <VideoThumbnail
                  src={eachValue.thumbnailUrl}
                  alt="video thumbnail"
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
        </LightVideoListContainter>
      )
    }

    return (
      <DarkVideoListContainter>
        {trendingData.map(eachValue => (
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
            onClick={this.getTrendingDetails}
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
          onClick={this.getTrendingDetails}
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
                    <LightVideoContainer data-tesiid="trending">
                      <LightTrendingContainer>
                        {/* eslint-disable-next-line */}
                        <button type="submit" className="page-btn">
                          <FaFire className="light-logo" />
                        </button>
                        <TrendingHeading>Trending</TrendingHeading>
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
                  <DarkVideoContainer data-tesiid="trending">
                    <DarkTrendingContainer>
                      {/* eslint-disable-next-line */}
                      <button type="submit" className="page-btn">
                        <FaFire className="light-logo" />
                      </button>
                      <TrendingHeading>Trending</TrendingHeading>
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

export default Trending
