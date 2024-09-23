import styled from 'styled-components'

export const LightSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
export const DarkSideBarContainer = styled(LightSideBarContainer)`
  background-color: #181818;
  color: white;
`
export const SideBarInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
`
export const SidebarListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
  margin-left: 5%;
`
export const ListEl = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 15vw;
`
export const DarkFooterHeading = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  margin-left: 5%;
  font-weight: bold;
  margin-top: 5%;
  color: white;
`
export const LightFooterHeading = styled(DarkFooterHeading)`
  color: #606060;
  @media (max-width: 767px) {
    display: none;
  }
`
export const FooterLogo = styled.img`
  height: 40px;
  margin-left: 15%;
  @media (max-width: 767px) {
    display: none;
  }
`
export const DarkSidebarListContainer = styled(SidebarListContainer)`
  color: white;
`
