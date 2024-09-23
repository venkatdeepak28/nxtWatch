import styled from 'styled-components'

export const HomepageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`
export const LightVideoContainer = styled.div`
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2%;
`
export const DarkVideoContainer = styled(LightVideoContainer)`
  background-color: #0f0f0f;
  color: white;
`
