import {Component} from 'react'
import Cookies from 'js-cookie'

import LanguageContext from '../../context/NxtWatchContext'

import {
  LightBgContainer,
  DarkBgContainer,
  LightInnerContainer,
  DarkInnerContainer,
  LoginImage,
  LightLabelEl,
  DarkLabelEl,
  LightInputEl,
  DarkInputEl,
  InputContainer,
  PasswordContainer,
  LightShowPassLabel,
  DarkShowPassLabel,
  LoginButton,
  ErrPara,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Login extends Component {
  state = {
    userValue: '',
    passValue: '',
    errMsg: '',
    checkPass: false,
    apiStatus: apiStatusConstant.initial,
  }

  changeUserValue = event => {
    this.setState({userValue: event.target.value})
  }

  changePassValue = event => {
    this.setState({passValue: event.target.value})
  }

  checkPassValue = event => {
    this.setState({checkPass: event.target.checked})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitUserPass = async event => {
    event.preventDefault()
    const {userValue, passValue} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userPass = {
      username: userValue,
      password: passValue,
    }
    const option = {
      method: 'POST',
      body: JSON.stringify(userPass),
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({
        errMsg: data.error_msg,
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  render() {
    const {userValue, passValue, errMsg, checkPass, apiStatus} = this.state

    console.log(apiStatus)

    return (
      <LanguageContext.Consumer>
        {value => {
          const {activeTheme} = value

          if (activeTheme === 'LI') {
            return (
              <LightBgContainer>
                <LightInnerContainer onSubmit={this.submitUserPass}>
                  <LoginImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                  <InputContainer>
                    <LightLabelEl htmlFor="showUser">USERNAME</LightLabelEl>
                    <LightInputEl
                      type="text"
                      id="showUser"
                      value={userValue}
                      onChange={this.changeUserValue}
                      placeholder="Username"
                    />
                  </InputContainer>
                  <InputContainer>
                    <LightLabelEl htmlFor="showPass">PASSWORD</LightLabelEl>
                    {checkPass ? (
                      <LightInputEl
                        type="text"
                        id="showPass"
                        value={passValue}
                        onChange={this.changePassValue}
                        placeholder="Password"
                      />
                    ) : (
                      <LightInputEl
                        type="password"
                        id="showPass"
                        value={passValue}
                        onChange={this.changePassValue}
                        placeholder="Password"
                      />
                    )}
                  </InputContainer>
                  <PasswordContainer>
                    <input
                      type="checkbox"
                      id="checkPass"
                      onChange={this.checkPassValue}
                    />
                    <LightShowPassLabel htmlFor="checkPass">
                      Show Password
                    </LightShowPassLabel>
                  </PasswordContainer>
                  <LoginButton type="submit">Login</LoginButton>
                  <ErrPara>{errMsg}</ErrPara>
                </LightInnerContainer>
              </LightBgContainer>
            )
          }

          return (
            <DarkBgContainer>
              <DarkInnerContainer onSubmit={this.submitUserPass}>
                <LoginImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
                <InputContainer>
                  <DarkLabelEl htmlFor="showUser">USERNAME</DarkLabelEl>
                  <DarkInputEl
                    type="text"
                    id="showUser"
                    value={userValue}
                    onChange={this.changeUserValue}
                    placeholder="Username"
                  />
                </InputContainer>
                <InputContainer>
                  <DarkLabelEl htmlFor="showPass">PASSWORD</DarkLabelEl>
                  {checkPass ? (
                    <DarkInputEl
                      type="text"
                      id="showPass"
                      value={passValue}
                      onChange={this.changePassValue}
                      placeholder="Password"
                    />
                  ) : (
                    <DarkInputEl
                      type="password"
                      id="showPass"
                      value={passValue}
                      onChange={this.changePassValue}
                      placeholder="Password"
                    />
                  )}
                </InputContainer>
                <PasswordContainer>
                  <input
                    type="checkbox"
                    id="checkPass"
                    onChange={this.checkPassValue}
                  />
                  <DarkShowPassLabel htmlFor="checkPass">
                    Show Password
                  </DarkShowPassLabel>
                </PasswordContainer>
                <LoginButton type="submit">Login</LoginButton>
                <ErrPara>{errMsg}</ErrPara>
              </DarkInnerContainer>
            </DarkBgContainer>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default Login
