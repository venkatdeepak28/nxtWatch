import {Link} from 'react-router-dom'

import {BsFillHouseDoorFill} from 'react-icons/bs'
import {FaFire, FaGamepad} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'

import {
  LightSideBarContainer,
  DarkSideBarContainer,
  SideBarInnerContainer,
  SidebarListContainer,
  ListEl,
  DarkFooterHeading,
  LightFooterHeading,
  FooterLogo,
  DarkSidebarListContainer,
} from './styledComponents'

import LanguageContext from '../../context/NxtWatchContext'

const SideBar = () => (
  <LanguageContext.Consumer>
    {value => {
      const {activeTheme, sidebarSelection, changeValue} = value

      const changeHead = () => {
        changeValue('home')
      }

      const changeTrend = () => {
        changeValue('trending')
      }

      const changeGames = () => {
        changeValue('gaming')
      }

      const changeSaved = () => {
        changeValue('saved-videos')
      }

      if (activeTheme === 'LI') {
        return (
          <LightSideBarContainer>
            <SideBarInnerContainer>
              <SidebarListContainer>
                <ListEl
                  className={
                    sidebarSelection === 'home' ? 'light-selected' : ''
                  }
                  key="home"
                >
                  <Link to="/" className="link-el" onClick={changeHead}>
                    <BsFillHouseDoorFill
                      className={
                        sidebarSelection === 'home'
                          ? 'sidebar-logo selected'
                          : 'sidebar-logo'
                      }
                    />
                    <p>Home</p>
                  </Link>
                </ListEl>
                <ListEl
                  className={
                    sidebarSelection === 'trending' ? 'light-selected' : ''
                  }
                  key="trending"
                >
                  <Link
                    to="/trending"
                    className="link-el"
                    onClick={changeTrend}
                  >
                    <FaFire
                      className={
                        sidebarSelection === 'trending'
                          ? 'sidebar-logo selected'
                          : 'sidebar-logo'
                      }
                    />
                    <p>Trending</p>
                  </Link>
                </ListEl>
                <ListEl
                  className={
                    sidebarSelection === 'gaming' ? 'light-selected' : ''
                  }
                  key="gaming"
                >
                  <Link to="/gaming" className="link-el" onClick={changeGames}>
                    <FaGamepad
                      className={
                        sidebarSelection === 'gaming'
                          ? 'sidebar-logo selected'
                          : 'sidebar-logo'
                      }
                    />
                    <p>Gaming</p>
                  </Link>
                </ListEl>
                <ListEl
                  className={
                    sidebarSelection === 'saved-videos' ? 'light-selected' : ''
                  }
                  key="saved-videos"
                >
                  <Link
                    to="/saved-videos"
                    className="link-el"
                    onClick={changeSaved}
                  >
                    <MdPlaylistAdd
                      className={
                        sidebarSelection === 'saved-videos'
                          ? 'sidebar-logo selected'
                          : 'sidebar-logo'
                      }
                    />
                    <p>Saved Videos</p>
                  </Link>
                </ListEl>
              </SidebarListContainer>
              <div>
                <LightFooterHeading>Contact Us</LightFooterHeading>
                <div>
                  <FooterLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <FooterLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <FooterLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
                <LightFooterHeading>
                  Enjoy! Now to see your channels and recommendations!
                </LightFooterHeading>
              </div>
            </SideBarInnerContainer>
          </LightSideBarContainer>
        )
      }

      return (
        <DarkSideBarContainer>
          <SideBarInnerContainer>
            <DarkSidebarListContainer>
              <ListEl
                className={sidebarSelection === 'home' ? 'dark-selected' : ''}
                key="home"
              >
                <Link className="dark-link-el" to="/" onClick={changeHead}>
                  <BsFillHouseDoorFill
                    className={
                      sidebarSelection === 'home'
                        ? 'sidebar-logo selected'
                        : 'sidebar-logo'
                    }
                  />
                  <p>Home</p>
                </Link>
              </ListEl>
              <ListEl
                className={
                  sidebarSelection === 'trending' ? 'dark-selected' : ''
                }
                key="trending"
              >
                <Link
                  className="dark-link-el"
                  to="/trending"
                  onClick={changeTrend}
                >
                  <FaFire
                    className={
                      sidebarSelection === 'trending'
                        ? 'sidebar-logo selected'
                        : 'sidebar-logo'
                    }
                  />
                  <p>Trending</p>
                </Link>
              </ListEl>
              <ListEl
                className={sidebarSelection === 'gaming' ? 'dark-selected' : ''}
                key="gaming"
              >
                <Link
                  className="dark-link-el"
                  to="/gaming"
                  onClick={changeGames}
                >
                  <FaGamepad
                    className={
                      sidebarSelection === 'gaming'
                        ? 'sidebar-logo selected'
                        : 'sidebar-logo'
                    }
                  />
                  <p>Gaming</p>
                </Link>
              </ListEl>
              <ListEl
                className={
                  sidebarSelection === 'saved-videos' ? 'dark-selected' : ''
                }
                key="saved-videos"
              >
                <Link
                  className="dark-link-el"
                  to="/saved-videos"
                  onClick={changeSaved}
                >
                  <MdPlaylistAdd
                    className={
                      sidebarSelection === 'saved-videos'
                        ? 'sidebar-logo selected'
                        : 'sidebar-logo'
                    }
                  />
                  <p>Saved Videos</p>
                </Link>
              </ListEl>
            </DarkSidebarListContainer>
            <div>
              <DarkFooterHeading>Contact Us</DarkFooterHeading>
              <div>
                <FooterLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <FooterLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <FooterLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <DarkFooterHeading>
                Enjoy! Now to see your channels and recommendations!
              </DarkFooterHeading>
            </div>
          </SideBarInnerContainer>
        </DarkSideBarContainer>
      )
    }}
  </LanguageContext.Consumer>
)

export default SideBar
