import styled from 'styled-components'

export const LightHomepageContainer = styled.div`
  width: 83vw;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  background-color: #ebebeb;
  padding-left: 5%;
  padding-top: 3%;
`
export const DarkHomepageContainter = styled(LightHomepageContainer)`
  background-color: #0f0f0f;
  color: white;
  margin-left: 0;
`
export const VideoHeading = styled.p`
  margin-left: 1%;
  font-family: 'Roboto';
`
export const LightVideoContainter = styled.div`
  display: flex;
  justify-content: space-between;
`
export const DarkVideoContainter = styled(LightVideoContainter)`
  display: flex;
  justify-content: space-between;
  color: grey;
`
export const ControlsContainer = styled.div`
  width: 18vw;
  margin-right: 5%;
  display: flex;
  justify-content: center;
`
export const LightCustomButton = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 14px;
  display: flex;
`
export const DarkCustomButton = styled(LightCustomButton)``
export const ChannelDetailsContainer = styled.div`
  display: flex;
  width: 23vw;
`
export const ChannelLogo = styled.img`
  height: 50px;
  margin-top: 2%;
`
export const SubsContainer = styled.div`
  margin-left: 5%;
`
export const ChannelPara = styled.p`
  margin-bottom: 0;
`
export const DescPara = styled.p`
  margin-left: 5%;
  margin-right: 5%;
  font-size: 18px;
`
