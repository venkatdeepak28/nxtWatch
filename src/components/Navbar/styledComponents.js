import styled from 'styled-components'

export const DarkNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  height: 10vh;
  border-bottom: 0;
  width: 100%;
`
export const LightNavbarContainer = styled(DarkNavbarContainer)`
  background-color: white;
`
export const WebsiteLogo = styled.img`
  height: 40px;
  margin-left: 34%;
  @media (max-width: 767px) {
    margin-left: 12%;
    height: 20px;
  }
`
export const ProfileContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-right: 5%;
  width: 15vw;
`
export const ProfileLogo = styled.img`
  height: 45px;
  margin-left: 12%;
  @media (max-width: 767px) {
    display: none;
  }
`
export const DarkLogoutButton = styled.button`
  margin-left: 20%;
  margin-right: 20%;
  background-color: transparent;
  font-size: 24px;
  color: white;
  border: 2px solid white;
  font-family: 'Roboto';
  @media (max-width: 767px) {
    display: none;
  }
`

export const LightLogoutButton = styled(DarkLogoutButton)`
  color: #3b82f6;
  border: 2px solid #3b82f6;
  @media (max-width: 767px) {
    display: none;
  }
`
export const LightPopPara = styled.p`
  font-family: 'Roboto',
  font-size: 20px,
`
