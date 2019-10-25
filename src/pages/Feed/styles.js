import styled from 'styled-components/native';

export const Container = styled.View`
  background: #000;
`;

export const HeaderTop = styled.View`
flex: 1;
width: 100%;
background: #191919;
flex-direction: row;
align-items: center;
padding-top: 24px;
padding-bottom: 24px;
padding-left: 10px;
padding-right: 10px;
z-index: 2;
`;

export const HeaderBottom = styled.View`
width: 100%;
background: #191919;
position: absolute;
bottom: 0;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-bottom: 50px;
padding-left: 10px;
padding-right: 10px;
z-index: 2;
`;

export const Post = styled.View`
  margin-top: 5px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ActionsB = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Description = styled.Text`
  color: #fff;
  padding: 15px;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff'
})`
  margin: 30px 0;
`;