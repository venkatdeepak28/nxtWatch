import styled from 'styled-components'

export const LightBgContainer = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DarkBgContainer = styled(LightBgContainer)`
  background-color: #181818;
`

export const LightInnerContainer = styled.form`
  background-color: white;
  width: 55vw;
  height: 60vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const DarkInnerContainer = styled(LightInnerContainer)`
  background-color: #0f0f0f;
`
export const LoginImage = styled.img`
  margin-top: 24px;
  height: 50px;
  margin-bottom: 16px;
`
export const LightLabelEl = styled.label`
  margin-bottom: 8px;
  font-family: 'Roboto';
  margin-top: 0;
`
export const DarkLabelEl = styled(LightLabelEl)`
  color: #f9f9f9;
`
export const LightInputEl = styled.input`
  background-color: transparent;
  border: 4px solid #f1f5f9;
  padding: 16px;
  width: 37vw;
`
export const DarkInputEl = styled(LightInputEl)`
  background-color: transparent;
  border: 2px solid #1e293b;
  color: white;
`

export const InputContainer = styled.div`
  margin-right: 16px;
  width: 40vw;
  margin-top: 16px;
`
export const PasswordContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 42vw;
  margin-top: 2%;
`
export const LightShowPassLabel = styled.label`
  font-family: 'Roboto';
`
export const DarkShowPassLabel = styled(LightShowPassLabel)`
  color: white;
`
export const LoginButton = styled.button`
  margin-top: 16px;
  background-color: #3b82f6;
  border: 0;
  color: #ffffff;
  font-family: 'Roboto';
  width: 20vw;
  height: 6vh;
  border-radius: 10px;
  margin-right: 2%;
`
export const ErrPara = styled.p`
  color: red;
`
