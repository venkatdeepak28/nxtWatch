import Navbar from '../Navbar'
import SideBar from '../Sidebar'
import LanguageContext from '../../context/NxtWatchContext'

import {
  HomepageContainer,
  LightVideoContainer,
  DarkVideoContainer,
} from './styledComponents'

const NotFound = () => (
  <LanguageContext.Consumer>
    {value => {
      const {activeTheme} = value

      console.log(activeTheme)

      if (activeTheme === 'LI') {
        return (
          <div className="main-container">
            <Navbar />
            <div className="home-container">
              <SideBar />
              <HomepageContainer>
                <LightVideoContainer>
                  <div className="no-search-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                      alt="not found"
                      className="no-video-logo"
                    />
                    <h1>Page Not Found</h1>
                    <p className="failure-para">
                      We are sorry, the page you are requested could not be
                      found
                    </p>
                  </div>
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
            <SideBar />
            <HomepageContainer>
              <DarkVideoContainer>
                <div className="no-search-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                    alt="not found"
                    className="no-video-logo"
                  />
                  <h1>Page Not Found</h1>
                  <p className="failure-para">
                    We are sorry, the page you are requested could not be found
                  </p>
                </div>
              </DarkVideoContainer>
            </HomepageContainer>
          </div>
        </div>
      )
    }}
  </LanguageContext.Consumer>
)

export default NotFound
