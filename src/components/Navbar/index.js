import {Link, withRouter} from 'react-router-dom'

import {BiMenu} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Cookies from 'js-cookie'

import {IoMdMoon, IoMdClose} from 'react-icons/io'
import {IoSunnyOutline} from 'react-icons/io5'

import SideBar from '../Sidebar'

import {
  DarkNavbarContainer,
  LightNavbarContainer,
  WebsiteLogo,
  ProfileContainer,
  ProfileLogo,
  DarkLogoutButton,
  LightLogoutButton,
  LightPopPara,
} from './styledComponents'

import LanguageContext from '../../context/NxtWatchContext'

const Navbar = props => (
  <LanguageContext.Consumer>
    {value => {
      const {activeTheme, changeTheme, changeValue} = value

      const onChange = () => {
        changeTheme()
      }

      const logOut = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const changeUrl = () => {
        changeValue('home')
      }

      if (activeTheme === 'LI') {
        return (
          <LightNavbarContainer>
            <Link to="/" onClick={changeUrl}>
              <WebsiteLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
              />
            </Link>
            <ProfileContainer>
              {/* eslint-disable-next-line */}
              <button
                className="light"
                type="submit"
                onClick={onChange}
                data-testid="theme"
              >
                <IoMdMoon />
              </button>
              <ProfileLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LightLogoutButton type="submit">Logout</LightLogoutButton>
                }
                className="popup-container"
              >
                {close => (
                  <div className="light-popup-container">
                    <LightPopPara>
                      Are you sure, you want to logout
                    </LightPopPara>
                    <div>
                      <button type="submit" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="submit" onClick={logOut}>
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <button type="submit" className="display-small-btn">
                    <FiLogOut />{' '}
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="light-popup-container">
                    <LightPopPara>
                      Are you sure, you want to logout
                    </LightPopPara>
                    <div>
                      <button type="submit" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="submit" onClick={logOut}>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <button type="submit" className="display-small-btn">
                    <BiMenu />{' '}
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="bg-container">
                    <div>
                      <button
                        type="submit"
                        className="display-small-btn"
                        onClick={() => close()}
                      >
                        <IoMdClose />{' '}
                      </button>
                    </div>
                    <SideBar />
                  </div>
                )}
              </Popup>
            </ProfileContainer>
          </LightNavbarContainer>
        )
      }

      return (
        <DarkNavbarContainer>
          <Link to="/" onClick={changeUrl}>
            <WebsiteLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="website logo"
            />
          </Link>
          <ProfileContainer>
            {/* eslint-disable-next-line */}
            <button className="dark" type="submit" onClick={onChange}>
              <IoSunnyOutline />
            </button>
            <ProfileLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <DarkLogoutButton type="submit">Logout</DarkLogoutButton>
              }
              className="popup-container"
            >
              {close => (
                <>
                  <div className="dark-popup-container">
                    <LightPopPara>
                      Are you sure you want to logout?
                    </LightPopPara>
                    <div>
                      <button type="submit" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="submit" onClick={logOut}>
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <button type="submit" className="display-small-btn dark">
                  <FiLogOut />{' '}
                </button>
              }
              className="popup-container"
            >
              {close => (
                <>
                  <div className="dark-popup-container">
                    <LightPopPara>
                      Are you sure you want to logout?
                    </LightPopPara>
                    <div>
                      <button type="submit" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="submit" onClick={logOut}>
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <button type="submit" className="display-small-btn dark">
                  <BiMenu />{' '}
                </button>
              }
              className="popup-container"
            >
              {close => (
                <div className="bg-container dark">
                  <div>
                    <button
                      type="submit"
                      className="display-small-btn"
                      onClick={() => close()}
                    >
                      <IoMdClose />{' '}
                    </button>
                  </div>
                  <SideBar />
                </div>
              )}
            </Popup>
          </ProfileContainer>
        </DarkNavbarContainer>
      )
    }}
  </LanguageContext.Consumer>
)

export default withRouter(Navbar)
